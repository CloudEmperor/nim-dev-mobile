<template>
    <div class="container-content Review">
         <!-- <div class="Review-header">
            <div class="Review-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                <h3>发起审批</h3>
                <img src="/webdemo/h5/res/images/goback.png" alt="">
            </div>
        </div> -->
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            <div class="head-tab_right" slot="right" @click="onsubmit" v-show="showindex">
                <img src="/webdemo/h5/res/images/icon_fb.png"/>
            </div>
        </x-header>
        <div style="margin-top: 5rem;">
            <p class="Review-p">基本信息</p>
            <group  class="Review-groud" label-width="5.5em"  >
              
                <!-- 已审批 -->
                <x-input title="申请人：" v-model="applicant" class="label-dv" disabled ></x-input>

                
                <!-- 已审批 -->
                <!-- <x-input title="时间日期：" v-model="applyApprovalIdobj.addTime" class="label-dv"  ></x-input> -->
                 <!-- <datetime title="时间日期：" v-model="time1" value-text-align="left" class="label-dv"></datetime> -->

                <!-- 已审批 -->
                <!-- <x-input title="关联项目："  v-model="applyApprovalIdobj.categoryName" class="label-dv"  ></x-input> -->
                <popup-picker title="关联项目：" :data="arrays" v-model="categoryListval" value-text-align="left" @on-change="changval1(categoryListval)"></popup-picker>
            </group>
        </div>
        <div style="margin-top: 2rem;">
            <p class="Review-p">申请信息</p>
            <group  class="Review-groud" label-width="5.5em"  >
                
                <!-- 已审批 -->
                <x-input title="申请标题："  v-model="titleval" class="label-dv"  ></x-input>
                
                <!-- 已审批 -->
                <x-textarea title="申请内容：" placeholder="请填写详细信息" :show-counter="false" :rows="3" v-model="textarea"   ></x-textarea>

            </group>
        </div>
        <div style="margin-top: 2rem;  position: relative;" class="Review-span">
            <div style="overflow: hidden;margin-bottom: 0.5rem;padding: 0 12px;">
                <span>申请选项</span>
                <span  @click="addinput"><img src="/webdemo/h5/res/images/icon_tjxuanx@2x.png" alt="">添加选项</span>
            </div>
            <group  class="Review-groud" label-width="5.5em" v-for="(item, index) in lists" :key="index"  >
                <x-input title="选项" v-model="item.title" class="label-dv"  :show-clear="false" >
                </x-input>
                <img src="/webdemo/h5/res/images/icon_scxx@2x.png" alt="" class="posa-img" @click="delinput(index)">
            </group>
        </div>
        <div style="margin-top: 2rem;" >
            <p class="Review-p">审批人</p>
            <group  class="Review-groud" label-width="7em"  >
                <popup-picker title="选择审批人：" :data="array" v-model="value5" value-text-align="left" @on-change="changval(value5)"></popup-picker>
            </group>
        </div>
    </div>
</template>
<script>
import {  XTextarea, XInput, PopupPicker, Datetime,Radio, Group} from 'vux'
import cookie from '@/utils/cookie'
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
            value1: '',
            lists:[
                {
                    id:'',
                    title:''
                }
            ],
            titleval:'',
            time1: '',
            value5: [''],
            list: [['张飞', 'B', 'C']],
            sessionName:'提交审批',
            value:'fdsds',
            showindex:true,
            falge:false,
            textarea:'',
            getApprovers:[],
            arr:[],
            array:[],
            arrays:[],
            categoryLists:[],
            categoryListval:[''],
            id:'',
            applyApprovalIdobj:{},
            options:'',
            // textarea:'',
            userList:[],
            nameid:'',
            arrlistcate:[],
            categoryId:'',
            optionss:[],
            arroptions:'',
            approver:[],
            openapprover:'',
            applicant:cookie.readCookie('userName'),
            stringcate:''
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        change (value, label) {
            this.options = this.lists.indexOf(value)
        },
        addinput(){
            let obj = {
                    id:'',
                    title:''
                }
            this.lists.push(obj)
        },
        delinput(index){
            if(this.lists.length == 1){
                this.$vux.toast.text('至少保留一个', 'bottom')
            }else{
                this.lists.splice(index,1)
            }
        },
        changval(value5){
            this.approver = value5
            this.userList.forEach(item=>{
                value5.forEach(items=>{
                    if(items == item.user_name){
                        this.nameid = item.id
                    }
                })
            })
        },
        changval1(title){
            this.arrlistcate.forEach(item=>{
                title.forEach(items=>{
                    if(items == item.title){
                        this.categoryId = item.id
                    }
                })
            })
        },
        //提交审批   /api/approve/addApplyApproval
        onsubmit(){
            this.categoryListval.forEach(item=>{
                this.stringcate = item
            })
            if(this.stringcate == ''){
                this.$vux.toast.text('请选择相关项目', 'bottom')
                return 
            }
            if(!this.titleval){
                this.$vux.toast.text('请输入标题', 'bottom')
                return 
            }
            if(!this.textarea){
                this.$vux.toast.text('请输入申请内容', 'bottom')
                return 
            }
            this.lists.forEach(item=>{
                this.optionss.push(item.title) 
            })
            this.arroptions = this.optionss.join('`')
            if(this.arroptions == ''){
                this.$vux.toast.text('请添加选项', 'bottom')
                return 
            }
            this.approver.forEach(items=>{
                this.openapprover = items
            })
            if(this.openapprover == ''){
                this.$vux.toast.text('请选择审批人', 'bottom')
                return 
            }
            let parameter = {
                applicantId:cookie.readCookie('userId'),
                applicant:cookie.readCookie('userName'),
                categoryId:String(this.categoryId),
                title:this.titleval,
                options:this.arroptions,
                detailedDesc:this.textarea,
                approverId:String(this.nameid),
                approver:this.openapprover,
            }
            this.$post('/api/approve/addApplyApproval',parameter).then(res=>{
                console.log(res,' tijiao')
                if(res.result ==0){
                    this.$vux.toast.text(res.message, 'bottom')
                    this.$router.go(-1)
                }
            })
        },
        showindexs(){
            if(this.$route.query.index ==1  ){
                this.showindex = false
                this.falge = true
                this.sessionName = '已审批'
            }else if(this.$route.query.index == 2){
                this.showindex = false
                this.falge = true
                this.sessionName = '我发起的'
            }
        },
        //   获取 审批人  /api/approve/getApprover
        getApprover(){
            this.$post('/api/approve/getApprover').then(res=>{
                this.userList =  res.userList
                this.getApprovers = res.userList
                let arr = []
                this.getApprovers.forEach(element => {
                    arr.push(element.user_name,)
                });
                this.array.push(arr)
            })
        },
        //  关联项目 /api/approve/categoryList
        categoryList(){
            this.$post('/api/approve/categoryList').then(res=>{
                this.arrlistcate =  res.categoryList
                this.categoryLists = res.categoryList
                let arr = []
                this.categoryLists.forEach(element => {
                    arr.push(element.title)
                });
                this.arrays.push(arr)
            })
        },
        cahngevalue(value5){
            this.getApprovers.forEach(item=>{
                if(value5 == item.user_name){
                    this.id = item.id
                }
            })
        },
       
        
    },
    mounted(){
        this.showindexs()
        this.getApprover()
        this.categoryList()
    }
}
</script>
<style lang="less" >
.Review{
    background-color: rgb(244, 245, 247);
        height: 100%;
    .Review-header{
        padding-top: 50px;
        background-color: #fff;
    }
    .Review-groud{
        
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
    .Review-span{
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
        .Review-input{
            padding: 0 12px;
            border-radius: 8px;
        }
    }
    .weui-cells_radio{
        background-color: #fff;
    }
    .Review-p{
        padding: 0 12px;
        padding-bottom: 6px;
        font-size: 1.28rem;
        font-weight: 700;
            color: #000;
    }
    .Review-go{
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
