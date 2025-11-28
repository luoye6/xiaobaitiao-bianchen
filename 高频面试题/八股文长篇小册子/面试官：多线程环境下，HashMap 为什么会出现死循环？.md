# 面试官：多线程环境下，HashMap 为什么会出现死循环？

**面试官**：看你简历上写了不少并发编程的经验，那我们来聊聊HashMap在多线程环境下的问题吧。你知道为什么HashMap在多线程下会出现死循环吗？

**我**：HashMap死循环？这个...我知道HashMap不是线程安全的，但具体为什么会死循环我还真没深入研究过...

## 解析答案

### HashMap 的版本演进

在深入探讨死循环问题之前，我们需要了解HashMap在不同JDK版本中的演变：

**JDK 1.2 - 1.7：数组 + 链表时代**

- 基础结构：数组存储桶，链表解决哈希冲突
- 扩容机制：2倍扩容，重新哈希
- 问题所在：链表在并发扩容时容易出现环状结构

**JDK 8+：数组 + 链表 + 红黑树时代**

- 优化结构：当链表长度超过8时转换为红黑树
- 性能提升：查找时间复杂度从O(n)优化到O(log n)
- 并发改进：虽然仍非线程安全，但数据结构更健壮

### 死循环的原因

HashMap的死循环问题主要发生在JDK 1.7及之前版本的多线程扩容过程中。让我们通过一个生动的例子来理解这个问题：

#### 场景还原

假设我们有一个简单的HashMap，当前状态如下：

```text
桶0: A → B → C
```

现在有两个线程Thread-1和Thread-2同时触发扩容操作。

**正常单线程扩容过程：**

1. 创建新的扩容后数组
2. 遍历旧数组的每个桶
3. 将链表节点逐个转移到新数组
4. 最终结果：`C → B → A`（JDK 1.7采用头插法）

**多线程并发扩容的灾难：**

Thread-1执行到一半时：

```text
旧数组: A → B → C
Thread-1新数组: B → A  (正在处理，C还没转移)
```

此时Thread-2介入，完成了完整的扩容：

```text
Thread-2新数组: C → B → A
```

Thread-1恢复执行，但它还持有旧的引用关系，继续从头节点A开始转移：

- A的next指向B（但实际在Thread-2中B的next指向C）
- 这种不一致性最终可能形成：`A → B → A` 的环状结构

### 深入源码

让我们看看JDK 1.7中问题所在的transfer方法：

```java
void transfer(Entry[] newTable) {
    Entry[] src = table;
    int newCapacity = newTable.length;
    for (int j = 0; j < src.length; j++) {
        Entry<K,V> e = src[j];  // 获取旧数组第j个桶的头节点
        if (e != null) {
            src[j] = null;  // 清空旧桶
            do {
                Entry<K,V> next = e.next;  // 保存下一个节点 ← 问题关键点！
                int i = indexFor(e.hash, newCapacity);  // 计算新位置
                e.next = newTable[i];  // 头插法
                newTable[i] = e;       // 更新头节点
                e = next;              // 处理下一个节点
            } while (e != null);
        }
    }
}
```

**问题分析：**

1. `Entry<K,V> next = e.next` 这行代码在并发环境下是危险的
2. 如果线程在执行这行代码后挂起，其他线程修改了链表结构
3. 恢复执行时，next引用可能已经指向了错误的节点
4. 最终导致链表成环

### JDK 8的改进

JDK 8对HashMap进行了重要优化：

1. **尾插法替代头插法**
   - JDK 7：头插法，容易改变节点顺序
   - JDK 8：尾插法，保持节点相对顺序
   - 效果：减少了链表成环的可能性
2. **红黑树优化**
   - 链表长度超过8时转为红黑树
   - 树结构更稳定，不易出现环状问题
3. **扩容机制优化**
   - 更精细的锁控制和状态管理
   - 但仍然不是线程安全的

### 其他并发问题

死循环只是HashMap并发问题中最"著名"的一个，实际上还有：

#### 1. 数据丢失问题

```java
// 两个线程同时执行put操作
if (table[i] == null) {
    table[i] = new Entry(key, value);  // 可能被覆盖
}
```

#### 2. 大小计数不准

```java
// size++ 不是原子操作
size = size + 1;  // 可能丢失更新
```

#### 3. 迭代器快速失败

```java
// 遍历时修改会抛出ConcurrentModificationException
for (String key : map.keySet()) {
    map.remove(key);  // 抛出异常
}
```

### 解决方案

#### 方案一：ConcurrentHashMap（推荐）

```java
// JDK 8的ConcurrentHashMap使用CAS + synchronized
Map<String, Object> safeMap = new ConcurrentHashMap<>();

// 安全的多线程操作
safeMap.put("key", "value");
safeMap.get("key");
```

**ConcurrentHashMap的优势：**

- 分段锁或CAS操作，提高并发度
- 不会出现死循环问题
- 提供原子性操作方法

#### 方案二：Collections.synchronizedMap

```java
Map<String, Object> syncMap = Collections.synchronizedMap(new HashMap<>());

// 使用方式不变，但所有操作都是同步的
syncMap.put("key", "value");
```

#### 方案三：显式同步控制

```java
Map<String, Object> map = new HashMap<>();
final Object lock = new Object();

// 手动控制同步
synchronized(lock) {
    map.put("key", "value");
}
```

### 实际开发中的最佳实践

#### 1. 根据场景选择容器

```java
// 读多写少 - ConcurrentHashMap
Map<String, Config> configCache = new ConcurrentHashMap<>();

// 简单的同步需求 - Collections.synchronizedMap
Map<String, User> userSession = Collections.synchronizedMap(new HashMap<>());

// 高性能写入 - 考虑ConcurrentHashMap with proper configuration
```

#### 2. 避免在迭代中修改

```java
// 错误做法
for (String key : map.keySet()) {
    if (shouldRemove(key)) {
        map.remove(key);  // 可能抛出ConcurrentModificationException
    }
}

// 正确做法 - 使用迭代器
Iterator<Map.Entry<String, Object>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, Object> entry = iterator.next();
    if (shouldRemove(entry.getKey())) {
        iterator.remove();  // 安全的删除
    }
}
```

#### 3. 使用原子操作方法

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// 原子性操作
map.compute("counter", (k, v) -> v == null ? 1 : v + 1);
map.merge("total", 100, Integer::sum);
```

## 欢迎交流

通过本文的深入分析，相信你已经对HashMap在多线程环境下的死循环问题有了全面的理解。这个问题不仅是面试中的经典题目，更是实际开发中需要警惕的陷阱。以下几个问题可以帮助你进一步思考：

1. 除了ConcurrentHashMap，还有哪些并发容器可以解决HashMap的线程安全问题？
2. 在分布式系统中，如何保证类似HashMap这样的数据结构的线程安全？
3. 现代Java并发编程中，还有哪些常见的"坑"需要我们注意？

欢迎在评论区分享你的见解和实践经验！

程序员小白条的编程日记：https://xbt.xiaobaitiao.top/ （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、**面经、技术分享、毕设项目指导**）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，更新好玩的，有趣的事！看完可冲中大厂！dy同名程序员小白条，主要口述面试经历和分享我认为的实用网站，会比面经讲的详细很多，以真实面试录音为主！公粽号：**程序员落叶（秋招技巧、面经、公司投递表、谈offer）**

**欢迎关注上方公众号！感谢支持！一起进步，共勉！**