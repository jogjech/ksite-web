<template>
  <div>
    <NavBar active-route="/blog" />
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

<script>
import NavBar from '../../components/common/NavBar'

export default {
  components: {
    NavBar,
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
