# 遇到慢 SQL 该如何监控？

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

在开发和维护数据库驱动的应用程序时，监控慢SQL查询是确保系统性能和稳定性的关键环节。慢查询会导致系统响应延迟、资源占用过高和用户体验下降等问题。本文将详细介绍慢SQL的监控方法和优化策略。

### 定义

慢SQL通常指执行时间超过预设阈值的查询语句。不同业务场景对"慢"的定义可能不同，例如电商系统可能将超过200ms的查询视为慢查询，而数据分析系统可能将超过5秒的查询才视为慢查询。定义标准应考虑业务需求和系统资源情况（总结自己不觉得慢就不是慢SQL doge)

### 工具监控

数据库系统通常提供内置的监控工具，如MySQL的慢查询日志和Performance Schema。慢查询日志需要配置long_query_time参数来定义阈值，记录执行时间超过该值的查询。Performance Schema则提供更详细的性能数据，包括查询执行时间、锁等待时间等指标。

常用命令如下

1）查看 Performance Schema 的配置信息

```sql
SHOW VARIABLES LIKE 'performance_schema%'
```

2）查看 Performance Schema 的监控项：

```sql
SELECT * FROM performance_schema.setup_instruments
```

3）查看 Performance Schema 收集的性能数据：

```sql
SELECT * FROM performance_schema.events_statements_summary_by_digest
```

### 分析慢SQL（面试经典Explain）

使用EXPLAIN命令可以分析查询执行计划，了解MySQL如何处理SQL语句。重点关注type列（访问类型）、possible_keys列（可能使用的索引）和rows列（预估扫描行数）等信息。对于复杂查询，可以使用EXPLAIN FORMAT=JSON获取更详细的执行计划。这个建议自己去试一试就知道了，实践的印象会更深，而不是纯记八股文。

### 优化慢SQL的策略（提几个）

优化索引是最有效的方法之一，确保查询条件列和排序字段都有适当索引。重构查询语句，避免使用SELECT *，减少不必要的数据传输。对于复杂查询，考虑拆分为多个简单查询。定期进行数据库维护，如更新统计信息、重建碎片化索引等。

慢 SQL 可以作为简历优化点进行编写，不要写的过于夸张，最好自己用 Jemter 测试一下，数量级要注意，别几十条数据几百条数据搞什么慢 SQL 优化。



程序员小白条的编程日记：[https://xbt.xiaobaitiao.top/](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fxbt.xiaobaitiao.top%2F) （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、面经、技术分享）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，看完可冲中大厂！公众号：**程序员落叶**

