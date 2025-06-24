# String两种创建对象的区别

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- 方法一: 直接赋值: String s = "xiaobaitiao"
- 方法二：调用构造器: String s2 = new String ("xiaobaitiao")
- 方法一过程; 先从常量池查看是否有"xiaobaitiao",如果有，直接指向，如果没有，重新创建，然后指向，S最终指向的是常量池的空间地址 创建0或1个对象
- 方法二过程: 先在堆中创建空间，里面维护了一个value属性，指向常量池的xiaobaitiao空间,如果常量池没有"xiaobaitiao",重新创建，如果有，通过value指向，S2最终指向的是堆中的空间地址 创建1或2个对象
- 补充: intern()方法，会查看常量池是否包含此字符串用equals方法确定，返回的是常量池的地址对象