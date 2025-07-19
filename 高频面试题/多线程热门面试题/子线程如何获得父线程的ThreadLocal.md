# 子线程如何获得父线程的ThreadLocal

在Java中，子线程无法直接访问父线程的ThreadLocal变量，因为ThreadLocal是线程封闭的，每个线程都拥有自己独立的变量副本。

但是，如果在创建子线程时将父线程的ThreadLocal变量传递给子线程，子线程就可以访问父线程的ThreadLocal变量了。具体实现方法如下：

1.在父线程中创建并初始化ThreadLocal变量。

2.在创建子线程时，将父线程的ThreadLocal变量作为参数传递给子线程。

3.在子线程中通过参数获取父线程的ThreadLocal变量，并使用该变量。

```Java
public class ParentThread {
    // 创建父线程的ThreadLocal变量
    public static ThreadLocal<String> threadLocal = new ThreadLocal<String>();

    public static void main(String[] args) {
        // 设置父线程的ThreadLocal变量
        threadLocal.set("Hello World!");

        // 创建子线程并将父线程的ThreadLocal变量传递给子线程
        Thread childThread = new Thread(new ChildThread(threadLocal.get()));
        childThread.start();
    }
}

class ChildThread implements Runnable {
    private String value;

    public ChildThread(String value) {
        this.value = value;
    }

    public void run() {
        // 在子线程中获取父线程的ThreadLocal变量
        String parentValue = this.value;
        System.out.println("Parent Thread Local Value: " + parentValue);
    }
}
```

