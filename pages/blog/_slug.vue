<template>
  <div>
    <nav-bar />
    <article class="container m-auto pt-8 px-4">
      <div class="pb-8">
        <p class="text-4xl">{{ article.title }}</p>
        <!-- <p>{{ article.description }}</p> -->
        <p class="text-gray-600 italic">
          Article last updated: {{ formatDate(article.updatedAt) }}
        </p>
      </div>

      <nuxt-content :document="article" class="prose max-w-full pb-12" />
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/common/NavBar.vue'

export default Vue.extend({
  components: {
    NavBar,
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  methods: {
    formatDate(date: string): string {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
})
</script>
