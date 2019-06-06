<template>
 <div class="container-content">
     <x-header class="head-tab" :left-options="{backText: ''}">
         {{sessionName}}
        <div class="head-tab_right" slot="right">
            <img @click="clickMore" src="/webdemo/h5/res/images/icon_fb.png"/>
        </div>
     </x-header>
     <div class="add-projects">
         <checklist class="add-projects_radio" :options="commonList" v-model="projectClassification" :max="1" @on-change="radioChange"></checklist>
          <p class="add-projects_title">企业信息</p>
          <div class="add-projects_body">
               <group label-width="7.5em" label-margin-right="2em" label-align="left">
                 <x-input title="企业名称:" v-model="form.enterprise" :max="50" placeholder="请输入"></x-input>
                 <x-address title="投资来源地:" v-model="addressValue" raw-value :list="addressData" @on-shadow-change="onShadowChange" hide-district value-text-align="left" label-align="justify" placeholder="请选择来源地"></x-address>
                 <x-input title="企业联系人职务:" v-model="form.contactPost" :max="50" placeholder="请输入"></x-input>
                 <x-input title="企业联系人电话:" v-model="form.contactTelephone" type="number" placeholder="请输入"></x-input>
             </group>
          </div>
          <p class="add-projects_title">项目信息</p>
          <div class="add-projects_body">
               <group label-width="5.3em" label-margin-right="2em" label-align="left">
                <x-input title="项目名称:" v-model="form.title" :max="50" placeholder="请输入"></x-input>
                <datetime title="首谈日期:" v-model="form.firstTalkDate" format="YYYY-MM-DD" value-text-align="left" placeholder="请选择"></datetime>
                <popup-picker title="项目类型:" :data="projectTypeOptions" :columns="2" v-model="projectType" @on-change="projectTypeChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                <div class="rectangle">
                    <x-input title="拟用地面积:" v-model="form.plannedArea" type="number" placeholder="请输入"></x-input>
                    <span class="tip">m²</span>
                </div>
                 <x-input v-if="this.form.projectClassification ===1" title="拟安排选址:" v-model="form.quasiSiteSelection"  placeholder="请输入"></x-input>
                 <x-input v-if="this.form.projectClassification ===2" title="拟推荐园区:" v-model="form.proposedPark"  placeholder="请输入"></x-input>
                <div  v-if="this.form.projectClassification ===1" class="rectangle">
                    <x-input title="投资规模:" v-model="form.investmentScale" type="number" placeholder="请输入"></x-input>
                    <span class="tip tip-m">万元</span>
                </div>
                 <popup-picker title="项目状态:" :data="projectStatusOptions" :columns="2" v-model="projectStatus" @on-change="projectStatusChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <popup-picker title="项目产业:" :data="industryOptions" :columns="2" v-model="industry" @on-change="industryChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <popup-picker title="项目行业:" :data="tradeOptions" :columns="2" v-model="trade" @on-change="tradeChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <popup-picker title="项目成员:" :data="userListOptions" :columns="2" v-model="projectMembers" @on-change="projectMembersChange" :display-format="displayFormat" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <div v-if="projectMembersArr.length !==0" class="person">
                    <span class="person-label">已选:</span>
                    <div>
                    <badge v-for="(vo, index) in projectMembersArr" :text="vo" :key="index" style="margin-right:10px;margin-bottom:10px;"></badge>
                    </div>
                 </div>
                 <popup-picker  v-if="this.form.projectClassification ===1"  title="项目跟踪人:" :data="userListOptions" :columns="2" v-model="projectTracker" @on-change="projectTrackerChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <popup-picker  v-if="this.form.projectClassification ===2"  title="项目引进人:" :data="userListOptions" :columns="2" v-model="importingPeople" @on-change="importingPeopleChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
                 <popup-picker title="项目进度:" :data="projectProgressOptions" :columns="2" v-model="projectProgress" @on-change="projectProgressChange" show-name value-text-align="left" placeholder="请选择"></popup-picker>
             </group>
          </div>
     </div>
 </div>
</template>

<script>
import { Checklist, XAddress, ChinaAddressData, PopupPicker, Badge} from 'vux'
import addProjectsApi from '@/api'
export default {
 name: 'AddProjects',
 components: {
    Checklist,
    XAddress,
    PopupPicker,
    Badge
 },
 data() {
 return {
    sessionName:'添加项目',
    commonList:[
        {   key:1,
            value:'招商引资项目'
        },
         {  key:2,
            value:'自营项目'
        }
    ],
    addressData: ChinaAddressData,
    projectClassification:[1],
    addressValue:['陕西省', '西安市'],
    projectTypeOptions:[
        {
        name: '租办公室',
        value: '1',
      }, {
        name: '买办公室',
        value: '2',
      },{
        name: '租厂房',
        value: '3',
      },{
        name: '买厂房',
        value: '4',
      },{
        name: '购地',
        value: '5',
      }
    ],
    projectType:[],
    projectStatusOptions:[
         {
        name: '搁置',
        value: '1',
      }, {
        name: '一般跟踪',
        value: '2',
      },{
        name: '重点跟踪',
        value: '3',
      },{
        name: '已落地',
        value: '4',
      },{
        name: '已完成',
        value: '5',
      }
    ],
    projectStatus:[],
    projectProgressOptions:[
         {
        name: '新增在谈项目（1个月内）',
        value: '1',
      }, {
        name: '在谈项目',
        value: '2',
      },{
        name: '在建项目',
        value: '3',
      },{
        name: '竣工项目',
        value: '4',
      },{
        name: '停止谈判项目',
        value: '5',
      }
    ],
    projectProgress:[],
    industryOptions:[],
    tradeOptions:[],
    userListOptions:[],
    industry:[],
    trade:[],
    projectMembers:[],
    displayFormat (value, type) {
        if (type === 'string') {
          return value
        } else {
          return value.length ?  '' : ''
        }
      },
    projectMembersArr:[],
    projectMembersIds:[],
    projectTracker:[],
    importingPeople:[],
    form:{
        //公共参数
        projectClassification:1, //项目分类 1-管委会招商项目 2-公司自营载体项目
        enterprise:'', //企业名称
        province:'', //投资来源地-省
        city:'', //投资来源地-市
        contactPost:'', //企业联系人职务
        contactTelephone:'', //联系人电话
        title:'', //项目名称
        firstTalkDate:'', //首谈日期
        type:null, // 项目类型 
        plannedArea:null,  //拟用地面积 (㎡)
        status:null,  //项目状态
        industry:null, //产业
        trade:null,  //行业
        projectMembers:'', //项目成员
        rateOfProgress:null,  //项目进度
        //管委会招商项目 1
         quasiSiteSelection:'', //拟安排选址
         investmentScale:null, //投资规模 万元
         projectTracker:'', //项目跟踪人
        //公司自营2
        proposedPark:'',//拟推荐园区
        importingPeople:''//项目引进人

    }
 }
 },
 created(){
     this.getIndustry()
     this.getUserList()
 },
 mounted(){},
 methods:{
     radioChange(){
      this.form.projectClassification=this.projectClassification[0]
     },
     onShadowChange(ids, names){
        this.form.province=names[0]
        this.form.city=names[1]
     },
     projectTypeChange(ids){
      this.form.type= + ids[0]
     },
     projectStatusChange(ids){
      this.form.status= + ids[0]
     },
     projectProgressChange(ids){
        this.form.rateOfProgress= + ids[0]
     },
     industryChange(ids){
        const id= + ids[0]
        this.form.industry= id
        this.getTrade(id)
     },
     tradeChange(ids){
        this.form.trade= + ids[0]
     },
     projectMembersChange(ids){
        const self=this
        self.userListOptions.forEach(item =>{
            if(item.value === ids[0]){
                self.projectMembersArr.push(item.name)
                self.projectMembersIds.push(item.value)
            }
        })  
         self.projectMembersArr= self.removeRepetition(self.projectMembersArr)
         self.projectMembersIds= self.removeRepetition(self.projectMembersIds)

     },
     removeRepetition(arr){ 
            var res = [];
            for(var i = 0, len = arr.length; i < len; i++) {
                var obj = arr[i];

                for(var j = 0, jlen = res.length; j < jlen; j++) {
                    if(res[j] === obj) break;
                }
                if(jlen === j) res.push(obj);
            }
            return res;
     },
     projectTrackerChange(ids){
        this.form.projectTracker= ids[0]
     },
     importingPeopleChange(ids){
        this.form.importingPeople= ids[0]
     },
     clickMore(){
         this.form.projectMembers= this.projectMembersIds.join(',')
         if(!this.form.enterprise){
             this.$vux.toast.text('请输入企业名称', 'bottom')
             return 
         }
         if(!this.form.province || !this.form.city){
             this.$vux.toast.text('请选择投资来源地', 'bottom')
             return 
         }
          if(!this.form.contactPost){
             this.$vux.toast.text('请输入企业联系人职务', 'bottom')
             return 
         }
         if(this.form.contactTelephone){
              const reg=/^1[358][0-9]{9}$/;
              if (!reg.test(this.form.contactTelephone)) {
                    this.$vux.toast.text('请输入正确的手机号', 'bottom')
                     return 
                } 
            }else{
                this.$vux.toast.text('请输入企业联系人电话', 'bottom')
                return  
            }
         if(!this.form.title){
             this.$vux.toast.text('请输入项目名称', 'bottom')
             return 
         } 
         if(!this.form.firstTalkDate){
             this.$vux.toast.text('请选择首谈日期', 'bottom')
             return 
         } 
         if(!this.form.type){
             this.$vux.toast.text('请选择项目类型', 'bottom')
             return 
         } 
         if(!this.form.plannedArea){
             this.$vux.toast.text('请输入拟用地面积', 'bottom')
             return 
         }    
         if(!this.form.status){
             this.$vux.toast.text('请选择项目状态', 'bottom')
             return 
         } 
        if(!this.form.industry){
             this.$vux.toast.text('请选择项目产业', 'bottom')
             return 
         } 
        if(!this.form.trade){
             this.$vux.toast.text('请选择项目行业', 'bottom')
             return 
         } 
        if(!this.form.projectMembers){
             this.$vux.toast.text('请选择项目成员', 'bottom')
             return 
         } 
         if(!this.form.rateOfProgress){
             this.$vux.toast.text('请选择项目进度', 'bottom')
             return 
         } 

        if(this.form.projectClassification ===1){
               this.form.proposedPark=undefined
               this.form.importingPeople=undefined
                if(!this.form.quasiSiteSelection){
                    this.$vux.toast.text('请输入拟安排选址', 'bottom')
                    return 
                }
                if(!this.form.investmentScale){
                    this.$vux.toast.text('请输入投资规模', 'bottom')
                    return 
                }
                if(!this.form.projectTracker){
                    this.$vux.toast.text('请选择项目跟踪人', 'bottom')
                    return 
                }  
        }else{
            this.form.quasiSiteSelection=undefined
            this.form.investmentScale=undefined
            this.form.projectTracker=undefined
             if(!this.form.proposedPark){
                    this.$vux.toast.text('请输入拟推荐园区', 'bottom')
                   return 
             }
            if(!this.form.importingPeople){
                this.$vux.toast.text('请选择项目引进人', 'bottom')
                return 
            }
        }
        //console.log(this.form)
        this.categoryAdd()
     },
     //产业
     getIndustry(){
        const url = addProjectsApi.getIndustry
        this.$post(url).then(res =>{
            if (res.result ===0){
                  this.industryOptions=res.data.map(item =>{
                      return {
                          name:item.name,
                          value:`${item.id}`
                      }
                  })
            }else{
                this.$vux.toast.text(res.message, 'bottom')
            }
        })
     },
      //行业（根据产业获取）
     getTrade(id){
        const url = addProjectsApi.getTrade
        const postData={
            parentId:id
        }
        this.$post(url, postData).then(res =>{
            if (res.result ===0){
                  this.tradeOptions=res.data.map(item =>{
                      return {
                          name:item.name,
                          value:`${item.id}`
                      }
                  })
            }else{
                this.$vux.toast.text(res.message, 'bottom')
            }
        })
     },
     //获取人员
     getUserList(){
        const url = addProjectsApi.getUserList
        this.$post(url).then(res =>{
            this.userListOptions=res.map(item =>{
                return {
                    name:item.name,
                    value:`${item.id}`
                }
            })
           
        })
     },
     categoryAdd(){
        const url = addProjectsApi.categoryAdd
        this.$post(url, this.form).then(res =>{
            if (res.result ===0){
                  this.$vux.toast.text('添加项目成功', 'bottom') 
                  const self=this
                   setTimeout(()=>{
                     self.$router.replace({
                         path:'/myprojects'
                     })
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
.add-projects{
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
    background:#fff;
    .add-projects_radio{
        .weui-cells_checkbox{
            display:flex;
            flex-direction: row;
            align-items:center;
            .weui-check_label{
              width:50%;
              .weui-cell__hd{
                  .weui-icon-checked:before{
                      color:#0188fd;
                  }
              }
            }
        }
        .weui-cells_checkbox:before{
            border:0;
        }
        .weui-cells_checkbox:after{
            border:0;
        }
    }
    .add-projects_title{
        height:4rem;
        line-height:4rem;
        font-size: 1.3rem;
        font-weight: 600;
        color: #000;
    }
    .add-projects_body{
       min-height:16.4rem;
       border-radius:0.8rem;
       background:#fff;
       box-shadow: #e8e8e8 0px 6px 6px; 
       padding:1.4rem;
        .weui-input, .vux-cell-value, .weui-textarea, .weui-label{
           color:#000;
       }
        .weui-cell{
            padding: 1.3rem 0.7rem !important;
        }
        .weui-cells:before{
            border:0;
        }
        .rectangle{
            position:relative;
            .tip{
                display:inline-block;
                color:#000;
                position:absolute;
                top: 31%;
                right: 2rem;
                z-index: 1;
                background: #fff;
                padding-left: 0.5rem;
            }
            .tip-m{
               top: 35%;
            }
        }
        .person{
            display:flex;
            padding:1rem;
            .person-label{
                height:1rem;
                width: 7rem;
            }
        }
    }
}
</style>
