# InnoDB 引擎和 MyISAM 引擎的区别是什么？

1）InnoDB 支持事务，而 MyISAM 不支持事务

2）InnoDB 支持行锁，而 MyISAM 仅支持表锁

3）InnoDB 有崩溃回复数据的能力，而 MyISAM 不支持恢复数据

4）InnoDB 支持外键，MyISAM 不支持外键。

5）InnoDB 有隐藏字段 Row_id 自动生成聚簇索引（当没有唯一并且非空的字段时候），MyISAM 存储了表的行数，可以快速获取表的记录值，而 InnoDB 需要全表扫描。

6）InnoDB 数据文件和索引文件放在一起，因此是聚簇索引，而 MyISAM 数据文件和索引文件分离，是非聚簇索引，可能会产生回表现象，导致并发性能下降。

7）MyISAM 分别三个文件 .frm 存放表结构，.myi 存放索引、.myd 存放数据结构，InnoDB 分为两个文件 .frm 存放表结构 .ibd 存放数据和索引文件。