# 线程能同时访问类中的两个Synchronized的同步方法吗?这两个同步方法能互相访问吗?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- 线程可以同时访问类中的两个Synchronized的同步方法，但是这两个同步方法不能互相访问。
- Synchronized关键字可以保证同一时间只有一个线程进入同步代码块或同步方法，如果一个线程进入了一个Synchronized方法或代码块，其他线程就必须等待该线程执行完毕才能进入该方法或代码块。
- 但是，如果一个线程已经获得了一个Synchronized方法或代码块的锁，它就可以同时访问另一个Synchronized方法或代码块，因为这两个方法使用的是不同的锁。也就是说，如果类中有两个Synchronized方法，这两个方法使用的锁是不同的，因此不会相互影响，线程可以同时访问它们。
- 然而，如果一个Synchronized方法或代码块在执行过程中调用了另一个Synchronized方法或代码块，就会出现锁竞争(在锁一样的情况下）的问题，即第一个Synchronized方法或代码块已经获得了锁，但是第二个Synchronized方法或代码块也需要获得同样的锁才能执行，因此第二个Synchronized方法或代码块就会被阻塞。如果第一个Synchronized方法或代码块等待第二个Synchronized方法或代码块执行完毕才能继续执行，就会出现死锁的情况。因此，两个Synchronized方法或代码块不能互相访问，否则会出现锁竞争和死锁问题。