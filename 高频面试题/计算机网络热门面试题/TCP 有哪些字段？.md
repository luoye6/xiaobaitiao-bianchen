# TCP 有哪些字段？

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

传输控制协议(Transmission Control Protocol，TCP)是一种传输层协议。TCP使数据包从源到目的地的传输更加顺畅。它是一种面向连接的端到端协议。每个数据包由TCP包裹在一个报头中，该报头由10个强制字段共20个字节和一个0到40 字节的可选数据字段组成

![](https://pic.yupi.icu/5563/202507121551465.png)

​      1.源端口号(Source Port)：16bits，该字段标识发送方应用程序的端口号。

​      2.目标端口号(Destination Port)：16bits，该字段标识接收方应用程序的端口号。

​      3.序列号(Sequence Number)：32bits，在连接建立(三次握手)后，该字段包含一个32位随机初始序列号/起始数据位，随后增加传输的字节数。

​      4.确认应答号(Acknowledgement Number)：32bits，接收方使用这个32位参数来请求下一个TCP段。它是下一个预测的TCP段的序列号。

​      5.报头长度(Header Length)：4bits，该字段表示TCP报头的大小，但是是按比例缩小的版本。

​      6.保留位(Reserved)：6bits，该字段的位设置为零。这些位保留供以后使用。

​      7.标志位(Flags bits)：6bits，一组六个字段，每个字段长一位。TCP标志用于指示TCP会话期间的特定状态，可用于故障排除或控制特定连接的处理方式。每个标志位值为1，表示特定标志为”设置”。