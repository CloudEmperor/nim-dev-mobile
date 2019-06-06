<template>
  <div class="g-window">
    <!-- 切页动画设置 -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <fullscreen-img></fullscreen-img>
  </div>
</template>

<script>
import Vue from 'vue'
import {Group, Cell, XHeader, XInput, XTextarea, XButton, XSwitch, Datetime, ViewBox, Search, ButtonTab, ButtonTabItem, Divider, Actionsheet, AlertPlugin, ConfirmPlugin} from 'vux'
import FullscreenImg from './pages/components/FullscreenImg'
// ToastPlugin是对vux中的ToastPlugin在使用上的简单封装。
import ToastPlugin from './plugins/toastPlugin'

// 全局注册vux的组件
Vue.component('Group', Group)
Vue.component('Cell', Cell)
Vue.component('Datetime', Datetime)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)
Vue.component('Divider', Divider)
Vue.component('Search', Search)
Vue.component('XInput', XInput)
Vue.component('XTextarea', XTextarea)
Vue.component('XButton', XButton)
Vue.component('XHeader', XHeader)
Vue.component('XSwitch', XSwitch)
Vue.component('ActionSheet', Actionsheet)

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

export default {
  data () {
    return {
      transitionName: 'forward'
    }
  },
  // 所有页面更新都会触发此函数
  updated () {
    // 提交sdk连接请求
     if(this.$route.name !=='login'){
          this.$store.dispatch('connect')
          this.$store.dispatch('updateRefreshState')
    }
  },
  components: {
    ViewBox,
    FullscreenImg
  }
}
</script>

