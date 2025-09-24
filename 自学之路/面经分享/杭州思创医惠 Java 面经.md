# 杭州思创医惠 Java 一面

总共问了将近 40 分钟，基本是根据简历问下来，比较全面，周一估计可能会有结果，至少两轮面试。

1）自我介绍

2）项目介绍（重点讲）

3）在职情况，实习经历做的事情

4）进程、线程、线程池的区别和联系
答：从调度方式、上下文切换成本、通信方式、资源占用、等等方向可以考虑进程和线程的区别，线程池这块肯定先要讲线程池的作用，可以提出池化技术，然后引出数据库连接池等等，都是类似的技术，然后不需要详细说线程池的核心参数、拒绝策略、怎么创建的？会有什么问题？后续肯定会问，没必要直接阐述。

**5. 线程池核心参数 (7个)**

**回答思路：** 按顺序说，并解释每个参数的意义。

1. `corePoolSize`：核心线程数，线程池中**长期维持的线程数量**，即使空闲也不会被回收。
2. `maximumPoolSize`：最大线程数，线程池允许创建的**最大线程数量**。
3. `keepAliveTime`：空闲线程存活时间。当线程数大于核心线程数时，**多余的空闲线程在等待新任务的最长时间**，超过这个时间就会被回收。
4. `unit`：`keepAliveTime`的时间单位。
5. `workQueue`：任务队列。用于存放**等待执行的任务**的阻塞队列，如`ArrayBlockingQueue`, `LinkedBlockingQueue`。
6. `threadFactory`：线程工厂。用于**创建新线程**，可以自定义线程名、优先级等，便于排查问题。
7. `handler`：拒绝策略。当线程池和队列都满了，如何**拒绝新提交的任务**。

------

**6. 线程池推荐创建方式**

**回答思路：** 指出`Executors`工具的弊端，推荐使用`ThreadPoolExecutor`构造函数手动创建。

- **不推荐**使用`Executors`的`newFixedThreadPool`、`newCachedThreadPool`等方法。
- **原因**：这些方式隐藏了参数细节，容易导致问题。例如：
  - `newFixedThreadPool`和`newSingleThreadExecutor`使用**无界队列** (`LinkedBlockingQueue`)，可能堆积大量请求，导致OOM。
  - `newCachedThreadPool`的**最大线程数设置为`Integer.MAX_VALUE`**，可能创建大量线程，导致OOM。
- **推荐**：使用`new ThreadPoolExecutor(...)`**手动创建**。这样我们可以明确指定所有参数，根据实际业务场景（CPU密集型、IO密集型）进行定制，避免资源耗尽风险。

------

**7. 线程池拒绝策略 (4种)**

**回答思路：** 说出JDK提供的4种标准策略及其行为。

1. `AbortPolicy`（**默认策略**）：直接抛出`RejectedExecutionException`异常。
2. `CallerRunsPolicy`：**调用者运行**策略。让提交任务的线程自己去执行该任务。
3. `DiscardPolicy`：直接**丢弃**新提交的任务，不做任何处理。
4. `DiscardOldestPolicy`：**丢弃队列中最老**的任务，然后尝试重新提交当前任务。

------

**8. 自定义拒绝策略**

**回答思路：** 实现接口，重写方法，并举例一个实用的场景（如记录日志、持久化存储、降级处理）。

java

```
// 示例：实现一个记录日志和持久化存储的拒绝策略
public class MyRejectionHandler implements RejectedExecutionHandler {
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        // 1. 记录日志，报警
        System.out.println("Task rejected! " + r.toString());
        // 2. 可在此将任务r持久化到数据库或磁盘，等待后续恢复执行
        // saveToDisk(r);
    }
}
```



------

**9. JUC工具类使用**

**回答思路：** 列举几个最常用的并简单说明使用场景。

- `ReentrantLock`：可重入锁，比`synchronized`更灵活，支持公平锁、可中断、超时等待、条件变量。
- `CountDownLatch`：倒计时器，用于一个线程等待多个线程完成任务。`await()`等待，`countDown()`计数减一。
- `CyclicBarrier`：循环栅栏，用于多个线程互相等待，到达一个公共屏障点再继续执行。
- `Semaphore`：信号量，用于控制同时访问特定资源的线程数量（流量控制）。
- `ConcurrentHashMap`：并发安全的HashMap。
- `AtomicInteger`：提供原子操作的Integer类，基于CAS。

**可以说：** “我在项目里用`CountDownLatch`模拟过高并发场景，用`Semaphore`做过接口限流，用`ReentrantLock`替代过`synchronized`来实现更细粒度的锁控制。”

------

**10. Volatile作用**

**回答思路：** 两大核心作用：可见性和禁止指令重排。**切忌**说它能保证原子性。

1. **保证可见性**：当一个线程修改了`volatile`修饰的变量，新值会**立即被刷新到主内存**，并**使其他线程工作内存中的缓存行失效**，从而保证其他线程能读到最新值。
2. **禁止指令重排序**：通过插入**内存屏障**，防止JVM和处理器为了优化性能而对指令进行重排，这遵循了`happens-before`原则，是保证`DCL`（双检锁）单例模式线程安全的关键。

11）Concurrent HashMap 1.7 和 1.8 区别

12）Bean 生命周期和 IOC 容器的概念和作用

13）SpringBoot 自动配置原理

14）MyBatis 和 MyBatis PLus 的区别和联系

15）Spring 事务编程式和声明式，怎么实践的，要注意哪些问题？底层是什么设计模式？复杂场景应该用哪个？

16）数据库优化，慢查询日志、热点数据缓存

17）Redis 项目实践情况

18）缓存穿透、击穿、雪崩的概念和解决方案和实践

19）微服务和单体项目区别，优缺点

20）Nginx 负载均衡算法

21）LInux 常用命令

22）Dokcer 作用和常用命令

23）反问技术栈和业务结合，面试轮次，面试结果、



总体来说问的还是比较多的，自由发挥即可，没有偏门的题目，主要是延伸和语言表达能力，多注重源码和实际项目阐述即可。



程序员小白条的编程日记：https://xbt.xiaobaitiao.top/ （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、**面经、技术分享、毕设项目指导**）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，更新好玩的，有趣的事！看完可冲中大厂！dy同名程序员小白条，主要口述面试经历和分享我认为的实用网站，会比面经讲的详细很多，以真实面试录音为主！公粽号：**程序员落叶（全部面经和简历修改指南）**

**欢迎关注上方公粽号！感谢支持！一起进步，共勉！**