# JVM 四种引用类型

 在上面的介绍中，我们多次提到了“引用”这个概念，在此我们不妨多了解一些引用的知识，在 Java 中有四种引用类型，分别为：

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)
>


强引用（Strong Reference）：如Object obj = new Object()，这类引用是 Java 程序中最普遍的。只要强引用还存在，垃圾收集器就永远不会回收掉被引用的对象。

软引用（Soft Reference）：它用来描述一些可能还有用，但并非必须的对象。在系统内存不够用时，这类引用关联的对象将被垃圾收集器回收。JDK1.2 之后提供了SoftReference类来实现软引用。

弱引用（Weak Reference）：它也是用来描述非必须对象的，但它的强度比软引用更弱些，被弱引用关联的对象只能生存到下一次垃圾收集发生之前。当垃圾收集器工作时，无论当前内存是否足够，都会回收掉只被弱引用关联的对象。在 JDK1.2 之后，提供了WeakReference类来实现弱引用。

虚引用（Phantom Reference）：也称为幻引用，最弱的一种引用关系，完全不会对其生存时间构成影响，也无法通过虚引用来取得一个对象实例。为一个对象设置虚引用关联的唯一目的是希望能在这个对象被收集器回收时收到一个系统通知。JDK1.2 之后提供了PhantomReference类来实现虚引用。
