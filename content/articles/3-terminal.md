---
title: 用 Tailwind CSS 写（抄）一个可以在博客中使用的 Terminal
description: '用Tailwind CSS写（抄）一个可以在博客中使用的Terminal'
# createdAt: '2018-01-08'
---

今天花了点时间捅咕出了一个Terminal。感谢 MagedAhmad 的[代码](https://tailwindcomponents.com/component/terminal)!

下面是效果：

<terminal>npm run build</terminal>

## 什么是 Tailwind CSS？
[Tailwind CSS](https://tailwindcss.com/) 是一个 low-level 的CSS库，所有的内容都是inline html风格。这个CSS库将常用的CSS代码抽象成很多小组件，使用者可以自由组合，实现任何想实现的风格。

## 步骤1：抄代码

从上面👆的链接把代码扒下来。其实整个代码只有HTML部分，CSS的部分使用了Tailwind CSS，所以都是inline style。

```html
<div class="w-full">
  <div class="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 pt-4 rounded-lg leading-normal overflow-hidden">
    <div class="top mb-2 flex">
      <div class="h-3 w-3 bg-red-500 rounded-full"></div>
      <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
      <div class="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
    </div>
    <div class="mt-4 flex">
      <span class="text-green-400">computer:~$</span>
      <p class="flex-1 typing items-center pl-2">
        apt-get hire me 
        <br>
      </p>
    </div>
  </div>
</div>
```

## 步骤2：添加到 global component

因为我的blog是用的 [Nuxt content](https://content.nuxtjs.org/)，如果想在 `.md` 文件中加入 Vue component，必须将 component 放在 `/components/global` 文件夹中，注册成 global 的组件。所以我们要做的就是将上面的代码复制到 `/components/global` 文件夹中，并命名为 `Terminal.vue`。

```vue[Terminal.vue]
<template>
  <div>
    // Same code as above
  </div>
</template>
```

## 步骤3：改改 CSS

由于我使用了 [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin/) 来美化 `.md` 代码，`prose` 这个 class 会给 `<p>` tag 加上 margin-top 和 margin-bottom。这会导致 terminal 中的文字向下偏移。为了解决这个问题，我在 `Terminal.vue` 中加入了 CSS 来 override margin：

```vue[Terminal.vue]
<style scoped>
.remove-margin {
  margin: 0 !important;
}
</style>
```

这个方法有点简单粗暴，实在是因为我不太会用CSS。如果有更好的办法请告诉我。

## 步骤4：避免 hardcode，让 component 可以自由输入文字

现在在 `.md` 中使用

```md[article.md]
<terminal></terminal>
```

就可以看见好看的 terminal 啦！

但是 terminal 的内容是固定的。我们的最后一步就是让 terminal 可以显示我们输入的任何文字。

我想象的结果是：

```md[article.md]
<terminal>
  yarn start
</terminal>
```

所以我们可以使用 Vue 的 `<slot>`。关于什么是 slot，可以阅读[官方文档](https://vuejs.org/v2/guide/components-slots.html)。使用方法很简单，将 `<p>npm run start</p>` 换成 `<p><slot></slot></p>`。

下面我们试试：

<terminal>
  yarn start
</terminal>
