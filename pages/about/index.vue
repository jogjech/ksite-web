<template>
  <div>
    <nav-bar />
    <div class="container m-auto pt-8 px-4 max-w-screen-lg">
      <p class="text-3xl font-normal py-4">About</p>
      <p class="text-lg font-light py-1">whoami?</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/common/NavBar.vue'

export default Vue.extend({
  components: {
    NavBar,
  },
})
</script>
