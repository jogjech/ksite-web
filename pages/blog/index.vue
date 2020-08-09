<template>
  <div>
    <nav-bar />
    <div class="container m-auto pt-8 px-4 max-w-screen-lg">
      <p class="text-3xl font-normal py-4">Ksite Blog</p>
      <div class="pt-8">
        <ul>
          <li v-for="article of articles" :key="article.slug" class="list-disc">
            <NuxtLink
              :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            >
              <div>
                <p class="hover:underline text-lg">{{ article.title }}</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'readingTime'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles,
    }
  },
})
</script>
