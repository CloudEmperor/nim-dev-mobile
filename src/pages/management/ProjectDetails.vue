<template>
    <div class="container-content ProjectDetails">
         <!-- <div class="ProjectDetails-header">
            <div class="ProjectDetails-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                <h3>发起审批</h3>
                <img src="/webdemo/h5/res/images/goback.png" alt="">
            </div>
        </div> -->
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
        <div class="head-tab_right" slot="right" @click="Nodedetails(resultObj.title)">
                ●●●
            </div>
        </x-header>
        <div >
            <div style="margin-top: 5rem;">
            <p class="ProjectDetails-p">企业信息</p>
            <group  class="ProjectDetails-groud" label-width="5.5em"  >
                <x-input title="企业名称：" v-model="resultObj.enterprise" class="label-dv" disabled ></x-input>
                <x-input title="投资来源地：" v-model="resultObj.province" class="label-dv" disabled label-width="7em"></x-input>
                <x-input title="企业联系人职务："  v-model="resultObj.contactPost" class="label-dv" disabled label-width="9em"></x-input>
                <x-input title="联系电话："  v-model="resultObj.contactTelephone" class="label-dv" disabled ></x-input>
                <x-textarea title="企业介绍：" placeholder="" :show-counter="false" :rows="3" v-model="resultObj.companyProfile"  readonly="readonly"  ></x-textarea>
            </group>
            </div>
            <div style="margin-top: 2rem;">
                <p class="ProjectDetails-p">项目信息</p>
                <group  class="ProjectDetails-groud" label-width="5.5em"  >
                    <x-input title="项目名称：" v-model="resultObj.title" class="label-dv" disabled ></x-input>
                    <x-input title="首谈日期：" v-model="resultObj.firstTalkDate" class="label-dv" disabled ></x-input>
                    <x-input title="项目类型：" v-model="resultObj.type" class="label-dv" disabled ></x-input>
                    <x-input title="项目进度：" v-model="resultObj.rateOfProgress" class="label-dv" disabled ></x-input>
                    <x-input title="项目产业：" v-model="resultObj.industryName" class="label-dv" disabled ></x-input>
                    <x-input title="项目行业：" v-model="resultObj.tradeName" class="label-dv" disabled ></x-input>
                    <x-input title="跟踪人："  v-model="resultObj.projectTracker" class="label-dv" disabled  v-if="resultObj.projectTracker !== null "></x-input>
                    <x-input title="引进人："  v-model="resultObj.importingPeople" class="label-dv" disabled v-else></x-input>
                    <x-input title="拟用地面积："  v-model="resultObj.plannedArea" class="label-dv" disabled label-width="7em"></x-input>
                    <x-input title="拟安排选址："  v-model="resultObj.quasiSiteSelection" class="label-dv" disabled v-if="resultObj.quasiSiteSelection !== null " label-width="7em"></x-input>
                    <x-input title="你推荐园区："  v-model="resultObj.proposedPark" class="label-dv" disabled label-width="7em" v-else></x-input>
                    <x-input title="投资规模："  v-model="resultObj.investmentScale" class="label-dv" disabled ></x-input>
                </group>
            </div>
            <div style="margin-top: 2rem;" >
                <p class="ProjectDetails-p">项目简介</p>
                <group  class="ProjectDetails-groud" label-width="6.5em"  >
                    <x-textarea :height="120" placeholder="" :show-counter="false"  readonly="readonly"  :rows="3" v-model="resultObj.introduction"></x-textarea>
                </group>
            </div>
            <div style="margin-top: 2rem;" >
                <p class="ProjectDetails-p">存在问题</p>
                <group  class="ProjectDetails-groud" label-width="6.5em"  >
                    <x-textarea :height="120" placeholder="" :show-counter="false"  readonly="readonly"  :rows="3" v-model="resultObj.difficultiesExist"></x-textarea>
                </group>
            </div>
            <div style="margin-top: 2rem;" >
                <p class="ProjectDetails-p">备注</p>
                <group  class="ProjectDetails-groud" label-width="6.5em"  >
                    <x-textarea :height="100" placeholder=""  readonly="readonly"  :show-counter="false" :rows="3" v-model="resultObj.remarksInformation"></x-textarea>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
import {  XTextarea, XInput, PopupPicker, Datetime} from 'vux'
import cookie from '@/utils/cookie'
export default {
    components: {
        XInput,
        PopupPicker,
        Datetime,
    },
    data(){
        return{
            value1: '张三',
            lists:[
                {
                    code:'0',
                    value1:'张三'
                }
            ],
            time1: '2017-06-01',
            value5: ['张飞'],
            list: [['张飞', 'B', 'C']],
            sessionName:'项目详情',
            value:'fdsds',
            showindex:true,
            falge:false,
            textarea:'',
            resultObj:{}
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        addinput(){
            let obj ={
                code:'',
                value1:''
            }
            this.lists.push(obj)
        },
        delinput(){
            console.log(this.lists.length,'this.lists.length')
            if(this.lists.length == 1){
                this.$vux.toast.text('至少保留一个', 'bottom')
            }else{
                this.lists.splice(0,1)
            }
        },
        onsubmit(){
            console.log('提交')
        },
        Nodedetails(title){
            cookie.setCookie('categoryId', this.resultObj.id)
            cookie.setCookie('resultObjtitle', title)
            
            if(this.$route.query.from) {
              this.$router.push({path: "/Nodedetails", query: {from: 'flexible'}})
            } else {
              this.$router.push({path: "/Nodedetails",})
            }
        },
        showindexs(){
            if(this.$route.query.index ==1 || this.$route.query.index == 2){
                this.showindex = false
                this.falge = true
            }else{
                this.showindex = true
            }
        },
        //项目详情   /api/category/detail
        alldata(){
            let keywordes = {
                categoryId:cookie.readCookie('itemid')
            }
            console.log(keywordes,'keywordes')
            this.$post('/api/category/detail',keywordes).then(res=>{
                if(res.result  == 0){
                    if(res.data.type == 1){
                        res.data.type = '租办公室'
                    } else if(res.data.type == 2){
                        res.data.type = '买办公室'
                    } else if(res.data.type == 3){
                        res.data.type = '租厂房'
                    } else if(res.data.type == 4){
                        res.data.type = '买厂房'
                    } else if(res.data.type == 5){
                        res.data.type = '购地'
                    }
                    if(res.data.rateOfProgress == 1){
                        res.data.rateOfProgress = '新增在谈项目'
                    } else if(res.data.rateOfProgress == 2){
                        res.data.rateOfProgress = '在谈项目'
                    } else if(res.data.rateOfProgress == 3){
                        res.data.rateOfProgress = '在建项目'
                    } else if(res.data.rateOfProgress == 4){
                        res.data.rateOfProgress = '竣工项目'
                    } else if(res.data.rateOfProgress == 5){
                        res.data.rateOfProgress = '停止谈判项目'
                    }
                    this.resultObj = res.data
                    console.log(this.resultObj,'this.resultObj')
                }
            })
        }

    },
    mounted(){
        this.showindexs()
        this.alldata()
    }
}
</script>
<style lang="less" >
.ProjectDetails{
    background-color: rgb(244, 245, 247);
        height: 100%;
    .ProjectDetails-header{
        padding-top: 50px;
        background-color: #fff;
    }
    .ProjectDetails-groud{
        
        padding: 0 12px;
        border-radius: 8px;
        position: relative;
        .vux-no-group-title{
            border-radius: 8px;
            // padding: 0 12px;
            background-color: #fff;
        }
        .vux-no-group-title:before{
            border-top:  0;
        }
        .weui-cell_access{
            padding: 1.3rem 1rem;
        }
        .vux-x-input {
            padding: 1.3rem 1rem;
        }
        .weui-input {
            font-weight: 700;
        } 
        .vux-cell-value {
            font-weight: 700;
            color: #000;
        }
        .vux-cell-value{
            font-weight: 700;
            color: #000;
        }
    }
    .ProjectDetails-span{
        // padding: 0 1rem;
        span:nth-child(1){
            float: left;
            font-weight: 700;
            color: #000;
            font-size: 1.28rem;
        }
        span:nth-child(2){
            float: right;
            color: #4380f3;
            img{
                width: 22%;
                float: left;
                
            }
        }
        .posa-img{
            width: 3.6%;
            position: absolute;
            right: 1.1rem;
            top: 1.5rem;
        }
        .ProjectDetails-input{
            padding: 0 12px;
            border-radius: 8px;
        }
    }
    .ProjectDetails-p{
        padding: 0 12px;
        padding-bottom: 6px;
        font-size: 1.28rem;
        font-weight: 700;
            color: #000;
    }
    .ProjectDetails-go{
        position: relative;
        padding: 0 1rem;
        img:nth-child(1){
            float: left;
        }
        img:nth-child(3){
            position: absolute;
            right: 0;
            top: 0;
        }
        h3{
            font-size: 1.35rem;
            font-weight: 700;
        }
    }
}
    
</style>
