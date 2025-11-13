# 杭州端点信息 Java 一面

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

面经为身边好友提供，总体用时半小时，基本是 Java + Linux 为主，考研实际操作和普通八股文，无408。

### 1.SpringBoot的注解有哪些



### 2.SpringBoot的注解有哪些



### 3.MyBatis的一级缓存和二级缓存

**一级缓存localCache** 在应用运行过程中，我们有可能在一次数据库会话中，执行多次查询条件完全相同的 SQL， MyBatis 提供了一级缓存的方案优化这部分场景，如果是相同的 SQL 语句，会优先命中一级缓存， 避免直接对数据库进行查询，提高性能。 阿里内部资料 每个 SqlSession 中持有了 Executor，每个 Executor 中有一个 LocalCache。当用户发起查询时， MyBatis 根据当前执行的语句生成 MappedStatement，在 Local Cache 进行查询，如果缓存命中 的话，直接返回结果给用户，如果缓存没有命中的话，查询数据库，结果写入 Local Cache，最后 返回结果给用户。具体实现类的类关系图如下图所示

1. MyBatis 一级缓存的生命周期和 SqlSession 一致。 
2. MyBatis 一级缓存内部设计简单，只是一个没有容量限定的 HashMap，在缓存的功能性上有 所欠缺。
3. MyBatis 的一级缓存最大范围是 SqlSession 内部，有多个 SqlSession 或者分布式的环境下， 数据库写操作会引起脏数据，建议设定缓存级别为 Statement。

**二级缓存** 在上文中提到的一级缓存中，其最大的共享范围就是一个 SqlSession 内部，如果多个 SqlSession 之间需要共享缓存，则需要使用到二级缓存。开启二级缓存后，会使用 CachingExecutor 装饰 Executor，进入一级缓存的查询流程前，先在 CachingExecutor 进行二级缓存的查询，具体的工作 流程如下所示。

二级缓存开启后，同一个 namespace 下的所有操作语句，都影响着同一个 Cache，即二级缓存被 多个 SqlSession 共享，是一个全局的变量。 当开启缓存后，数据的查询执行的流程为： 

**二级缓存 -> 一级缓存 -> 数据库** 

1. MyBatis 的二级缓存相对于一级缓存来说，实现了 SqlSession 之间缓存数据的共享，同时粒度 更加细，能够到 namespace 级别，通过 Cache 接口实现类不同的组合，对 Cache 的可控性 也更强。
2. MyBatis 在多表查询时，极大可能会出现脏数据，有设计上的缺陷，安全使用二级缓存的条件 比较苛刻。
3. 在分布式环境下，由于默认的 MyBatis Cache 实现都是基于本地的，分布式环境下必然会出现 读取到脏数据，需要使用集中式缓存将 MyBatis 的 Cache 接口实现，有一定的开发成本，直 接使用 Redis、Memcached 等分布式缓存可能成本更低，安全性也更高。

### 4.用过JPA吗



### 5.用过gitlab或者svn吗



### 6.虚拟机常用注解



### 7.如何在虚拟机上部署一个项目



### 8.如何上传文件和图片，引入什么jar包



### 项目

项目适用人群：做课设、毕设的小伙伴、只学习了后端（或者前端），但想要自己做项目写在简历上，这三个项目可以作为拓展点。

项目有多线程、事务管理、Redis 缓存、买票问题、线程池、大模型调用等可以写的点，而且体验会发现接口响应速度是很快的，功能也比较实用，想要参与开源项目的 Commiter 也可以提出。

智能 AI 旅游推荐平台：https://github.com/luoye6/vue3_tourism_frontend

智能 AI 校园二手交易平台：https://github.com/luoye6/vue3_trade_frontend

GPT 智能图书馆：https://github.com/luoye6/Vue_BookManageSystem

**欢迎关注上方公众号！感谢支持！一起进步，共勉！**



