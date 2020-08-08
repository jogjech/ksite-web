---
title: 在 Nuxt.js 中使用 express.js（或其他的 server 中间件）
description: 'Nuxt.js setup'
---

## 如何加入Express.js
在最新的 `create-nuxt-app` 脚手架中已经没有了后端的配置。所以想使用 express.js 只能绕一绕路。我找到了两种方法。

来源：https://github.com/nuxt/create-nuxt-app/issues/563

### 方法1：使用旧版本（2.15.0之前）的 `create-nuxt-app`
<terminal>
npx create-nuxt-app@2.15.0
</terminal>

### 方法2：配置 serverMiddleware
更多细节可以阅读 [serverMiddleware 官方文档](https://nuxtjs.org/api/configuration-servermiddleware)。

在 `nuxt.config.js` 加入如下代码：

```javascript[nuxt.config.js]
serverMiddleware: ['~/server/index.js'],
```
然后创建文件 `/server/index.js`：
```javascript[index.js]
const express = require('express')

const app = express()

module.exports = { path: '/api', handler: app }

router.get('/', async (req, res, next) => {
  res.json({
    res: 'hi',
    ip: req.clientIp,
  })
})
```
所有的 express API 都会在 `/api` path 下面。然后就可以访问啦！
