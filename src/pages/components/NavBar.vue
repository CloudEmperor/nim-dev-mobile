<template>
  <tab class="g-header" :line-width="0">
    <tab-item @on-item-click="changePage" class="router-link">
      <router-link :to="{ name: 'session' }">会话</router-link>
    </tab-item>
    <tab-item @on-item-click="changePage" class="router-link">
      <router-link :to="{ name: 'contacts' }">通讯录</router-link>
    </tab-item>
  </tab>
</template>

<script>

import { Tab, TabItem, Loading, ViewBox, XHeader } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    Loading,
    ViewBox,
    XHeader
  },
  data () {
    return {
    }
  },
  computed: {
    route () {
      return this.$store.getters.route
    }
  },
  methods: {
    changePage (page) {
      console.log()
    }
  }
}
</script>