<template>
 <div class="m-main main-gap">
   <Calendar @change="changeL" @add="addSchedule"/>
   <div class="sc-body">
       <p v-if="list.length ===0" class="def">没有待办事项</p>
       <ul v-else>
         <li v-for="(vo, index) in list" :key="index">
            <p class="title">{{vo.title}}</p>
            <p>开始时间：{{vo.start}}</p>
            <p>提醒间隔：{{vo.reminderTime}}分钟</p>
            <p>{{vo.scheduleDesc}}</p>
         </li> 
       </ul>
   </div>
 </div>
</template>

<script>
import Calendar from './components/Calendar'
import scheduleApi from '@/api'
export default {
 name: 'Schedule',
 components: {Calendar},
 data() {
 return {
   list:[]
 }
 },
 created(){},
 mounted(){},
 methods:{
   changeL(str, m, d){
     this.initData(str)
   },
   initData(time){
      const url = scheduleApi.scheduleListInfo
      const postData={
          start:time
      }
      this.$post(url, postData).then(res =>{
          if (res.result ===0){
                this.list=res.data || []  
          }else{
              this.$vux.toast.text(res.message, 'bottom')
          }
      })
   },
   addSchedule(){
      this.$router.push({
        path:'/addSchedule'
      })
   }
 }
}
</script>

<style lang='less' scoped>
.sc-body{
  display:flex;
  flex-direction:column;
  padding:0 1.4rem 2rem 1.4rem;
  .def{
    line-height:8rem;
    text-align:center;
    color:#717171;
  }
  ul{
     display:flex;
    flex-direction:column;
    width:100%;
    li{
       min-height:6rem;
       border-radius:0.4rem;
       background:#fff;
       box-shadow: #e8e8e8 0px 0px 6px;
       padding:1rem;
       margin-top:2rem;
       display:flex;
       flex-direction:column;
       p{
         color:#717171;
         line-height: 2.5rem;
       }
       .title{
         color:#333;
       }
    }
  }
}
</style>
