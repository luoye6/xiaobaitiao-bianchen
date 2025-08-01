# TCP三次握手和四次挥手，为什么不能是两次握手，三次挥手?

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

TCP是一种面向连接的协议，其三次握手和四次挥手的过程是为了建立和终止连接，保证通信的可靠性和完整性。

三次握手的过程是：

1. 客户端向服务器发送SYN包（SYN=1，表示请求建立连接），并进入SYN_SENT状态。
2. 服务器收到SYN包，返回SYN+ACK包（SYN=1，ACK=1，表示确认请求并同意建立连接），并进入SYN_RCVD状态。
3. 客户端收到SYN+ACK包，发送ACK包（ACK=1，表示确认收到服务器的同意），并进入ESTABLISHED状态。

如果使用两次握手，那么会存在一种情况：客户端发送了SYN包，但是由于网络原因或其他问题导致该包延迟了一段时间到达服务器，此时服务器认为客户端要建立连接，向客户端发送了SYN+ACK包，并进入SYN_RCVD状态。但是客户端在等待服务器的ACK包时，却没有收到服务器的SYN+ACK包，认为连接未建立，所以不发送ACK包。这时，服务器一直在等待客户端的ACK包，连接也无法建立，造成资源浪费和效率低下。

四次挥手的过程是：

1. 客户端向服务器发送FIN包（FIN=1，表示要关闭连接），并进入FIN_WAIT1状态。
2. 服务器收到FIN包，返回ACK包（ACK=1，表示确认收到客户端的请求），并进入CLOSE_WAIT状态。
3. 服务器的应用程序将所有数据发送给客户端后，向客户端发送FIN包，并进入LAST_ACK状态。
4. 客户端收到FIN包后，发送ACK包（ACK=1，表示确认收到服务器的关闭请求），并进入TIME_WAIT状态，等待2MSL（最大报文段生存时间）后关闭连接。

如果使用三次挥手，那么会存在一种情况：客户端发送FIN包，服务器收到后立即返回ACK包，并进入CLOSE_WAIT状态。此时，客户端还有数据没有发送完毕，但是服务器已经关闭连接，客户端只能等待超时，才能关闭连接，造成连接的资源浪费。

因此，TCP协议采用三次握手和四次挥手的方式，以保证连接的可靠性和完整性。

### 