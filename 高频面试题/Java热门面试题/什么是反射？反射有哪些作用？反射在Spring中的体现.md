# 什么是反射？反射有哪些作用？反射在Sping中的体现

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

**答：**

#### (1): 什么是反射?

- 反射可以在运行时获取到一个类的所有信息，包括(成员变量，成员方法，构造器等)
- 反射可以直接操作类的私有属性
- 反射就是把Java类中的各种成分映射成一个个的Java对象

#### (2): 反射有哪些作用?

- 获取类对应的字节码的对象 对象.getClass() Person.class Class.forName("类的全路径") 第三种是最安全，性能最好，补充第四种方法通过类加载器 getClassLoader().loadClass()
- 反射可以获取一个类的所有信息，比如包名，类名，构造器，方法，成员变量 可以操作私有属性和私有方法

#### (3): 反射在Spring中的体现

- SprignIOC控制反转利用：工厂模式+反射+xml解析(配置文件)
- 利用Class.forName("类的全路径").newInstance
- @Bean注入组件就是利用反射+代理模式
- 从容器中拿取，一般会写getBean("指定类名称")或者是getBean("类名称"，返回的Bean类型)
- 单元测试。JUnit等单元测试框架可以使用反射机制在运行时动态地获取类和方法的信息，实现自动化测试。