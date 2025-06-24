# SQL语句怎么进行的优化?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- 优化措施:

- - 对经常查询的字段建立合适的索引
  - 减少不必要的查询，对于前端调用接口返回的字段进行严格筛选，只返回必要的字段。
  - 减少join操作,可以用临时表或者子查询来避免join操作
  - 避免在where子句中使用表达式或者函数，会导致查询条件不能使用索引而导致查询效率下降。

- 开启慢查询日志命令

- - 首先在MySQL配置my.cnf中添加以下内容，然后重启MySQL服务。

- 

- ```tex
  [mysqld]
  slow_query_log = 1   
  slow_query_log_file = /var/log/mysql/mysql-slow.log 
  long_query_time = 1
  ```

- 

- 可以使用以下命令在Linux查看日志

$ sudo tail -f /var/log/mysql/mysql-slow.log 