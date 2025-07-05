# Vue 中使用 Markdown 编辑器

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

官方 Github 地址：https://github.com/imzbf/md-editor-v3/blob/develop/README-CN.md



## 1、安装依赖

```java
npm install md-editor-v3
```

## 2、编辑器模式

```vue
<template>
  <MdEditor
        :editorId="question.id" 
        :modelValue="question.content"
        previewTheme="github"
        showCodeRowNumber
        @on-change="handleChange"
      />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const question = ref({
  content: "",
  answer: "",
  tagList: [],
  title: ""
});
  // 监听文本修改，右侧同步进行修改
  const handleChange = (text: string) => {
  question.value.content = text;
};
</script>
```

## 3、仅预览模式

```vue
  <MdPreview
        :editorId="question.id"
        :modelValue="question.content"
        previewTheme="github"
        showCodeRowNumber
      />
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>
// 当使用服务端渲染时，scrollElement应该是字符类型，例：html、body、#id、.class。
```

## 4、修改样式

```css
<style lang="scss">
.md-editor-preview-wrapper {
  padding: 10px 0 !important;
}
</style>
// 需要全局样式 不能加 scoped
```

## 5、注意事项

### [🎲 editorId](https://imzbf.github.io/md-editor-v3/zh-CN/api#🎲 editorId)

- **类型**：`string`
- **默认值**：`'md-editor-v-\d'`

已过时。5.x 版本开始使用 id 替换。

编辑器唯一标识，使用默认前缀和`useId`拼接。当使用服务端渲染时，请务必设置该属性为固定值，防止产生服务端与客户端渲染内容不一致错误提示。，5.0 开始没有该限制。

不适用服务器渲染，直接不写即可。