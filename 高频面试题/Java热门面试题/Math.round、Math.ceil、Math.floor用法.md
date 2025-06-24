# Math.round、Math.ceil、Math.floor用法

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

- round可以用+0.5，然后向下取整(小于等于)
- 比如Math.round(-11.3) = -11,Math.round(-11.8)= -12
- floor:向下取整 Math.floor(11.3) = 11;Math.floor(-11.3) = -12;
- ceil: 向上取整 Math.ceil(11.3) = 12; Math.ceil(-11.3) = 11;
- ceil是天花板的意思，floor是地板，应该很容易记忆