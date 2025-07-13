# 为什么现在不怎么使用 Hash索引

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

1）Hash 索引不能进行范围查询 Hash 索引指向的数据无序，而 B+ 树的叶子节点是个有序的链表

2）Hash 索引不支持联合索引的最左侧原则 Hash 索引在计算 Hash 值的时候是将索引键合并后再一起计算，无法对每个索引单独计算 Hash 值

3）Hash 索引不支持 Order By 排序

4）Hash 索引 无法进行模糊查询

5）等值查询，通常 Hash 索引的效率更高，但是如果索引类的重复值很多，效率会降低。



注意事项： MySQL 的 InnoDB 存储引擎有自适应 Hash 索引的功能，当索引值使用非常频繁的时候，会在 B + 树索引的基础上再创建一个 Hash 索引，这样让 B+ 树叶具备了 Hash 索引的优点。