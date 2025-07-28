# 浙江用友 Java 实习面经

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

口述详细面经分享请关注dy号，感谢支持！
<img src="https://pic.yupi.icu/5563/202507082004834.png" width="300" height="300" />

面经是 KPI，晚上 9 点，蚌埠，不做过多阐述了

1）

面试官：自我介绍一下

我：重复性背诵工作

2）

面试官：SpringBoot 和 SpringMVC  有什么区别？

我：常规八股文，结合项目实战的自动装配特性去讲即可，

###  SpringBoot vs SpringMVC

**技术要点：**

- **SpringMVC**：基于Servlet的MVC框架，需手动配置DispatcherServlet、视图解析器等。
- **SpringBoot**：
  - **自动装配**：通过`@EnableAutoConfiguration`和`spring.factories`文件自动加载依赖配置。
  - **内嵌服务器**：默认集成Tomcat/Jetty，无需单独部署。
  - **Starter依赖**：简化依赖管理（如`spring-boot-starter-web`）。
  - **Actuator**：提供监控端点（如`/health`）。

**面试技巧：**
结合项目说明，例如："我在XX项目中用SpringBoot的`@SpringBootApplication`快速整合了MyBatis和Redis，省去了XML配置。"

3）

面试官：数据库了解多少？

我：阿巴阿巴，MySQL。

4） 

面试官：数据库怎么拼接字符串

我：Concat，截取字符串 Substring。

5）

面试官：按月份统计具体出生人名(Java)

我：HashMap，Key 为月份，Value 出生人名（集合）

```java
Map<Integer, List<String>> monthToNames = new HashMap<>();
// 假设persons是Person对象列表，含name和birthDate字段
for (Person person : persons) {
    int month = person.getBirthDate().getMonthValue(); // LocalDate获取月份
    monthToNames.computeIfAbsent(month, k -> new ArrayList<>()).add(person.getName());
}
// 输出结果
monthToNames.forEach((month, names) -> 
    System.out.println(month + "月: " + String.join(", ", names)));
```



6）

面试官：讲一下事务

我：讲下常规事务是什么，单体事务怎么做，声明式和编程式，底层原理，依赖什么日志

### 事务详解

**核心概念：**

- **ACID特性**：原子性（Undo Log）、一致性（业务约束）、隔离性（锁/MVCC）、持久性（Redo Log）。
- **事务传播行为**：如`REQUIRED`（默认）、`REQUIRES_NEW`。
- **隔离级别**：读未提交、读已提交（Oracle默认）、可重复读（MySQL默认）、串行化。

**Spring事务实现：**

- **声明式**：`@Transactional`注解，基于AOP（动态代理）。
- **编程式**：`TransactionTemplate`手动控制。

**日志依赖：**

- **WAL（Write-Ahead Logging）**：如MySQL的Redo Log保证持久性。
- **Binlog**：主从复制和数据恢复。

7）

面试官：前端有了解吗？

我：会 Vue 和 React。无了.....

**建议回答：**
"熟悉Vue/React基础开发，例如：

- Vue：组件通信（Props/Emit）、Vuex状态管理、Vite构建工具。
- React：Hooks（useState/useEffect）、React-Router。
  在XX项目中实现过动态表单和API联调，但对深度优化经验较少。"

8）

面试官：能接受出差吗？什么时候到岗？有什么想问我的吗？

我内心OS：一份烂面经结束。

- **出差**：
  "可以接受短期出差，视项目需求而定。"
- **到岗时间**：
  "如录用，可在X周内到岗（留足离职交接时间）。"
- **反问环节**：
  推荐问题：
  "团队目前的技术栈和主要业务方向？"
  "实习生会有哪些成长支持（导师/培训）？"

不多说了，用友，反正实习薪资那就那样，晚上9点的面试，直呼内行！

程序员小白条的编程日记：[https://xbt.xiaobaitiao.top/](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fxbt.xiaobaitiao.top%2F) （分享如何拿到腾讯实习 Offer 和多个中大厂的面试机会，大学经历、求职经历、职场工作、创作经历、生活日常、面经、技术分享）定期更新内容，成长打怪系列，分享从大一到大四的完整面经，看完可冲中大厂！

