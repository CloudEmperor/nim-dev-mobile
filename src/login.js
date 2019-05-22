import Vue from 'vue'
import { ToastPlugin  } from 'vux'
Vue.use(ToastPlugin)

import { post, get } from "./utils/request"
Vue.prototype.$post = post
Vue.prototype.$get = get

// 添加Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './plugins/touchEvent'
Vue.use(VueTouch)

import md5 from './utils/md5'
import cookie from './utils/cookie'
import config from './configs'
import loginApi from './api/login'

var formData = new Vue({
  el: '#form-data',
  data: {
    logo: config.logo,
    account: '',
    password: '',
    checkPassword:true,
    checkAuto:true,
    isLogin:true,
    errorMsg: '',
    tokeForm:{
      uniqueId:'',
      osType:1
    }
  },
  mounted () {
    this.$el.style.display = "" 
    this.rbPassword('init')
    this.autoLogin('init')
    this.getAppVersion()
  },
  methods: {
    login () {
      if (this.account === '') {
        this.errorMsg = '帐号不能为空'
        this.$vux.toast.text(this.errorMsg, 'bottom')
        return
      } else if (this.password === '') {
        this.errorMsg = '密码不能为空'
        this.$vux.toast.text(this.errorMsg, 'bottom')
        return
      } else if (this.password.length < 6) {
        this.errorMsg = '密码至少需要6位'
        this.$vux.toast.text(this.errorMsg, 'bottom')
        return
      }
      this.errorMsg = ''
      cookie.delCookie("token")
      this.tokeForm.uniqueId=this.account
      this.isLogin=false
      this.getToken()
    },
    getAppVersion(){
      let u = navigator.userAgent, app = navigator.appVersion;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
      if (isAndroid) {
        this.tokeForm.osType=1
      } else{
        this.tokeForm.osType = 2
      }

    },
    getToken(){
      const url = loginApi.getToken
      this.$get(url, this.tokeForm).then(res =>{
        console.log(res)
        if (res.result ===0){
             const token = res.data
             cookie.setCookie('token', token)
             this.adminLogin()
        }else{
          this.$vux.toast.text(res.message, 'bottom')
          this.isLogin = true
        }
      })
    },
    adminLogin(){
      const url = loginApi.login
      const postData={
        loginName: this.account,
        password: this.password
      }
      this.$post(url, postData).then(res => {
        console.log(res)
        if (res.result === 0){
            //获取网易云信token
          let sdkToken = res.data.imTokenInfo.token
          let sdkAccid = res.data.imTokenInfo.accid
          cookie.delCookie('permissionType')
          cookie.setCookie('permissionType', res.data.permission_type)
          cookie.setCookie('sdktoken', sdkToken)
          cookie.setCookie('uid', sdkAccid.toLowerCase())
          location.href = config.homeUrl
        }else{
          this.$vux.toast.text(res.message, 'bottom')
          this.isLogin = true
        }
        
      })
    },
    rbPassword(type){
      if (type !== 'init'){
          this.checkPassword = !this.checkPassword  
      }
       
      if (this.checkPassword){
          this.$refs.checkPassword.setAttribute('class','rbpchecked')
      }else{
         this.$refs.checkPassword.setAttribute('class', 'sp')
      }
    },
    autoLogin(type){
      if (type !== 'init') {
          this.checkAuto = !this.checkAuto
      }

      if (this.checkAuto) {
        this.$refs.checkAuto.setAttribute('class', 'alchecked')
      } else {
        this.$refs.checkAuto.setAttribute('class', 'sp')
      }
     
    }
  },
})