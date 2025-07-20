# 如何保证多线程下的i++结果正确

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

1.使用 synchronized 关键字

```java
public class MyThread implements Runnable {  
    private int i;

    public MyThread(int i) {  
        this.i = i;  
    }

    @Override  
    public void run() {  
        synchronized (this) {  
            System.out.println(i++);  
        }  
    }  
}
```

2.Atomic变量

使用AtomicInteger类来代替int类型，可以保证原子性。AtomicInteger类提供了线程安全的原子操作方法，如incrementAndGet()。

```java
private AtomicInteger i = new AtomicInteger(0);

public void increment() {
    i.incrementAndGet();
}
```

3.Lock对象

使用Lock对象来对共享变量进行同步，保证同一时刻只有一个线程能够访问该变量。

```Java
private Lock lock = new ReentrantLock();

public void increment() {
    lock.lock();
    try {
        i++;
    } finally {
        lock.unlock();
    }
}
```

4.ThreadLocal变量

使用ThreadLocal变量来对共享变量进行封装，每个线程都拥有自己的副本，可以保证线程安全。

```Java
private ThreadLocal<Integer> threadLocal = new ThreadLocal<Integer>() {
    @Override
    protected Integer initialValue() {
        return 0;
    }
};

public void increment() {
    threadLocal.set(threadLocal.get() + 1);
}
```

