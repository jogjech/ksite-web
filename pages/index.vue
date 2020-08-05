<template>
  <div>
    <nav-bar />
    <div class="container m-auto pt-8 px-4 max-w-screen-lg">
      <p class="text-3xl font-normal py-4">Ksite</p>
      <p class="text-lg font-light py-1">
        Hello! This is Kevin Wang's playground. I am a full-time software
        developer. I am passionate of building
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="https://nodejs.org/en" target="_blank">Node.js</a> apps.
      </p>
      <p class="text-lg font-light py-1">
        This site is powered by Nuxt.js, Express.js, MongoDB, and hosted on
        Vultr VPS.
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
export default {
  components: {
    NavBar,
  },
}
</script>

<style scoped>
a {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
  &:hover {
    background-size: 100% 88%;
  }
}
</style>
