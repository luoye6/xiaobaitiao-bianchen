# Lock锁

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- synchronized是Java语言的关键字。Lock是一个接口。
- synchronized不需要用户去手动释放锁，发生异常或者线程结束时自动释放锁;Lock则必须要用户去手动释放锁，如果没有主动释放锁，就有可能导致出现死锁现象。
- lock可以配置公平策略,实现线程按照先后顺序获取锁。
- 提供了trylock方法 可以试图获取锁，获取到或获取不到时，返回不同的返回值 让程序可以灵活处理。
- lock()和unlock()可以在不同的方法中执行,可以实现同一个线程在上一个方法中lock()在后续的其他方法中unlock(),比syncronized灵活的多。