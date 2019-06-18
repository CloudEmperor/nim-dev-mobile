<template>
 <div class="g-window">
      <div class="g-inherit m-album">
        <div  class="g-center m-login">
          <div class="cells cells-log">
            <img class="logo" :src="logo">
          </div>
          <div class="cells">
            <div class="cell cell-ipt">
              <img src="/webdemo/h5/res/images/usernameIcon.png" class="icon icon-account"/>
              <input type="text" class="ipt ipt-account" maxlength="20" v-model="account" placeholder="请输入您的帐号"/>
            </div>
            <div class="cell cell-ipt">
              <img src="/webdemo/h5/res/images/passwordIcon.png" class="icon icon-pwd" />
              <input type="password" class="ipt ipt-account" maxlength="20" v-model="password" placeholder="请输入您的密码"/>
            </div>
          </div>
          <div class="cells cells-record">
            <span  @click.prevent="rbPassword($event)" ref="checkPassword">
              <input  v-model="checkPassword" id="checkbox-color1" type="checkbox"/><label for="checkbox-color1"></label>
              <i>记住密码</i>
            </span>
            <span @click.prevent="aLogin" ref="checkAuto">
              <input  v-model="checkAuto" id="checkbox-color2" type="checkbox" /><label for="checkbox-color2"></label>
              <i>自动登录</i>
            </span>
          </div>
          <div class="cells">
            <button v-if="isLogin" type="button" class="btn btn-login" @click="login">登录</button>
            <button v-else type="button" class="btn btn-login">登录中</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import cookie from '@/utils/cookie'
import config from '@/configs'
import loginApi from '@/api'

export default {
 name: 'Login',
 components: {},
 data() {
 return {
    logo: config.logo,
    account: '',
    password: '',
    checkPassword: false,
    checkAuto: false,
    isLogin: true,
    errorMsg: '',
    tokeForm: {
        uniqueId: '',
        osType: 1
    }
 }
 },
 created(){},
 mounted(){
    this.rbPassword('init')
    this.aLogin('init')
 },
 methods:{
     login() {
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
        this.tokeForm.uniqueId = this.account
        this.isLogin = false
        this.getToken()
    },
    autoFillUser() {
        if (this.checkPassword) {
            const uId = cookie.readCookie('uid') || ''
            const uPassword = cookie.readCookie('upw') || ''
            this.account = uId
            this.password = uPassword
            this.autoLogin()
        }
    },
    autoLogin() {
        if (cookie.readCookie('isPassword') === 'true' && cookie.readCookie('isLogin') === 'true') {
            cookie.delCookie("token")
            this.tokeForm.uniqueId = this.account
            this.isLogin = false
            this.getToken()
        }
    },
    getAppVersion() {
        let u = navigator.userAgent,
            app = navigator.appVersion;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        let type = null
        if (isAndroid) {
            type = 1
        } else {
            type = 2
        }

        return type

    },
    getToken() {
        const url = loginApi.getToken
        this.tokeForm.osType = this.getAppVersion()
        this.$get(url, this.tokeForm).then(res => {
            if (res.result === 0) {
                const token = res.data
                cookie.setCookie('token', token)
                this.adminLogin()
            } else {
                this.$vux.toast.text(res.message, 'bottom')
                this.isLogin = true
            }
        }).catch(err =>{
             this.$vux.toast.text('登陆失败，请重试', 'bottom')
             this.isLogin = true
        })
    },
    adminLogin() {
        const url = loginApi.login
        const postData = {
            loginName: this.account,
            password: this.password
        }
        this.$post(url, postData).then(res => {
            if (res.result === 0) {
                //登录权限判断 1项目经理 , 2 3领导
                if (res.data.permission_type !== '1' && res.data.permission_type !== '2' && res.data.permission_type !== '3') {
                    this.$vux.toast.text('您无权限,登陆失败', 'bottom')
                    return
                }
                //获取网易云信token
                let sdkToken = res.data.imTokenInfo.token
                let sdkAccid = res.data.imTokenInfo.accid
                    //记住密码
                let days = 1
                if (this.checkPassword) days = 30
                    //信息存储
                cookie.delCookie('permissionType')
                cookie.setCookie('permissionType', res.data.permission_type, days)
                cookie.setCookie('sdktoken', sdkToken, days)
                cookie.setCookie('upw', this.password, days)
                cookie.setCookie('uid', sdkAccid.toLowerCase(), days)
                cookie.setCookie('userName', res.data.userName)
                cookie.setCookie('userId', res.data.userId)
                //用于建立websocket
                cookie.setCookie('isReload','true')
                this.$router.replace({
                    path:'/home'
                })
            } else {
                this.$vux.toast.text(res.message, 'bottom')
                this.isLogin = true
            }

        }).catch(err =>{
             this.$vux.toast.text('登陆失败，请重试', 'bottom')
             this.isLogin = true
        })
    },
    rbPassword(type) {
        if (type === 'init') {
            this.checkPassword = cookie.readCookie('isPassword') === 'true' ? true : false
            this.autoFillUser()
        } else {
            this.checkPassword = !this.checkPassword
        }

        if (this.checkPassword) {
            this.$refs.checkPassword.setAttribute('class', 'rbpchecked')
        } else {
            this.$refs.checkPassword.setAttribute('class', 'sp')
            cookie.delCookie('uid')
            cookie.delCookie('upw')
        }
        cookie.setCookie('isPassword', this.checkPassword, 90)
    },
    aLogin(type) {
        if (type === 'init') {
            this.checkAuto = cookie.readCookie('isLogin') === 'true' ? true : false
        } else {
            this.checkAuto = !this.checkAuto
        }

        if (this.checkAuto) {
            this.$refs.checkAuto.setAttribute('class', 'alchecked')
        } else {
            this.$refs.checkAuto.setAttribute('class', 'sp')
        }
        cookie.setCookie('isLogin', this.checkAuto, 90)

    }
 }
}
</script>

<style lang='less'>
  .m-login {
    .cells {
      position: relative;
      margin: 10px auto;
      .cell {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #ddf;
        line-height: 2rem;
      }
      .cell-ipt{
           margin-bottom:1.25rem;
      }
      .cell-ipt:before {
           content:'';
           height:100%;
           width:1px;
           background:#fff;
           position:absolute;
           top: 0;
           left: 3rem;
      }
      .logo {
        display: block;
        margin: 1rem auto;
        width: 50%;
        height: auto;
      }
      .ipt {
        box-sizing: border-box;
        padding: 0.6rem 0 0.6rem 4rem;
        font-size: 0.9rem;
        color: #fff;
        width: 100%;
        border: none;
        outline: none;
        -webkit-appearance: none;
        border-radius: 4px;
        background-color: rgba(255,255,255,.2);
        &::placeholder {
          color: #fff;
        }
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      .icon-loading {
        background-position: 0 -112px;
      }
      .icon-account {
        background-position: 0 -112px;
        position: absolute;
        left: 1rem;
        top: 0.6rem;    
      }
      .icon-pwd {
        background-position: 0 -133px;
        position: absolute;
        left: 1rem;
        top: 0.6rem;
      }
      .btn {
        margin: 0.6rem 0;
        box-sizing: border-box;
        width: 100%;
        line-height: 2.4rem;
        height: 2.4rem;
        border-radius: 0.4rem;
        background: #fff;
        color: #333;
        font-size: 1rem;
        border: none;
        outline: none;
        -webkit-appearance: none;
        cursor: pointer;
      }
      .btn-regist {
        background: transparent;
        color: #fff;
      }
      .error {
        float: right;
        clear: both;
        color:  #ed0e0e;
      }
    }
    .cells-log{
      margin-bottom: 10rem;
    }
    .cells-record{
      display:flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        input[type=checkbox]{
            visibility: hidden;
            outline: none;
          }
        .checkbox-color1,.checkbox-color2 ,label{
            display: block;    
            width: 15px;    
            height: 15px;  
            border-radius: 4px;  
            cursor: pointer;    
            position: absolute;    
            top: 0;    
            left: 0;    
            background: #eee;
        }
         i{
           color:#fff;
           margin-left: 10px;
           font-size:12px;
         }
      }
      .rbpchecked {
        .checkbox-color1, label:before {
            display: block;
            width: 15px;    
            height: 15px; 
           content: "\2714";
           text-align: center;
           font-size: 12px;
           color: white;
           border-radius: 4px;  
           background: rgb(56,103,155);
        }
      }
      .alchecked {
        .checkbox-color2, label:before {
           display: block;
            width: 15px;    
            height: 15px; 
           content: "\2714";
           text-align: center;
           font-size: 12px;
           color: white;
           border-radius: 4px;  
           background: rgb(56,103,155);
        }
      }
    }
    .u-card {
      .weui-cells {
        background-color: inherit;
      }
    }
  }
</style>
