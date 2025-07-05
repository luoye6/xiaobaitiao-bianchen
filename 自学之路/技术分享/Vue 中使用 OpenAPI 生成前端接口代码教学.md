# Vue 中使用 OpenAPI 生成前端接口代码教学

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

## 1、安装插件

```java
npm i --save-dev @umijs/openapi
```

## 2、在项目根目录新建 openapi.config.ts

```typescript
const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/utils/request'", // request.ts axios实例创建然后暴露 的路径
  schemaPath: "http://localhost:8102/api/v2/api-docs", // 后端 swagger/knife4j 打开接口文档的地址
  serversPath: "./src/api/generated" // 生成接口的路径
});
```

## 3、在 Package.json 添加运行脚本

```json
"scripts": {
      .......,
    "openapi": "ts-node openapi.config.ts"
  },
```

如果 ts-node 显示命令不存在，就是没安装ts-node,可以选择 npm i -g ts-node 或者直接将 ts-node 改成 node。

## 4、可能出现的问题

```typescript
interface MyAxiosRequestConfig extends AxiosRequestConfig {
  requestType?: string;
}
 return request<API.BaseResponseString_>("/api/file/upload", {
    method: "POST",
    params: {
      ...params
    },
    data: formData,
    requestType: "form", // 这行，AxiosRequestConfig 是不存在该字段，类型报错
   // 也可以手写一个文件上传的接口
    ...(options || {})
  } as MyAxiosRequestConfig);
```