# ==和equals的区别是什么?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- == 可以判断基本数据类型和引用类型
- == 判断基本数据类型，比较的是值是否相等
- == 判断引用类型，比较的地址是否相等
- equals是Object类中的方法，Object类还有clone()克隆,创建对象的一种方式，toString()全类名+@+哈希值的十六进制,notify()随机唤醒线程配置synchornized使用,wait()线程等待，释放当前锁,hashCode(),getClass()等等。equals只能用于比较引用类型
- 当你想比较两个对象中的内容是否相等，记得重写equals，不然判断的是两个的地址，肯定不同，判断的是对象的内容