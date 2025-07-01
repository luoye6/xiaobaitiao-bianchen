# HashMap的实现原理

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- 初始化大小默认16,2倍扩容机制
- 负载因子0.75
- HashMap在JDK1.7中存储结构采用数组+链表。HashMap采取Entry数组来存储key-value，每一个键值对组成了一个Entry实体，Entry类实际上是一个单向的链表结构，它具有next指针，指向下一个Entry实体，以此来解决Hash冲突的问题。
- HashMap在JDK1.8中采用数组+链表+红黑树，当链表长度大于等于8，并且数组长度大于等于64的时候进行树化，如果数组长度不大于64，仅进行正常的数组扩容