# Java8开始ConcurrentHashMap,为什么舍弃分段锁？

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**通过 JDK 的源码和官方文档看来， 他们认为的弃用分段锁的原因由以下几点：**

- 加入多个分段锁浪费内存空间。
- 生产环境中， map 在放入时竞争同一个锁的概率非常小，分段锁反而会造成更新的操作的长时间等待。
- 为了提高 GC 的效率