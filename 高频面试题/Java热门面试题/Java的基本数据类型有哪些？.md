# Java的基本数据类型有哪些

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- byte、short、char、int、long、float、double、boolean

补充:类,接口类,数组,枚举.注解，字符串都属于引用类型

- 存储位置的区别:
- 如果在方法中定义的基本数据类型，是在栈中存放，因为都听说过方法栈，在方法中定义的引用类型，它的内存地址值放在栈中，而该变量所指向的对象放在堆中，感觉和string为什么是不可变的差不多，底层维护的private final char value[] 单个字符内容可变，但是数组的引用地址不可变。
- 如果是全局变量，那么不管是引用类型还是基本数据类型都放在堆中