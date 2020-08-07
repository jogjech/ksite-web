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

<script lang="ts">
import Vue from 'vue'

const axios = require('axios')
const bowser = require('bowser')

export default Vue.extend({
  name: 'Conan',
  async asyncData({ $axios, $config }) {
    const { data } = await $axios.get(`${$config.apiURL}/api/episodes/conan/`)
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
    const broswerName: string = browser.name
    if (
      broswerName === 'Chrome' ||
      broswerName === 'Safari' ||
      broswerName === 'Firefox'
    ) {
      this.classicBrowser = false
    }
  },
  methods: {
    async submit() {
      if (this.episodeId) {
        const response = await axios.get(
          `${this.$config.apiURL}/api/episodes/conan/${this.episodeId}`
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
})
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
