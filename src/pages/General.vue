<template>
  <div class="General" v-if="myInfo.account">
    <!-- <group class="u-card">
      <cell :title="myInfo.nick" :inline-desc="'帐号: ' + myInfo.account">
        <img class="icon" slot="icon" width="20" :src="myInfo.avatar">
      </cell>
    </group>
    <group class="u-card">                                                                                                                                  
      <cell title="昵称">{{myInfo.nick || ''}}</cell>
      <cell title="性别">{{myInfo.gender}}</cell>
      <cell title="生日">{{myInfo.birth}}</cell>
      <cell title="手机">{{myInfo.tel}}</cell>
      <cell title="邮箱">{{myInfo.email}}</cell>
      <cell title="签名">{{myInfo.sign}}</cell>
    </group>
    <div>
      <x-button type="warn" action-type="button" @click.native="logout">注销</x-button>
    </div> -->
    <div class="General-dv">
        <img src="/webdemo/h5/res/images/pic_grzxbg.png" alt="">
        <span class="General-img">
          <img :src="myInfo.avatar" alt="" style="width: 80px;border-radius: 50%;height: 80px;">
        </span>
        <div style="position: absolute;top: 67%;left: 50%; color:#fff; font-size:1.3rem;transform:translateX(-50%)">
            {{userName}} 
        </div>
        <div class="General-ul">
            <ul>
              <li @click="jumpApproval">
                  <img src="/webdemo/h5/res/images/icon_spgl@2x.png" alt="" style="width:15%">
                  <span>审批管理</span>
                  <badge :text="approveLists" v-if="approveLists== 0 ? false : true"></badge>
              </li>
              <span class="General-posa"></span>
              <li @click="jumppending">
                  <img src="/webdemo/h5/res/images/icon_dclgz@2x.png" alt="" style="width:15%">
                  <span>待处理工作</span>
                  <badge :text="arrlength + arrlengths" v-if="arrlength== 0 ? false : true"></badge>
              </li>
            </ul>
        </div>
    </div>
    <div class="General-group">
      <ul>
        <li @click=" jumpinformation" >
            <img src="/webdemo/h5/res/images/icon_yjfk@2x.png" alt="">
            <span>意见反馈</span>
            <img src="/webdemo/h5/res/images/jiantou.png" alt="">
            <i></i>
        </li>
        <li @click="jumpappVersionInfo">
          <img src="/webdemo/h5/res/images/icon_bbsj@2x.png" alt="">
            <span>版本升级</span>
            <img src="/webdemo/h5/res/images/jiantou.png" alt="">
            <i style="float: right;margin-right: 2rem;">V1.0</i>
        </li>
        <li>
          <img src="/webdemo/h5/res/images/icon_mygz@2x.png" alt="">
            <span>关于我们</span>
            <img src="/webdemo/h5/res/images/jiantou.png" alt="">
            <i></i>
        </li>
         <li @click="logout">
          <!-- <img src="/webdemo/h5/res/images/icon_mygz@2x.png" alt="">
            <span>退出登录</span>
            <img src="/webdemo/h5/res/images/jiantou.png" alt="">
            <i></i> -->
            <x-button type="warn" action-type="button" @click.native="logout">退出登录</x-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Group, Cell,Badge } from 'vux'
import cookie from '@/utils/cookie'
export default {
  data(){
    return{
      approveLists:0,
      arrlength:0,
      arrlengths:0,
      userName:''
    }
  },
  components: {
    Group,
    Cell,
    Badge
  },
  computed: {
    myInfo () {
      return this.$store.state.myInfo
      console.log(this.$store.state.myInfo,'this.$store.state.myInfo')
    }
  },
  methods: {
    logout () {
      let that = this
      this.$vux.confirm.show({
        title: '确定要退出帐号？',
        onConfirm () {
          that.$store.dispatch('logout')
        }
      })
    },
    
    jumpApproval(){
        this.$router.push({ path: "/Approval",})
    },
    jumppending(){
        this.$router.push({ path: "/pending",})
    },
    jumpinformation(){
        this.$router.push({ path: "/information",})
    },
    approveList(index){
      let type = {
          type:  1
      }
      this.$post('/api/approve/approveList',type).then(res=>{
          if(type.type == 1){
              this.approveLists = res.approveList.length
              let arr = []
              res.approveList.forEach(element => {
                if(element.messageState == 0){
                  arr.push(element.messageState)
                }
              });
              this.arrlengths = arr.length
          }
      })
    },
    //   代办提醒/api/schedule/remindList
    remindList(){
        this.$post('/api/schedule/remindList').then(res=>{
            this.remindLists = res.remindList
            let arr = []
            this.remindLists.forEach(element => {
              if(element.messageState == 0){
                arr.push(element.messageState)
              }
            });
            this.arrlength = arr.length
        })
    },
    jumpappVersionInfo(){
       this.$vux.toast.text('当前已是最新版本', 'bottom')
    }
  },
  mounted(){
    this.approveList()
    this.approveList()
    this.remindList()
    this.userName = cookie.readCookie('userName')
  }
}
</script>
<style lang="less" >
    .General{
      width: 100%;
      background-color: rgb(244, 245, 247);
      height: 100%;
        .General-dv{
          position: relative;
          
          .General-img{
            border-radius: 50%;
            position: absolute;
            top: 22%;
            left: 50%;
            transform:translateX(-50%);
            img{
              width: 100%;
            }
          }
          >img{
            width: 100%;
            height: 27.55%;
          }
        }
        .General-ul{
          position: absolute;
          left: 0;
          bottom: -2.5rem;
          width: 100%;
          ul{
            overflow: hidden;
            background-color: #fff;
            margin: 0.5rem 0.4rem;
            border-radius: 8px;
             box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.078);
            // width: 100%;
            li{
              float: left;
              list-style: none;
              // padding: 0.4rem 1.5rem;
              width: 50%;
              padding: 0.4rem 0;
              text-align: -webkit-center;
              position: relative;
              img{
                margin-bottom: 0.5rem;
                display: block;
              }
              span{
                margin-top: 0.7rem;
                font-size: 1rem;
                // color: #666;
              }
              .vux-badge{
                position: absolute;
                top: -0.6rem;
                left: 9rem;
              }
            }
          }
          .General-posa{
            width: 0.1rem;
            height: 1.7rem;
            display: inline-block;
            background-color: blue;
            position: absolute;
            top: 2rem;
           
          }
        }
        .General-group{
          margin-top: 4rem;
          background-color: #fff;
          ul{
            overflow: hidden;
            padding: 0 15px;
            li{
              list-style: none;
              float: left;
              width: 100%;
              padding: 1.5rem 0;
              position: relative;
              border-bottom: 1px solid #efefef;
              img:nth-child(1){
                  width: 6%;
                  float: left;
              }
              span{
                margin-left: 1.5rem;
              }
              img:nth-child(3){
                  width: 3%;
                  float: right;
              }
              
            }
            li:last-child{
              border-bottom: 0;
            }
          }
         
        }
       
        
    }
</style>