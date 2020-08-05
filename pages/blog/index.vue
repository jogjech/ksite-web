<template>
  <div>
    <nav-bar />
    <div class="container m-auto pt-8 px-4 max-w-screen-lg">
      <p class="text-3xl font-normal py-4">Ksite Blog</p>
      <p class="text-lg font-light py-1">
        随便逛逛吧
      </p>
      <ul>
        <li class="list-disc">
          <nuxt-link to="/blog/1-nuxt-setup">Nuxt.js 配置</nuxt-link>
        </li>
        <li class="list-disc">
          <nuxt-link to="/blog/2-nuxt-axios">
            在 Nuxt.js 使用 axios 的坑
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar'

export default {
  components: {
    NavBar,
  },
}
</script>

<style scoped></style>
