# BIO、NIO、AIO有什么区别?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- BIO是同步阻塞的 (JDK1.4之前)
- NIO同步非阻塞 (JDK1.4)
- AIO异步非阻塞 (JDK1.7)
- 异步和同步的区别:在于调用者，如果是同步，调用者调用接口，需要等到接口返回数据，才做其他工作，如果是异步，调用者调用接口后，直接做其他工作，不用等待接口返回数据。
- 阻塞和非阻塞区别:在于被调用者，如果是阻塞：被调用者做完调用者给的任务后给出反馈，这是阻塞，如果是非阻塞，被调用者直接给出反馈，然后再干活，这是非阻塞。