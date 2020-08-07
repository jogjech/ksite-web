<template>
  <div class="divide-y pt-4">
    <div></div>
    <div class="flex justify-between pt-3">
      <NuxtLink
        v-if="prev"
        :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
        class="text-primary font-bold hover:underline"
      >
        &larr; {{ prev.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
      <NuxtLink
        v-if="next"
        :to="{ name: 'blog-slug', params: { slug: next.slug } }"
        class="font-bold hover:underline"
      >
        &rarr; {{ next.title }}
      </NuxtLink>
      <span v-else>&nbsp;</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
})
</script>
