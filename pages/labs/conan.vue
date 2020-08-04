<template>
  <div class="conan-div">
    <input
      v-model="episodeId"
      placeholder="输入集数"
      class="episode-input"
      @keyup.enter="submit"
      @blur="submit"
      @keyup="checkAndSubmit"
    />
    <p class="history">Watch History</p>
    <span v-for="(item, index) in watchHistory" :key="index" class="history">
      <a :href="classicBrowser ? item.classicUrl : item.newUrl">
        {{ item.episode }}
      </a>
    </span>
  </div>
</template>

<script>
const axios = require('axios')
const bowser = require('bowser')

export default {
  name: 'Conan',
  async asyncData({ $axios }) {
    const { data } = await $axios.get(
      `${process.env.API_URL}/api/episodes/conan/`
    )
    return { watchHistory: data.history }
  },
  data() {
    return {
      episodeId: '',
      classicBrowser: true,
    }
  },
  async created() {},
  mounted() {
    const { browser } = bowser.parse(window.navigator.userAgent)
    console.log(browser)
    if (
      browser.name === 'Chrome' ||
      browser.name === 'Safari' ||
      browser.name === 'Firefox'
    ) {
      this.classicBrowser = false
    }
  },
  methods: {
    async submit() {
      if (this.episodeId) {
        const response = await axios.get(
          `${process.env.API_URL}/api/episodes/conan/${this.episodeId}`
        )
        window.location.href = this.classicBrowser
          ? response.data.classicUrl
          : response.data.newUrl
      }
    },
    async checkAndSubmit() {
      if (this.episodeId.length === 3) {
        await this.submit()
      }
    },
  },
}
</script>

<style scoped>
.episode-input {
  font-size: 50px;
  height: 50vh;
  width: 100%;
}

.submit-btn {
  width: 100%;
  height: 50vh;
}

.history {
  margin: 0;
  padding-right: 30px;
  font-size: 60px;
}
</style>
