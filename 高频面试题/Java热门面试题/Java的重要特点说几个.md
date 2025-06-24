# Java的重要特点说几个

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答:**

- 面向对象(OOP)
- 健壮、强类型机制(Java静态语言，像JS,PHP,Python动态语言，不用指明类型，声明的时候简单，但优点也是缺点，所以JS->TS,用泛型会更加安全，在多态的向上传型和向下转型的过程中也会减少类型转化次数)、异常处理机制(try catch finally(可以省略),注意trc catch 块中有return 阻挡不了fianlly执行)、垃圾自动收集(system,gc(),弱引用，软引用，强引用，虚引用之类的问题)
- 跨平台性(指的是编译后的字节码文件是跨平台性的，比如windows->Linux OR mac) 因为操作系统(OS)是在硬件上的第一层软件 
- 解释性语言,编译性语言比如:c/c++,解释性语言JS,PHP,Java，解释性语言编译后不能直接被机器执行，需要一个环境(解释器JVM),Java既可以说是解释性又可以说是编译性，解释性主要是跨平台性,编译性主要是Java代码需要编译才能运行,主流说法还是解释性语言。