<template>
   <tabbar>
     <tabbar-item 
          @on-item-click="jumpClick(vo)" 
          v-for="(vo,index) in list" 
          :key="index" 
          :selected="vo.path === activePath" 
          :badge="`${vo.path === '/session' && sysMsgUnread > 0 ? sysMsgUnread : ''}`">
          <img slot="icon" :src="vo.path === activePath ? `${vo.icon}_cli.png` : `${vo.icon}.png`">
          <span slot="label">{{vo.name}}</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import util from '../../utils'
import config from '../../configs'
export default {
 name: 'TabBar',
 components: {Tabbar, TabbarItem},
 data() {
 return {
   activePath:this.$route.path,
   list:[
     {name:'首页', path:'/home', icon:'/webdemo/h5/res/images/icon_index'},
     {name:'信息', path:'/session', icon:'/webdemo/h5/res/images/icon_tongz'},
     {name:'日程', path:'/schedule', icon:'/webdemo/h5/res/images/icon_richeng'},
     {name:'我的', path:'/general', icon:'/webdemo/h5/res/images/icon_mine'}
   ],
    myGroupIcon: config.defaultGroupIcon,
    myAdvancedIcon: config.defaultAdvancedIcon
 }
 },
 created(){},
 mounted(){
 },
 computed:{
   sysMsgUnread () {
     //系统消息通知个数
      let temp = this.$store.state.sysMsgUnread
      let sysMsgUnread = temp.addFriend || 0
      sysMsgUnread += temp.team || 0
      let customSysMsgUnread = this.$store.state.customSysMsgUnread
      const sysMsgNum= sysMsgUnread + customSysMsgUnread
      //聊天消息通知个数
      let sessionlist = this.$store.state.sessionlist.filter(item => {
        item.name = ''
        item.avatar = ''
        if (item.scene === 'p2p') {
          let userInfo = null
          if (item.to !== this.myPhoneId) {
            userInfo = this.userInfos[item.to]
          } else {
            // userInfo = this.myInfo
            // userInfo.alias = '我的手机'
            // userInfo.avatar = `${config.myPhoneIcon}`
            return false
          }
          if (userInfo) {
            item.name = util.getFriendAlias(userInfo)
            item.avatar = userInfo.avatar
          }
        } else if (item.scene === 'team') {
          let teamInfo = null
          teamInfo = this.$store.state.teamlist.find(team => {
            return team.teamId === item.to
          })
          if (teamInfo) {
            item.name = teamInfo.name
            item.avatar = teamInfo.avatar || (teamInfo.type === 'normal' ? this.myGroupIcon : this.myAdvancedIcon)
          } else {
            item.name = `群${item.to}`
            item.avatar = item.avatar || this.myGroupIcon
          }
        }
        let lastMsg = item.lastMsg || {}
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || ''
        } else if (lastMsg.type === 'custom') {
          item.lastMsgShow = util.parseCustomMsg(lastMsg)
        } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
          item.lastMsgShow = util.generateTeamSysmMsg(lastMsg)
        } else if (util.mapMsgType(lastMsg)) {
          item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
        } else {
          item.lastMsgShow = ''
        }
        if (item.updateTime) {
          item.updateTimeShow = util.formatDate(item.updateTime, true)
        }
        return item
      })

      let sessionNum=0
      sessionlist.forEach(item =>{
          sessionNum+=item.unread
      })

      return sysMsgNum + sessionNum
    },
    userInfos () {
      return this.$store.state.userInfos
    }
 },
 methods:{
   jumpClick(vo){
      this.activePath=vo.path
     this.$router.push({
       path:vo.path
     })
   }
 }
}
</script>

<style lang='less'>
.weui-tabbar{
  z-index:80 !important;
  .weui-bar__item_on{
     .weui-tabbar__label{
           color:#0188fd !important;
     }
  }
  
} 

</style>
