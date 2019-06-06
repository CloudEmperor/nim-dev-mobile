<template>
    <div class="Approval container-content">
        <div class="Approval-header">
            <!-- <div class="Approval-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                 <h3>审批管理</h3>
            </div> -->
            <x-header class="head-tab" :left-options="{backText: ''}">
                    {{sessionName}}
            </x-header>
            <tab :line-width="2" custom-bar-width="60px" bar-active-color="#3366FF" >
                <tab-item selected @on-item-click="onItemClick">待审批</tab-item>
                <tab-item @on-item-click="onItemClick">已审批</tab-item>
                <tab-item @on-item-click="onItemClick">我发起的</tab-item>
            </tab>
        </div>
        <div class="Approval-ul" v-if="index==0 ">
            <ul>
                <li v-for="(item, indexs) in approveLists" :key="indexs"  @click="change(index,item)" ref="approveList">
                    <div class="Approval-left">
                        <img src="/webdemo/h5/res/images/icon_qbaohs@2x.png" alt="" style="width: 70%;">
                    </div>
                    <div class="Approval-right" >
                        <span>{{item.applicant}}提交审批</span>
                        <span>审批标题：{{item.title}}</span>
                        <span>提交时间：{{item.addTime}}</span>
                    </div>
                    
                </li>
                <div v-show="loading"  style="height: 200px;text-align: center;padding-top: 100px;">{{tip}}</div>
            </ul>
        </div>
        <div class="Approval-ul" v-if="index==1 ">
            <ul >
                <li v-for="(item, indexs) in approveLists1" :key="indexs" @click="change(index,item)">
                    <div class="Approval-left">
                        <img src="/webdemo/h5/res/images/icon_qbaohs@2x.png" alt="" style="width: 70%;">
                    </div>
                    <div class="Approval-right">
                        <span>{{item.applicant}}提交审批</span>
                        <span>审批标题：{{item.title}}</span>
                        <span>提交时间：{{item.addTime}}</span>
                        <div class="Approval-posa">
                            <span>审批完成</span>
                        </div>
                    </div>
                </li>
                <div v-show="loading"  style="height: 200px;text-align: center;padding-top: 100px;">{{tip}}</div>
            </ul>
        </div>
        <div class="Approval-ul" v-if="index==2 ">
            <ul >
                <li v-for="(item, indexs) in approveLists2" :key="indexs" @click="change(index,item)">
                    <div class="Approval-left">
                        <img src="/webdemo/h5/res/images/icon_qbaohs@2x.png" alt="" style="width: 70%;">
                    </div>
                    <div class="Approval-right">
                        <span>{{item.applicant}}提交审批</span>
                        <span>审批标题：{{item.title}}</span>
                        <span>提交时间：{{item.addTime}}</span>
                        <div class="Approval-posas">
                            <span v-if="item.approvalReply==null" style="background-color: red;"></span>
                            <span v-if="item.approvalReply !==null" style="background-color: #4380f3;"></span>
                        </div>
                    </div>
                </li>
                <div v-show="loading"  style="height: 200px;text-align: center;padding-top: 100px;">{{tip}}</div>
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
            sessionName:'审批管理',
            approveLists:[],
            approveLists1:[],
            approveLists2:[],
            tip: '正在加载',
            loading: false,
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        change(index,item){
             this.$router.push({ path: "/Initiateapproval",query: {index: index,item: item}})
        },
        onItemClick (index) {
            this.index = index
            this.approveList(index)
        },
        // 审批列表   /api/approve/approveList
        approveList(index){
            let type = {
                type:this.index + 1
            }
            this.$post('/api/approve/approveList',type).then(res=>{
                if(type.type == 1){
                    this.approveLists = res.approveList
                    if(this.approveLists.length == 0) {
                        this.loading = true
                        this.tip = '--暂无数据--'
                        } else {
                        this.loading = false
                        this.tip = '正在加载'
                    }
                }else if(type.type == 2){
                    this.approveLists1 = res.approveList
                    if(this.approveLists1.length == 0) {
                        this.loading = true
                        this.tip = '暂无数据'
                        } else {
                        this.loading = false
                        this.tip = '正在加载'
                    }
                }else if(type.type == 3){
                    this.approveLists2 = res.approveList
                    if(this.approveLists2.length == 0) {
                        this.loading = true
                        this.tip = '暂无数据'
                        } else {
                        this.loading = false
                        this.tip = '正在加载'
                    }
                }
            })
        },
    },
    mounted() {
        this.approveList()
    },
}
</script>
<style lang="less" scoped>
    .Approval{
        background-color: rgb(244, 245, 247);
        height: 100%;
        .Approval-header{
            padding-top: 50px;
            background-color: #fff;
         }
         .Approval-go{
             padding: 0 1rem;
            img{
                 float: left;
            }
            h3{
                font-size: 1.35rem;
                font-weight: 700;
            }
         }
         .Approval-ul{
             
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
                        .Approval-left{
                            float: left;
                        }
                        .Approval-right{
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
                            .Approval-posa{
                                position: absolute;
                                right: 0;
                                top: 0;
                                span{
                                    color: #4380f3;
                                }
                            }
                            .Approval-posas{
                                position: absolute;
                                right: 0;
                                top: 0;
                                span{
                                    color: #4380f3;
                                    font-size: 1rem;
                                    font-weight: 400;
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
