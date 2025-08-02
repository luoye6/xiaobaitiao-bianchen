# ConcurrentHashMap(JDK1.8)为什么要使用synchronized而不是如ReentranLock这样的可重入锁？

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

（1）锁的粒度

首先锁的粒度并没有变粗，甚至变得更细了。每当扩容一次，ConcurrentHashMap的并发度就扩大一倍。

（2）Hash冲突

JDK1.7中，ConcurrentHashMap(通过二次hash的方式（Segment -> HashEntry）能够快速的找到查找的元素。在1.8中通过链表加红黑树的形式弥补了put、get时的性能差距。JDK1.8中，在ConcurrentHashmap进行扩容时，其他线程可以通过检测数组中的节点决定是否对这条链表（红黑树）进行扩容，减小了扩容的粒度，提高了扩容的效率。

下面是我对面试中的那个问题的一下看法。

为什么是synchronized，而不是ReentranLock

（1）减少内存开销

假设使用可重入锁来获得同步支持，那么每个节点都需要通过继承AQS来获得同步支持。但并不是每个节点都需要获得同步支持的，只有链表的头节点（红黑树的根节点）需要同步，这无疑带来了巨大内存浪费。

（2）获得JVM的支持

可重入锁毕竟是API这个级别的，后续的性能优化空间很小。synchronized则是JVM直接支持的，JVM能够在运行时作出相应的优化措施：锁粗化、锁消除、锁自旋等等。这就使得synchronized能够随着JDK版本的升级而不改动代码的前提下获得性能上的提升。

- JDK1.7分段数组+HashEntry数组+链表
- JDK1.8Node数组+链表+红黑树