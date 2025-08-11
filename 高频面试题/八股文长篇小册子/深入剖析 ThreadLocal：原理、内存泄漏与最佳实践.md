# 深入剖析 ThreadLocal：原理、内存泄漏与最佳实践

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

引用：关于 ThreadLocal 很多人只知道利用 ThreadLocal 拷贝线程的变量副本，做到数据隔离，但没有深入去研究其中的原理和注意事项，比如内存泄漏问题，因此本文将以面试为主，用图文结合代码带你深入分析 ThreadLocal。

### ThreadLocal 是什么

ThreadLocal 是 Java 中的一个线程局部变量工具类，它提供了一种将变量与当前线程绑定的机制，使得每个线程都可以独立地拥有该变量的副本，从而避免了多线程环境下的并发访问问题。

简单来说，ThreadLocal 的核心作用是：

1）为每个线程创建一个独立的变量副本

2）线程之间的变量互不干扰

3）无需使用 synchronized 等同步机制就能保证线程安全

```java
 public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
}
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
```

### ThreadLocal 的 Key 是什么引用

ThreadLocal 的 key 是 ThreadLocal<?> k，继承自 WeakReference ，因此是弱引用，如果 ThreadLocal 没有外部强引用，发生 GC 时会被回收，但创建的 TheadLocal 线程一直运行，那么此时 key 为 null，而value 一直无法被回收，可能有内存泄漏的问题。

### 为什么使用弱引用？

这是为了避免内存泄漏。当 ThreadLocal 变量本身被回收后（不再有强引用指向它），即使线程还在运行，这个 Key 也会被 GC 回收，从而避免了 ThreadLocal 对象无法被回收的问题。

#### 可能的内存泄漏风险

虽然 Key 是弱引用，但 Value 是强引用。如果线程长时间存活（如线程池中的核心线程），且没有手动调用`remove()`方法，Value 可能会一直被引用而无法回收，造成内存泄漏。

### 如何避免内存泄漏的问题

再调用 ThreadLocal 的 get（）、set（）可能会清除 ThreadLocalMap 中 key 为 null 的 Entry 对象，value 没有 GC ROOTS 可达，根据可达性分析法，GC 可以被回收，如果调用 remove 方法，肯定会删除对应的 Entry()，因此使用完 ThreadLocal 后应该显示调用 remove 方法。

### Hash 冲突问题

ThreadLocal 并不像 HashMap 一样有链表，那么如果遇到 Hash 冲突问题，底层是怎么解决的呢？

每个 ThreadLocal 对象会有一个 Hash 值 ThreadLocalHashCode，每初始化一个 ThreadLocal 对象， Hash 值会增加固定大小。

根据 Hash 值定位到 Table 中的位置。

1）如果当前位置为空，直接初始化一个 Entry 放在该位置。

2）该位置已经有 Entry 对象，判断 key 是否相同，如果相等，重新设置 value，相当于更新。

3）如果不相同，那么继续寻找下一个空的位置。

### 使用 ThreadLocal 的好处

1）线程隔离性： ThreadLocal 提供了一种在多线程环境下实现线程隔离的机制。每个线程都可以独立存储和访问自己的数据，互不干扰。

2）避免锁竞争： 由于每个线程都有自己的数据副本，不需要使用锁来保护共享数据，从而避免了锁竞争和线程间的同步开销。

3）线程上下文传递：ThreadLocal 可以用于在整个线程范围内传递上下文信息，而不必在方法参数中显式传递。

4）资源管理：在需要跨多个方法或组件访问资源的情况下，可以使用 ThreadLocal 确保资源在同一个线程中一致可用。

5）异步编程：在异步编程中，每个任务可能在不同的线程中执行，使用 ThreadLocal 可以确保异步任务之间的数据隔离。

### Hash 冲突问题如何解决？

`ThreadLocalMap` 内部使用了开放地址法解决 Hash 冲突问题。具体来说，当发生 Hash 冲突时，它会线性探测下一个可用的位置，直到找到一个空槽。

这意味着如果多个 `ThreadLocal` 对象的哈希码相同，它们会被放置在数组的相邻位置，这可能导致线性探测的过程比较长。因此，为了减少哈希冲突，尽量使 `ThreadLocal` 的哈希码分布均匀是一种好的实践。

总的来说，使用 `ThreadLocal` 时需要注意内存泄漏的问题，尽量在不需要的时候手动清理 `ThreadLocal` 变量，以及注意哈希冲突可能带来的性能影响。

### 性能对比与替代方案

| 方案        | 线程安全 | 性能 | 适用场景     |
| :---------- | :------- | :--- | :----------- |
| ThreadLocal | 高       | 最优 | 线程隔离数据 |
| 同步锁      | 高       | 较差 | 少量共享数据 |
| 并发集合    | 高       | 中等 | 复杂共享数据 |

### 推荐文章和书籍

书籍：《多线程下 ThreadLocal 应用实例》

文章：https://cloud.tencent.com/developer/article/2001044

程序员小白条的编程日记：https://xbt.xiaobaitiao.top/ （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、面经、技术分享）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，看完可冲中大厂！dy同名程序员小白条，主要口述面试经历和分享我认为的实用网站，会比面经讲的详细很多，以真实面试录音为主！公粽号：**程序员落叶**

**欢迎关注上方公众号！感谢支持！一起进步，共勉！**