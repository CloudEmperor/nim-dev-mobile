<template>
    <div class="pending container-content">
        <div class="pending-header">
            <!-- <div class="pending-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                 <h3>审批管理</h3>
            </div> -->
            <x-header class="head-tab" :left-options="{backText: ''}">
                    {{sessionName}}
            </x-header>
            <tab :line-width="2" custom-bar-width="60px" bar-active-color="#3366FF" >
                <tab-item selected @on-item-click="onItemClick">审批通知</tab-item>
                <tab-item @on-item-click="onItemClick">待办提醒</tab-item>
            </tab>
        </div>
        <div class="pending-ul" v-if="index==0 ">
            <ul>
                <li v-for="(item, index) in approveLists" :key="index"  @click="change(index,item)">
                    <div class="pending-left">
                        <img src="/webdemo/h5/res/images/icon_qbaohs@2x.png" alt="" style="width: 70%;">
                    </div>
                    <div class="pending-right" >
                        <span>{{item.applicant}}提交审批</span>
                        <span>审批标题：{{item.title}}</span>
                        <span>提交时间：{{item.addTime}}</span>
                    </div>
                </li>
                <div v-show="loading"  style="height: 200px;text-align: center;padding-top: 100px;">暂无数据</div>
            </ul>
        </div>
        <div class="pending-ul" v-if="index==1 ">
            <ul >
                <li v-for="(item, index) in remindLists" :key="index" @click="pendingli(item)">
                    <div class="pending-left">
                        <img src="/webdemo/h5/res/images/icon_dbtxa@2x.png" alt="" style="width: 70%;">
                    </div>
                    <div class="pending-right">
                        <span>您有一个待办事项</span>
                        <span>事项标题：{{item.title}}</span>
                        <span>开始时间：{{item.start}}</span>
                        <span>结束时间：{{item.end}}</span>
                        <div class="pending-posa">
                            <span v-if="item.messageState == 0 ? true: false" style="background-color:red;"></span>
                        </div>
                    </div>
                </li>
                <div v-show="loading1"  style="height: 200px;text-align: center;padding-top: 100px;">{{tip}}</div>
            </ul>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
    components: {
        Tab,
        TabItem
    },
    data(){
        return{
            index:0,
            sessionName:'消息通知',
            approveLists:[],
            remindLists:[],
            tip: '',
            loading: false,
            loading1: false,
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        change(index,item){
             this.$router.push({ path: "/Initiatepending",query: {index: index,item:item}})
        },
        onItemClick (index) {
            console.log(index,'index')
            this.index = index
            this.approveList(index)
        },
        //  审批通知   /api/approve/approveList
        approveList(index){
            let type= {
                type:this.index + 4
            }
            this.$post('/api/approve/approveList',type).then(res=>{
                 if(type.type == 4){
                    this.approveLists = res.approveList
                    if ( this.approveLists.length == 0) {
                        this.$nextTick(()=>{
                             this.loading = true
                            // this.tip = '--暂无数据--'
                        })
                    } 
                }
            })
        },
        //   代办提醒/api/schedule/remindList
        remindList(){
            this.$post('/api/schedule/remindList').then(res=>{
                this.remindLists = res.remindList
                if(this.remindLists.length == 0) {
                    this.loading1 = true
                    this.tip = '--暂无数据--'
                } else {
                    this.loading1 = false
                    this.tip = '正在加载'
                }
            })
        },
        pendingli(item){
            let key = {
                id:item.id
            }
            this.$post('/api/schedule/markedAsRead',key).then(res=>{
                if(res.result == 0){
                     this.remindList()
                }
            })
        }
    },
    mounted(){
         this.approveList()
        this.remindList()
    },
    created(){
       
    }
}
</script>
<style lang="less" scoped>
    .pending{
        background-color: rgb(244, 245, 247);
        height: 100%;
        .pending-header{
            padding-top: 50px;
            background-color: #fff;
         }
         .pending-go{
             padding: 0 1rem;
            img{
                 float: left;
            }
            h3{
                font-size: 1.35rem;
                font-weight: 700;
            }
         }
        .pending-ul{
             
            ul{
                overflow: hidden;
                padding: 0 12px;
                 li{
                    list-style: none;
                    background-color: #fff;
                    margin-top: 1rem;
                    padding: 1rem 1rem;
                    overflow: hidden;
                    border-radius: 8px;
                    margin-bottom: 2px;
                    box-shadow: #e8e8e8 0px 0px 6px;
                        .pending-left{
                            float: left;
                        }
                        .pending-right{
                            // padding-left: 1rem;
                            float: left;
                            width: 90%;
                            position: relative;
                            span{
                                display: block;
                                word-wrap:break-word
                            }
                            span:nth-child(1){
                                font-weight: 700;
                                font-size: 1.3rem;
                                margin-bottom: 0.5rem;
                            }
                            span:nth-child(2){
                                margin-bottom: 0.5rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 25rem;
                            }
                            span:nth-child(3){
                                margin-bottom: 0.5rem;
                            }
                            .pending-posa{
                                position: absolute;
                                right: 0;
                                top: 0;
                                span{
                                    color: #4380f3;
                                    width: 0.6rem;
                                    height: 0.6rem;
                                    border-radius: 50%;
                                    display: inline-block;
                                }
                            }
                        }
                 }
             }
         }
    }
   
</style>
