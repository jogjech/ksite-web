<template>
  <div>
    <NavBar active-route="/" />
    <div class="container m-auto pt-8 px-4">
      <p class="text-3xl font-normal py-4">Ksite</p>
      <p class="text-lg font-light py-1">
        Hello! This is Kevin Wang's playground. I am a full-time software
        developer. I am passionate of building
        <n-link to="https://vuejs.org/" class="">Vue.js</n-link> and
        <n-link to="https://nodejs.org/en/">Node.js</n-link> apps.
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
