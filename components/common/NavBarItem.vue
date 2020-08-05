<template>
  <a
    :class="
      currentSuperPath === href
        ? 'no-underline text-teal-500 border-b-2 border-teal-500 uppercase tracking-wide font-bold text-md py-3 mr-8'
        : 'no-underline text-gray-800 border-b-2 border-transparent uppercase tracking-wide font-bold text-md py-3 mr-8'
    "
    :href="href"
  >
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'NavBarItem',
  props: {
    href: {
      type: String,
      default: '#',
    },
    text: {
      type: String,
      default: '#',
    },
  },
  computed: {
    currentSuperPath() {
      return `/${this.$route.path.split('/')[1]}`
    },
  },
}
</script>
