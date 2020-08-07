---
title: 在 Nuxt.js 使用 axios 的坑
description: '在 Nuxt.js 使用 axios 的坑'
---

## Nuxt Axios 模块
在 `create-nuxt-app` 中可以选择使用[axios模块](https://axios.nuxtjs.org/)，并且也是Nuxt官方推荐的模块。Axios 的使用方法很简单。下面我们来发一个简单的 `GET` request：

```javascript
const axios = require('axios')

axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
```

你在浏览的页面也是用 Nuxt 搭建的。这个网站的 server 端也 host 在了 Nuxt 中（为了方便部署，并不是什么最佳实践）。然而在 Nuxt 中使用时，却遇到了问题。

当我使用如下的代码时，

```javascript
const axios = require('axios')

// In Vue object
async asyncData() {
  const { data } = await axios.get(`/api/episodes/conan/`)
  return { watchHistory: data.history }
}
```
会遇到错误 `connect ECONNREFUSED 127.0.0.1:80`。Axios 会试图链接到localhost 80 port。

而当我指定了 hostname 和 port 后，就可以正常运行了：
```javascript
axios.get(`localhost:9000/api/episodes/conan/`)
```

## 尝试配置 Axios 模块
查阅了一些资料后，我发现 axios 模块支持很多的关于 URL 的 options：baseURL，browserBaseURL，或 proxy。具体的解释请阅读[官方文档](https://axios.nuxtjs.org/options.html#options)。

我在 `nuxt.config.js` 配置了 baseURL:

```javascript
export default {
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:9000', // Used as fallback if no runtime config is provided
  },
}
```

但是使用时遇到了问题。想阅读这个 baseURL，必须要用 `this.$axios.defaults.baseURL`。但是因为我在 asyncData 中使用（这个 method 只会在 server 端被叫到），这里并没有 `this` object，所以没有办法使用 `this.$axios`。

## 找到正确方法

然后我发现正确的在 `asyncData` 使用 axios 应该是如下写法：

```javascript
const axios = require('axios')

// In Vue object
async asyncData({ $axios }) {
  const { data } = await $axios.get(`/api/episodes/conan/`)
  return { watchHistory: data.history }
}
```

并且不需要配置baseURL。

哈哈，终于解决了。。(。-ω-)zzz

