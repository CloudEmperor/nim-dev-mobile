<template>
 <div class="m-main main-gap">
   <Calendar @change="changeL" @add="addSchedule"/>
 </div>
</template>

<script>
import Calendar from './components/Calendar'
export default {
 name: 'Schedule',
 components: {Calendar},
 data() {
 return {

 }
 },
 created(){},
 mounted(){},
 methods:{
   changeL(str, m, d){
     console.log('str', str)
     //console.log('m', m)
     //console.log('d', d)
   },
   addSchedule(){
      console.log('新增日程')
   }
 }
}
</script>

<style lang='less' scoped>
</style>
