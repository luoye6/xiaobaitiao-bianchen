# String,StringBuffer,StringBuilder之间的区别和联系

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- 首先String类是final修饰，不可继承，底层维护了private final char value[] 属性，因此是常量，不能修改其引用地址,但是单个字符内容是可以发生改变，其实就是常量池和堆，String修改内容，会导致大量副本残留，因此效率会降低。
- StringBuffer是线程安全的，因为有synchronized修饰，底层用的和StringBuilder一样的AbstractStringBuilder的append。
- StringBuilder是线程不安全的，适合单线程情况下使用，但速度最快。
- 效率对比: StringBuilder>StringBuffer>String