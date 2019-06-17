import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import { post, get, patch, put, del } from "./utils/request"
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$del = del

// // 添加Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
//FastClick的点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};
FastClick.attach(document.body)

// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './plugins/touchEvent'
Vue.use(VueTouch)

// import VueRecyclerviewNew from 'vue-recyclerview'
// Vue.use(VueRecyclerviewNew)

// 同步单页路由与数据中心
import store from './store'
import router from './router'

require('./utils/polyfill')

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')