<template>
    <div class="container-content Initiateapproval">
         <!-- <div class="Initiateapproval-header">
            <div class="Initiateapproval-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                <h3>发起审批</h3>
                <img src="/webdemo/h5/res/images/goback.png" alt="">
            </div>
        </div> -->
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            <div class="head-tab_right" slot="right" @click="onsubmit" >
                <img src="/webdemo/h5/res/images/icon_fb.png"/>
            </div>
        </x-header>
        <div style="margin-top: 5rem;">
            <p class="Initiateapproval-p">基本信息</p>
            <group  class="Initiateapproval-groud" label-width="5.5em"  >
                <!-- 已审批 -->
                <x-input title="申请人：" v-model="applyApprovalIdobj.applicant" class="label-dv" disabled></x-input>

                
                <!-- 已审批 -->
                <x-input title="时间日期：" v-model="applyApprovalIdobj.addTime" class="label-dv" disabled ></x-input>

                
                <!-- 已审批 -->
                <x-input title="关联项目："  v-model="applyApprovalIdobj.categoryName" class="label-dv" disabled ></x-input>
            </group>
        </div>
        <div style="margin-top: 2rem;">
            <p class="Initiateapproval-p">申请信息</p>
            <group  class="Initiateapproval-groud" label-width="5.5em"  >
                
                <!-- 已审批 -->
                <x-input title="申请标题："  v-model="applyApprovalIdobj.title" class="label-dv" disabled ></x-input>
              
                <!-- 已审批 -->
                <x-textarea title="申请内容：" placeholder="请填写详细信息" :show-counter="false" :rows="3" v-model="applyApprovalIdobj.detailedDesc"  readonly="readonly" v-show="falge"></x-textarea>

            </group>
        </div>
        <div style="margin-top: 2rem;  position: relative;" class="Initiateapproval-span">
            <div style="overflow: hidden;margin-bottom: 0.5rem;padding: 0 12px;">
                <span>申请选项</span>
            </div>
            <!-- <group  class="Initiateapproval-groud" label-width="5.5em" v-for="(item, index) in lists" :key="index"  >
                <x-input title="选项标题" v-model="value1" class="label-dv"  :show-clear="false">
                </x-input>
            </group> -->
            <group title="不支持多选" label-width="5.5em" class="Initiateapproval-groud" >
                <radio :options="lists" @on-change="change" ></radio>
            </group>
             
        </div>
        <div style="margin-top: 2rem;" >
            <p class="Initiateapproval-p">批示内容</p>
            <group  class="Initiateapproval-groud" label-width="6.5em"  >
                 <x-textarea :height="120" placeholder="请填写批示内容" :show-counter="false" :rows="3" v-model="textarea"></x-textarea>
            </group>
           
        </div>
    </div>
</template>
<script>
import {  XTextarea, XInput, PopupPicker, Datetime,Radio, Group} from 'vux'
export default {
    components: {
        XInput,
        PopupPicker,
        Datetime,
        Radio, 
        Group
    },
    data(){
        return{
            value1: '张三',
            lists:[],
            time1: '2017-06-01',
            value5: ['张飞'],
            list: [['张飞', 'B', 'C']],
            sessionName:'审批',
            value:'fdsds',
            showindex:true,
            falge:false,
            textarea:'',
             applyApprovalIdobj:{},
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
         change (value, label) {
            this.options = this.lists.indexOf(value)
        },
        delinput(){
            if(this.lists.length == 1){
                this.$vux.toast.text('至少保留一个', 'bottom')
            }else{
                this.lists.splice(0,1)
            }
        },
        onsubmit(){
            if(String(this.options) == 'undefined'){
                this.$vux.toast.text('请选择选项卡', 'bottom')
                return 
            }
            if(!this.textarea){
                this.$vux.toast.text('请输入批示内容', 'bottom')
                return 
            }
            let parameter = {
                approvalId:this.applyApprovalIdobj.id,
                approvalReply:this.textarea,
                approvalOptions: String(this.options)
            }
            this.$post('/api/approve/addApproval',parameter).then(res=>{
                if(res.result ==0){
                    this.$vux.toast.text(res.message, 'bottom')
                    this.$router.go(-1)
                }
            })
        },
        showindexs(){
            if(this.$route.query.index ==1 || this.$route.query.index == 2){
                this.showindex = false
                this.falge = true
            }else{
                this.showindex = true
            }
        },
        //   获取审批详情    /api/approve/getApproval
        getApproval(){
            let applyApprovalId ={
                applyApprovalId:this.$route.query.item.id
            }
            this.$post('/api/approve/getApproval',applyApprovalId).then(res=>{
                this.applyApprovalIdobj = res
                // this.lists = res.options.split("`");
                let listarr = {
                    title:'',
                    id:''
                }
                this.lists= res.options.split("`")
            })
        },

    },
    mounted(){
        this.showindexs()
        this.getApproval()
    }
}
</script>
<style lang="less" >
.Initiateapproval{
    background-color: rgb(244, 245, 247);
        height: 100%;
    .Initiateapproval-header{
        padding-top: 50px;
        background-color: #fff;
    }
    .Initiateapproval-groud{
        
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
    .Initiateapproval-span{
        // padding: 0 1rem;
        span:nth-child(1){
            float: left;
            font-weight: 700;
            color: #000;
            font-size: 1.28rem;
        }
        span:nth-child(2){
            // float: right;
            // color: #4380f3;
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
        .Initiateapproval-input{
            padding: 0 12px;
            border-radius: 8px;
        }
    }
    .weui-cells_radio{
        background-color: #fff;
    }
    .Initiateapproval-p{
        padding: 0 12px;
        padding-bottom: 6px;
        font-size: 1.28rem;
        font-weight: 700;
            color: #000;
    }
    .Initiateapproval-go{
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
