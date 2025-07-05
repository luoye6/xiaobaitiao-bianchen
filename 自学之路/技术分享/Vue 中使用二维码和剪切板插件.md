# **Vue 中使用二维码和剪切板插件**

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

二维码官方文档：https://www.npmjs.com/package/qrcode-vue3

剪切板官方文档：https://www.npmjs.com/package/vue-clipboard3

## 二维码

### 1.依赖引入

```shell
npm install qrcode-vue3 --save
```

### 2.官方模版

```vue
<template>
  <div>

   <QRCodeVue3
          value="Simple QR code"
        />

   <QRCodeVue3
          :width="200"
          :height="200"
          value="https://scholtz.sk"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          :download="true"
          myclass="my-qur"
          imgclass="img-qr"
          downloadButton="my-button"
          :downloadOptions="{ name: 'vqr', extension: 'png' }"
        />
  </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: 'QRCodeVue3Example',
  components: {
    QRCodeVue3
  },
}
</script>
```

### 3.自定义模版

```vue
<template>
<QRCodeVue3
              :value="currentPageUrl"
              :width="200"
              :height="200"
              :imageOptions="{
                hideBackgroundDots: false,
                imageSize: 0.4,
                margin: 0
              }"
            />
</template>
<script>
  import QRCodeVue3 from "qrcode-vue3";
  // 当前页面地址
const currentPageUrl = ref(window.location.href);
</script>
```

## 剪切板

### 1.依赖引入

```shell
npm install vue-clipboard3
```

### 2.自定义模板

```vue
<script>
  import useClipboard from "vue-clipboard3";
// 复制链接
const { toClipboard } = useClipboard();
const copyLink = async () => {
  try {
    await toClipboard(currentPageUrl.value);
    ElMessage.success({
      message: "链接已复制到剪贴板",
      duration: 1000
    });
  } catch (e) {
    console.error("复制失败", e);
  }
};
  </script>
```