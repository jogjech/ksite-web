<template>
  <a
    :class="
      active
        ? 'no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-md py-3 mr-8'
        : 'no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-md py-3 mr-8'
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
    active: Boolean,
    href: {
      type: String,
      default: '#',
    },
    text: {
      type: String,
      default: '#',
    },
  },
}
</script>
