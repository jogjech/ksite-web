<template>
  <div>
    <nav-bar />
    <article class="container m-auto py-8 px-4 max-w-screen-lg">
      <div class="pb-8">
        <p class="text-4xl">{{ article.title }}</p>
        <!-- <p>{{ article.description }}</p> -->
        <div class="text-gray-600 font-light">
          <p>
            {{ formatDate(article.createdAt) }} &middot;
            {{ article.readingTime }}
          </p>
          <div class="flex items-center">
            <img src="@/assets/svg/icon-view.svg" class="inline-block" />
            {{ views }}
            <img
              src="@/assets/svg/icon-comment.svg"
              class="inline-block pl-2"
            />
            {{ comments.length }}
          </div>
        </div>
      </div>

      <nuxt-content :document="article" class="prose max-w-full pb-8" />
      <prev-next :prev="prev" :next="next" />

      <!-- Comment section -->
      <div class="pt-5">
        <div v-if="comments.length > 0" class="w-full">
          <p class="text-2xl">{{ comments.length }} 条评论</p>
          <div v-for="singleComment in comments" :key="singleComment.date">
            <p>
              路人甲 <span class="text-gray-700">说：</span
              >{{ singleComment.body }}
            </p>
          </div>
        </div>
        <div class="pt-3 w-full">
          <p class="text-2xl">发表评论</p>
          <label class="block">
            <textarea
              v-model="comment"
              class="form-textarea mt-1 block w-full border border-gray-600 rounded resize-none outline-none p-3"
              rows="3"
              placeholder="写下你的评论"
            />
            <!-- Button: https://tailwindcomponents.com/component/buttons-with-icons -->
            <div class="my-3">
              <button
                :disabled="!comment"
                :class="
                  comment
                    ? 'bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center'
                    : 'bg-white text-gray-800 font-bold rounded border-b-2 border-grey-500 hover:bg-grey-500 shadow-md py-2 px-6 inline-flex items-center cursor-not-allowed'
                "
                @click="postComment"
              >
                <span class="mr-2">发表评论</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentcolor"
                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                  ></path>
                </svg>
              </button>
            </div>
            {{ postCommentResult }}
          </label>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, $axios, $config, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()

    const { data } = await $axios.get(
      `${$config.apiURL}/api/articles/${params.slug}`
    )

    const { views, comments } = data

    console.log(data)

    return {
      article,
      prev,
      next,
      views,
      comments,
    }
  },
  data() {
    return {
      comment: '',
      postCommentResult: '',
      comments: [] as { body: string; date: number }[],
    }
  },
  methods: {
    formatDate(date: string): string {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async postComment(): Promise<void> {
      if (!this.comment) {
        return
      }
      this.postCommentResult = ''
      try {
        await this.$axios.post(
          `${this.$config.apiURL}/api/articles/${this.$route.params.slug}/comments`,
          {
            comment: this.comment,
          }
        )
        this.comments.push({
          body: this.comment,
          date: Date.now(),
        })
        this.comment = ''
        this.postCommentResult = '评论已发表^_^'
      } catch (err) {
        console.log(err)
        this.postCommentResult = '出错了￣□￣｜｜'
      }
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
