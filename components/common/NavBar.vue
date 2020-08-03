<template>
  <div>
    <nav class="bg-white px-8 pt-2 shadow-md">
      <div class="-mb-px flex justify-center">
        <NavBarItem :active="activeRoute === '/'" href="/" text="Home" />
        <NavBarItem
          :active="activeRoute === '/blog'"
          href="/blog"
          text="Blog"
        />
        <NavBarItem
          :active="activeRoute === '/labs'"
          href="/labs"
          text="Labs"
        />
        <NavBarItem
          :active="activeRoute === '/about'"
          href="/about"
          text="About"
        />
      </div>
    </nav>
  </div>
</template>

<script>
import NavBarItem from './NavBarItem'
export default {
  name: 'NavBar',
  components: {
    NavBarItem,
  },
  props: {
    activeRoute: {
      type: String,
      default: '#',
    },
  },
}
</script>
