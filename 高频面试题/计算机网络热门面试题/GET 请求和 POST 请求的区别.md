# GET 请求和 POST 请求的区别

- POST请求相对安全，GET请求相对不安全
- GET请求可以缓存，POST请求不能缓存
- GET请求有长度限制，POST请求没有长度限制
- GET只能传输字符串，POST可以传输多种类型数据
- GET请求入参在URL上，POST请求入参在Request body上
- POST*有可能*产生两个数据包，GET只会发送一个数据包
- 刷新和回退的时候GET请求无害，POST数据会被重新提交