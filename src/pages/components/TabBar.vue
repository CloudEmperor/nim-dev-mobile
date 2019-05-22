<template>
   <tabbar>
     <tabbar-item @on-item-click="jumpClick(vo)" v-for="(vo,index) in list" :key="index" :selected="vo.path === activePath">
        <img slot="icon" :src="vo.path === activePath ? `${vo.icon}_cli.png` : `${vo.icon}.png`">
        <span slot="label">{{vo.name}}</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
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
   ]
 }
 },
 created(){},
 mounted(){
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
