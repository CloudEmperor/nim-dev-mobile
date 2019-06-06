<template>
 <div class="container-content">
     <x-header class="head-tab" :left-options="{backText: ''}">
         {{sessionName}}
        <div class="head-tab_right" slot="right">
            <img @click="clickMore" src="/webdemo/h5/res/images/icon_fb.png"/>
        </div>
     </x-header>
     <div class="add-schedule">
         <p class="add-schedule_title">基本信息</p>
         <div class="add-schedule_body">
             <group label-width="4.5em" label-margin-right="2em" label-align="right">
                 <x-input title="事项名称:" v-model="form.title" :max="15" placeholder="请输入"></x-input>
                 <datetime title="开始日期:" v-model="form.start" format="YYYY-MM-DD HH:mm" value-text-align="left" placeholder="请选择"></datetime>
                 <datetime title="结束日期:" v-model="form.end" format="YYYY-MM-DD HH:mm" value-text-align="left" placeholder="请选择"></datetime>
                 <popup-picker title="提醒间隔:" popup-title="请选择提醒的间隔时间" :data="list" v-model="reminderTime" value-text-align="left" placeholder="请选择"></popup-picker>
             </group>
         </div>
         <p class="add-schedule_title">事项备注</p>
         <div class="add-schedule_body">
             <x-textarea v-model="form.scheduleDesc" :max="800" :show-counter="false" :height="180" :rows="8" :cols="30"></x-textarea>
         </div>
     </div>
 </div>
</template>

<script>
import { Datetime, PopupPicker } from 'vux'
import scheduleApi from '@/api'
export default {
 name: 'AddSchedule',
 components: {Datetime, PopupPicker },
 data() {
 return {
   sessionName:'添加待办事项',
   list:[['5分钟', '15分钟', '30分钟', '1小时', '3小时', '6小时', '1天']],
   listcopy:['5分钟', '15分钟', '30分钟', '1小时', '3小时', '6小时', '1天'],
   listcopyTr:['5', '15', '30', '1', '3', '6', '1'],
   reminderTime:[],
   form:{
       title:'',
       start:'',
       end:'',
       reminderTime:'',
       scheduleDesc:''
   }
  
 }
 },
 created(){},
 mounted(){},
 methods:{
    clickMore(){
        if(!this.form.title){
            this.$vux.toast.text('请填写事项名称', 'bottom')
            return 
        }
        if(!this.form.start){
            this.$vux.toast.text('请选择开始时间', 'bottom')
            return 
        }
        if(!this.form.end){
            this.$vux.toast.text('请选择结束时间', 'bottom')
            return 
        }
        if(this.reminderTime.length === 0){
            this.$vux.toast.text('请选择提醒间隔时间', 'bottom')
            return 
        }
        if(!this.form.scheduleDesc){
            this.$vux.toast.text('请填写事项备注', 'bottom')
            return 
        }
        const reminderTimeStr=this.reminderTime.join(',')
        this.listcopy.forEach((item, index) =>{
             if(item === reminderTimeStr){
                   this.form.reminderTime=this.listcopyTr[index]
             }
        })
        this.scheduleAdd()
    },
    scheduleAdd(){
        const url = scheduleApi.scheduleAdd
        this.$post(url, this.form).then(res =>{
            if (res.result ===0){
                this.$vux.toast.text('提醒设置成功', 'bottom')
                setTimeout(()=>{
                    window.history.go(-1)
                },200)               
            }else{
                this.$vux.toast.text(res.message, 'bottom')
            }
        })
    }
 }
}
</script>

<style lang='less'>
.add-schedule{
    position: absolute;
    display: block;
    box-sizing: border-box;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 3.6rem 1.4rem 2rem 1.4rem;
    .add-schedule_title{
        height:4rem;
        line-height:4rem;
        font-size: 1.3rem;
        color: #000;
        font-weight: 600;
        margin-top:2rem;
    }
    .add-schedule_body{
       width:100%;
       min-height:16.4rem;
       border-radius:0.8rem;
       background:#fff;
       box-shadow: #e8e8e8 0px 0px 6px;
        .weui-input, .vux-cell-value, .weui-textarea{
           color:#000;
       }
       .weui-cell{
           padding: 1.3rem 0.7rem !important;
       }
        .weui-cells:after{
            border:0;
        }
       
    }
}

</style>
