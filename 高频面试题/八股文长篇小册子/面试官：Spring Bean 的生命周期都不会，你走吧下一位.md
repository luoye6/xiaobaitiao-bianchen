# 面试官：Spring Bean 的生命周期都不会，你走吧下一位

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**面试官**：看你简历上写了不少Spring相关的项目经验，那我们来聊聊Spring的核心概念吧。你能详细说说Spring Bean的生命周期吗？

**我**：Bean的生命周期？这个...我知道有创建、初始化、销毁这些阶段，但具体的细节和顺序我有点记不清了...

<img src="https://pic.yupi.icu/5563/202511141944356.png" style="zoom:33%;" />

## 解析答案

### Spring Bean 生命周期的完整旅程

Spring Bean 的生命周期就像是一个人的一生，从出生（实例化）到成长（初始化），再到工作（使用），最后到退休（销毁）。让我们一起来探索这个精彩的过程：

#### 第一阶段：Bean 的诞生 - 实例化过程

**1. BeanDefinition 的加载**
Spring 首先读取配置信息（XML、注解或Java配置），解析成 BeanDefinition 对象。这就像是给 Bean 办理"出生证明"。

**2. 构造方法的推断**
如果有多个构造方法，Spring 会智能地选择最合适的那个：

- 优先选择带有 `@Autowired` 注解的构造方法
- 如果没有注解，选择无参构造方法
- 如果只有一个有参构造方法，直接使用它

**3. 对象的实例化**
通过反射机制创建 Bean 的实例，这相当于"新生儿"的诞生。

#### 第二阶段：Bean 的成长 - 初始化过程

**4. 属性注入（依赖注入）**
Spring 自动为加了 `@Autowired`、`@Value` 等注解的属性赋值：

```java
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;  // Spring 会自动注入
    @Value("${app.name}")
    private String appName;  // 配置属性注入
}
```

**5. Aware 接口回调**
如果 Bean 实现了特定的 Aware 接口，Spring 会回调相应方法：

- `BeanNameAware`：感知自己的 Bean 名称
- `BeanFactoryAware`：感知所在的 Bean 工厂
- `ApplicationContextAware`：感知应用上下文

**6. BeanPostProcessor 的前置处理**
这是 Spring 提供的重要扩展点，可以在初始化前进行自定义处理：

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("初始化前处理: " + beanName);
        return bean;
    }
}
```

**7. 初始化方法调用**
Spring 会按顺序调用初始化方法：

- 首先调用 `@PostConstruct` 注解的方法
- 然后调用 `InitializingBean` 接口的 `afterPropertiesSet()` 方法
- 最后调用 XML 中配置的 `init-method` 方法

**8. BeanPostProcessor 的后置处理**
这是 AOP 代理创建的关键时机：

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        // 这里可能会创建 AOP 代理对象
        System.out.println("初始化后处理: " + beanName);
        return bean;
    }
}
```

#### 第三阶段：Bean 的辉煌 - 使用阶段

**9. 加入单例池**
如果是单例 Bean，Spring 会将其放入单例池中，供后续使用。

**10. 正式服役**
此时 Bean 已经完全准备好，可以被应用程序正常使用了。

#### 第四阶段：Bean 的谢幕 - 销毁过程

**11. 容器关闭时的清理**
当 Spring 容器关闭时，会按顺序调用销毁方法：

- 首先调用 `@PreDestroy` 注解的方法
- 然后调用 `DisposableBean` 接口的 `destroy()` 方法
- 最后调用 XML 中配置的 `destroy-method` 方法

### Bean 作用域：不同的"人生轨迹"

不同的 Bean 作用域决定了它们不同的"人生轨迹"：

#### Singleton（单例）- 一生只爱一人

<img src="https://pic.yupi.icu/5563/202511141945680.png" style="zoom:25%;" />

```java
@Component
@Scope("singleton")
public class SingletonBean {
    // 整个应用中只有一个实例
}
```

- Spring 默认的作用域
- 整个应用生命周期内共享同一个实例
- 适合无状态的 Bean，如 Service、Repository

#### Prototype（原型）- 每次都是新的开始

```java
@Component
@Scope("prototype")
public class PrototypeBean {
    // 每次获取都是新的实例
}
```

- 每次 `getBean()` 都返回新的实例
- 适合有状态的 Bean
- Spring 不管理完整的生命周期，只负责创建

#### Request（请求）- 一次请求一次人生

```java
@Component
@Scope("request")
public class RequestBean {
    // 每个 HTTP 请求都有新的实例
}
```

- 每个 HTTP 请求创建新的实例
- 请求结束时自动销毁
- 适合存储请求相关数据

#### Session（会话）- 一次会话一段旅程

```java
@Component
@Scope("session")
public class SessionBean {
    // 每个用户会话都有新的实例
}
```

- 每个用户会话创建新的实例
- 会话结束时自动销毁
- 适合存储用户会话数据

### 实际开发中的最佳实践

#### 1. 选择合适的初始化时机

```java
@Component
public class CacheService {
    // 轻量级初始化放在构造方法
    public CacheService() {
        // 初始化基本数据结构
    }
    
    // 重量级初始化放在 @PostConstruct
    @PostConstruct
    public void init() {
        // 加载缓存数据，建立网络连接等
    }
}
```

#### 2. 正确处理异常

```java
@Component
public class CriticalService {
    @PostConstruct
    public void init() {
        try {
            // 关键初始化逻辑
        } catch (Exception e) {
            // 记录日志并抛出异常，让容器知道初始化失败
            throw new RuntimeException("初始化失败", e);
        }
    }
}
```

#### 3. 避免循环依赖

```java
@Service
public class ServiceA {
    // 构造方法注入可以避免某些循环依赖问题
    private final ServiceB serviceB;
    
    public ServiceA(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

## 欢迎交流

通过本文的详细讲解，相信你已经对 Spring Bean 的生命周期有了全面深入的理解。掌握这些知识不仅有助于面试，更能帮助你在实际开发中更好地使用 Spring 框架。以下几个问题可以帮助你进一步思考：

1. 在微服务架构中，Bean 的生命周期管理有什么特殊的考虑？
2. 如何利用 BeanPostProcessor 实现自定义的业务逻辑？
3. 在云原生环境下，Bean 的销毁过程需要注意哪些问题？

欢迎在评论区分享你的见解和实践经验！

<img src="https://pic.yupi.icu/5563/202511141946314.png" style="zoom:25%;" />

### 项目

项目适用人群：做课设、毕设的小伙伴、只学习了后端（或者前端），但想要自己做项目写在简历上，这三个项目可以作为拓展点。

项目有多线程、事务管理、Redis 缓存、买票问题、线程池、大模型调用等可以写的点，而且体验会发现接口响应速度是很快的，功能也比较实用，想要参与开源项目的 Commiter 也可以提出。

智能 AI 旅游推荐平台：https://github.com/luoye6/vue3_tourism_frontend

智能 AI 校园二手交易平台：https://github.com/luoye6/vue3_trade_frontend

GPT 智能图书馆：https://github.com/luoye6/Vue_BookManageSystem

**欢迎关注上方公众号！感谢支持！一起进步，共勉！**