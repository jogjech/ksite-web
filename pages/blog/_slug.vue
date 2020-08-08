<template>
  <div>
    <nav-bar />
    <article class="container m-auto py-8 px-4 max-w-screen-lg">
      <div class="pb-8">
        <p class="text-4xl">{{ article.title }}</p>
        <!-- <p>{{ article.description }}</p> -->
        <p class="text-gray-600 italic">
          Article last updated: {{ formatDate(article.updatedAt) }}
        </p>
      </div>

      <nuxt-content :document="article" class="prose max-w-full pb-8" />
      <prev-next :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  methods: {
    formatDate(date: string): string {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
})
</script>

<style>
/* Anchor is having some issue to scroll to the position. Tracked in https://github.com/nuxt/nuxt.js/issues/5359 */
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}

.nuxt-content-highlight {
  @apply relative;
}

.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm italic;
}
</style>
