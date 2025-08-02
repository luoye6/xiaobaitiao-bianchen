# **Tomcat是如何打破双亲委派机制的呢？**

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

![](https://pic.yupi.icu/5563/202508021223554.png)

真正实现web应用程序之间的类加载器相互隔离独立的是WebAppClassLoader类加载器。它为什么可以隔离每个web应用程序呢？原因就是它打破了"双亲委派"的机制，如果收到类加载的请求，它会先尝试自己去加载，如果找不到在交给父加载器去加载，这么做的目的就是为了优先加载Web应用程序自己定义的类来实现web应用程序相互隔离独立的。

1.重写findClass方法，先在应用本地目录下查找类，如果在本地目录没有找到，委派父加载器去查找，如果都没有找到，抛出异常。

2.重写loadClass方法:

1. 先在本地缓存中查找该类是否已经加载过，如果加载过就返回缓存中的。
2. 如果没有加载过，委托给AppClassLoader是否加载过，如果加载过就返回。
3. 如果AppClassLoader也没加载过，委托给ExtClassLoader去加载，这么做的目的就是：

1. 1. 防止应用自己的类库覆盖了核心类库，因为WebAppClassLoader需要打破双亲委托机制，假如应用里自定义了一个叫java.lang.String的类，如果先加载这个类，就会覆盖核心类库的java.lang.String，所以说它会优先尝试用ExtClassLoader去加载，因为ExtClassLoader加载不到同样也会委托给BootstrapClassLoader去加载，也就避免了覆盖了核心类库的问题。

1. 如果ExtClassLoader也没有查找到，说明核心类库中没有这个类，那么就在本地应用目录下查找此类并加载。
2. 如果本地应用目录下还有没有这个类，那么肯定不是应用自己定义的类，那么就由AppClassLoader去加载。

1. 1. 这里是通过Class.forName()调用AppClassLoader类加载器的，因为Class.forName()的默认加载器就是AppClassLoader。

1. 如果上述都没有找到，那么只能抛出ClassNotFoundException了。