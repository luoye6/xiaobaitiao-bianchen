# 杭州天健咨询 Java 实习面经

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

1）自我介绍

2）开源项目功能点介绍

我参与开发了一个名为XX的开源项目，主要功能包括：

1. **核心功能A**：实现了XX功能，采用XX技术解决XX问题，特点是XX
2. **模块B**：提供XX能力，支持XX场景下的XX需求
3. **特色功能C**：创新性地使用XX方法，解决了行业内的XX痛点
4. **扩展性设计**：通过XX设计模式，使系统易于扩展和维护

该项目已在GitHub上获得XX星标，被XX公司采用于生产环境。

3）向量型数据库了解吗

向量数据库是专门为存储和查询向量数据（高维数值数组）优化的数据库系统，主要用于相似性搜索。我的理解如下：

1. **核心特性**：
   - 高效处理高维向量数据
   - 支持近似最近邻(ANN)搜索
   - 提供相似度计算能力
2. **常见应用场景**：
   - 推荐系统
   - 图像/视频/音频检索
   - 自然语言处理
   - 异常检测
3. **代表产品**：
   - Milvus
   - Pinecone
   - Weaviate
   - FAISS(Facebook开发的库)
4. **与传统数据库区别**：
   - 传统数据库擅长精确匹配，向量数据库擅长相似性搜索
   - 使用余弦相似度、欧氏距离等度量方式

4）SpringCloud 微服务了解多少

1. **核心组件**：
   - **服务注册与发现**：Eureka/Nacos
   - **负载均衡**：Ribbon/Spring Cloud LoadBalancer
   - **服务调用**：Feign/OpenFeign
   - **熔断降级**：Hystrix/Sentinel
   - **网关**：Zuul/Spring Cloud Gateway
   - **配置中心**：Spring Cloud Config/Nacos
   - **分布式追踪**：Sleuth + Zipkin
2. **实践经验**：
   - 使用Spring Cloud Alibaba生态(Nacos+Sentinel)构建微服务
   - 实现基于JWT的微服务认证授权
   - 设计分布式事务解决方案(Seata)
   - 微服务链路监控和日志聚合
3. **理解**：
   - 微服务架构的优缺点及适用场景
   - 服务拆分原则(DDD领域驱动设计)
   - 容器化部署(Docker+K8S)经验

5）单体事务是如何保证的，介绍一下

在单体应用中，主要通过以下机制保证事务(ACID特性)：

1. **本地事务**：
   - 使用数据库事务(如MySQL的InnoDB引擎)
   - 通过`BEGIN`、`COMMIT`、`ROLLBACK`控制
   - Spring的`@Transactional`注解简化管理
2. **实现原理**：
   - **原子性**：通过undo log实现回滚
   - **一致性**：由应用和数据库共同保证
   - **隔离性**：通过锁机制和MVCC实现
     - 隔离级别：读未提交、读已提交、可重复读、串行化
   - **持久性**：通过redo log保证
3. **Spring事务管理**：
   - 传播行为(PROPAGATION_*)
   - 隔离级别(ISOLATION_*)
   - 回滚规则
   - 事务超时设置
4. **注意事项**：
   - 避免大事务
   - 注意事务失效场景(如自调用、非public方法等)
   - 合理选择隔离级别

6）RBAC 角色权限是怎么控制的？

RBAC(基于角色的访问控制)是一种权限管理模型，我的理解如下：

1. **核心概念**：
   - **用户(User)**：系统使用者
   - **角色(Role)**：权限集合
   - **权限(Permission)**：资源+操作(如user:add)
2. **数据模型**：
   - 用户-角色多对多关系
   - 角色-权限多对多关系
   - 可能需要部门/岗位等扩展维度
3. **实现方式**：
   - **数据库设计**：5张表(用户、角色、权限、用户角色关系、角色权限关系)
   - **权限验证**：
     - 基于注解(如`@PreAuthorize("hasRole('ADMIN')")`)
     - 基于拦截器/过滤器
   - **前端控制**：根据权限数据动态生成菜单和按钮
4. **扩展模式**：
   - 角色继承
   - 权限组
   - 数据权限控制(行级/列级)
5. **实践建议**：
   - 避免角色爆炸
   - 支持权限的细粒度控制
   - 考虑权限缓存机制

7）leftJoin、rightJoin、和自连接区别

1. **LEFT JOIN(左连接)**：
   - 返回左表所有记录，即使右表没有匹配
   - 右表无匹配时显示NULL
   - 语法：`SELECT...FROM table1 LEFT JOIN table2 ON...`
2. **RIGHT JOIN(右连接)**：
   - 返回右表所有记录，即使左表没有匹配
   - 左表无匹配时显示NULL
   - 语法：`SELECT...FROM table1 RIGHT JOIN table2 ON...`
3. **自连接(Self Join)**：
   - 同一表与自己连接
   - 用于处理层级数据(如组织结构)
   - 语法：`SELECT...FROM table1 a JOIN table1 b ON...`
4. **关键区别**：
   - 结果集不同：LEFT JOIN以左表为主，RIGHT JOIN以右表为主
   - 自连接是特殊场景，用于处理表内关系
   - INNER JOIN只返回两表都匹配的记录
5. **使用场景**：
   - LEFT JOIN：需要主表完整数据+关联表可选信息
   - RIGHT JOIN：较少使用(通常可用LEFT JOIN替代)
   - 自连接：树形结构查询、数据对比等

8）假如某些数据权限需要控制，比如某个数据库，某张表等，你如何设计

针对数据权限控制，我会设计如下方案：

1. **权限模型设计**：

   - 资源类型：数据库、表、字段、行
   - 操作类型：SELECT、INSERT、UPDATE、DELETE等
   - 权限粒度：粗粒度(库/表) + 细粒度(行/列)

2. **技术实现**：

   - **元数据管理**：维护资源目录
   - **权限规则引擎**：解析和评估权限规则
   - **SQL拦截改写**：通过AOP或JDBC代理修改SQL
     - 行级：自动添加WHERE条件(如`AND dept_id = user_dept`)
     - 列级：选择性地排除敏感字段

3. **存储设计**：

   ```sql
   CREATE TABLE data_permission (
     id BIGINT PRIMARY KEY,
     role_id BIGINT,
     resource_type VARCHAR(20), -- DATABASE/TABLE/ROW/COLUMN
     resource_id VARCHAR(100), -- 资源标识
     operations VARCHAR(50), -- 逗号分隔的操作类型
     condition_expression VARCHAR(200) -- 行级条件表达式
   );
   ```

1. **动态数据源**：
   - 根据用户权限路由到不同数据源
   - 实现多租户隔离
2. **缓存优化**：
   - 权限规则缓存
   - 避免每次请求都查询权限
3. **审计与合规**：
   - 记录数据访问日志
   - 敏感操作二次验证

9）前端怎么发网络请求的，axios

10）异步，Promise,async await

11）redis 在你项目是怎么使用的？

在我参与的项目中，Redis主要应用于以下场景：

1. **缓存层**：
   - 数据库查询缓存，减轻DB压力
   - 使用RedisTemplate或Lettuce客户端
   - 缓存策略：Cache-Aside模式
   - 缓存击穿/雪崩/穿透解决方案
2. **会话管理**：
   - 分布式Session存储
   - Spring Session + Redis实现
3. **分布式锁**：
   - 使用SETNX实现互斥锁
   - RedLock算法保证可靠性
   - 业务场景：秒杀、定时任务防重
4. **排行榜功能**：
   - 利用ZSET实现实时排名
   - 支持分数更新和范围查询
5. **消息队列**：
   - 简单场景使用List作为队列
   - 发布/订阅模式实现事件通知
6. **统计计数**：
   - 使用INCR实现原子计数器
   - 应用：PV/UV统计、点赞数

12）反问，公司业务，技术栈



答案采用了相关 AI 的回答，可以自己思考下相关问题。

过了一天就 OC 通过了,这家我记得是 120 一天好像。

程序员小白条的编程日记：[https://xbt.xiaobaitiao.top/](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fxbt.xiaobaitiao.top%2F) （分享大学经历、求职经历、职场工作、创作经历、生活日常、面经、技术分享等等）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，看完可冲中大厂！