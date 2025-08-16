# CompletableFuture 深度解析：异步编排的艺术与实践

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

引用：在现代高并发系统中，高效的异步任务处理能力已成为开发者必备技能。Java 8 引入的 CompletableFuture 不仅解决了传统 Future 的诸多局限，更为复杂的异步编程提供了优雅的解决方案。本文将系统性地剖析 CompletableFuture 的核心特性、使用模式及最佳实践。本文将以面试为主，用图文结合代码带你深入分析 ThreadLocal。

### 从 Future 到 CompletableFuture

![](https://pic.yupi.icu/5563/202508161135830.png)

### CompletableFuture 核心操作详解

#### 任务创建方式对比

一般都是比较常用的，用于进行多线程任何编码，需要注意各个任务之间是否具有关联关系。

| 创建方式                    | 返回值   | 适用场景               |
| :-------------------------- | :------- | :--------------------- |
| `new CompletableFuture<>()` | 可定制   | 手动控制完成时机       |
| `supplyAsync(Supplier)`     | 有返回值 | 需要返回结果的异步计算 |
| `runAsync(Runnable)`        | 无返回值 | 纯异步执行过程         |

**最佳实践**：

```Java
// 推荐使用自定义线程池
ExecutorService customPool = Executors.newFixedThreadPool(10);

CompletableFuture.supplyAsync(() -> {
    // 模拟耗时操作
    return fetchUserData(userId);
}, customPool).thenAccept(result -> {
    // 异步处理结果
    processUserData(result);
});
```

#### 结果处理三剑客

四大函数，Lambda 表达式。

1. **thenApply** - 转换结果

   ```Java
   CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Hello")
       .thenApply(s -> s + " World")
       .thenApply(String::toUpperCase);
   ```

2. **thenAccept** - 消费结果

   ```Java
   CompletableFuture.supplyAsync(() -> fetchOrderDetails())
       .thenAccept(order -> {
           sendNotification(order.getUser());
           updateInventory(order.getItems());
       });
   ```

3. **thenRun** - 执行后续操作

   ```Java
   CompletableFuture.supplyAsync(() -> processPayment())
       .thenRun(() -> log.info("Payment processed"))
       .thenRun(cleanupResources);
   ```

#### 二元组合操作

经典的实践，前后如果有顺序的话，没有顺序可以一次调用多个接口，比较获取图片、文章、头像，然后用时最长的就是短板效应的那一个。

| 方法          | 特点                           | 示例场景              |
| :------------ | :----------------------------- | :-------------------- |
| thenCompose   | 顺序执行，前序结果作为后序输入 | 用户认证→获取用户信息 |
| thenCombine   | 并行执行，合并双方结果         | 获取商品详情+库存状态 |
| applyToEither | 竞速模式，取最先完成的结果     | 多CDN资源获取         |

**典型应用**：

```Java
// 获取用户基础信息+偏好设置
CompletableFuture<User> userFuture = getUserBasicInfo(userId);
CompletableFuture<Preference> prefFuture = getUserPreference(userId);

userFuture.thenCombine(prefFuture, (user, pref) -> {
    user.setPreference(pref);
    return enrichUserProfile(user);
}).thenAccept(this::sendToClient);
```

#### 多元任务协调

没有顺序要求可以采用并行

1. **allOf** - 全量收集模式

   ```Java
   CompletableFuture<Void> all = CompletableFuture.allOf(
       updateInventory(),
       recordTransaction(),
       notifyShipping()
   );
   
   all.thenRun(() -> System.out.println("All operations completed"));
   ```

2. **anyOf** - 竞速模式

   ```Java
   CompletableFuture<Object> any = CompletableFuture.anyOf(
       queryFromCache(),
       queryFromDB(),
       queryFromRemote()
   );
   
   any.thenAccept(result -> renderResponse(result));
   ```

#### 异常处理方案对比

| 方式          | 触发时机 | 返回值   | 典型应用     |
| :------------ | :------- | :------- | :----------- |
| exceptionally | 仅异常时 | 替代值   | 降级处理     |
| handle        | 总是执行 | 可转换   | 结果统一处理 |
| whenComplete  | 总是执行 | 保持原值 | 资源清理     |

**防御式编程示例**：

```Java
CompletableFuture.supplyAsync(() -> riskyOperation())
    .handle((result, ex) -> {
        if (ex != null) {
            log.error("Operation failed", ex);
            return defaultValue;
        }
        return processResult(result);
    })
    .thenAccept(this::sendResponse);
```

#### 使用时的注意事项：

- 注意避免在异步操作中出现死锁或资源竞争的情况，合理设计异步操作的顺序和依赖关系。
- 注意及时释放资源，避免因为异步操作未完成而导致资源泄露的情况。
- 注意避免在异步操作中抛出未捕获的异常，确保异常处理的完整性和及时性。

### 推荐文章

文章：https://juejin.cn/post/6844903594165026829?searchId=20240212175754244C75B903D2B13F40F1#heading-6

程序员小白条的编程日记：https://xbt.xiaobaitiao.top/ （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、面经、技术分享）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，看完可冲中大厂！dy同名程序员小白条，主要口述面试经历和分享我认为的实用网站，会比面经讲的详细很多，以真实面试录音为主！公粽号：**程序员落叶**

**欢迎关注上方公众号！感谢支持！一起进步，共勉！**