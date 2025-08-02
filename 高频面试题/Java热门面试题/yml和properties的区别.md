# yml和properties的区别

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- yml是一种标记语言，可以跨语言，而properties只适用于SpringBoot项目。
- yml采用key:value 键值对形式,而properties是k-v格式
- yml采用UTF-8，中文不会乱码，但properties通过IO读取，默认ISO-8859-1中文会产生乱码
- properties不保证加载顺序，yml有先后加载顺序。
- 先加载yml,再properties,相同配置properties会覆盖yml的配置。