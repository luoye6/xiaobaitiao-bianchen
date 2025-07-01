# HashMap和HashTable有什么区别?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- HashMap是JDK1.2引入的，线程不安全
- HashTable是JDK1.0引入的，线程安全
- HashMap中允许键和值为Null，而HashTable不允许
- HashTable直接使用对象的hashcode
- HashMap重新计算hash值（高低16位异或）
- HashMap没有HashTable的contains方法，改为containsKey和containsValue
- HashTable默认容量为11，HashMap为16
- HashTable扩容机制为11乘2+1,HashMap为16乘2
- HashTable继承Dictionary，HashMap继承AbstractMap
- 不建议使用HashTable,在多线程环境下，JDK1.5引入ConcurrentHashMap,在HashMap的基础上增加线程安全性保障