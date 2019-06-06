<template>
    <div class="container-content Addevent">
         <!-- <div class="Addevent-header">
            <div class="Addevent-go">
                <img src="/webdemo/h5/res/images/goback.png" alt="" @click="goback">
                <h3>发起审批</h3>
                <img src="/webdemo/h5/res/images/goback.png" alt="">
            </div>
        </div> -->
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            <div class="head-tab_right" slot="right" @click="onsubmit">
                <img src="/webdemo/h5/res/images/icon_fb.png"/>
            </div>
        </x-header>
        <div style="margin-top: 5rem;">
            <p class="Addevent-p">基本信息</p>
            <group  class="Addevent-groud" label-width="5.5em"  >
                <x-input title="项目名称："  v-model="titlename" class="label-dv" disabled ></x-input>
                <x-input title="项目阶段："  v-model="titles" class="label-dv" disabled ></x-input>
                <x-input title="项目节点："  v-model="title" class="label-dv" disabled ></x-input>
                 <x-input title="事件标题：" v-model="value1" class="label-dv" ></x-input>
            </group>
        </div>
        <div style="margin-top: 2rem;">
            <p class="Addevent-p">事件详情</p>
            <group  class="Addevent-groud" label-width="5.5em"  >
                <x-textarea  placeholder="请输入事件描述" :show-counter="false" :rows="3" v-model="textarea"  ></x-textarea>
            </group>
        </div>
        <div style="margin-top: 2rem;  position: relative;" class="Addevent-span">
            <group  class="Addevent-groud" label-width="5.5em" v-for="(item, index) in lists" :key="index"  >
               <uploader
                    ref="input"
                    :images="images"
                    :max="varmax"
                    :upload-url="uploadUrl"
                    :handle-click="false"
                    :auto-upload="true"
                    name="files"
                    size="small"  
                    @upload-image-success="uploadImageSuccess"
                    ></uploader>
            </group>
            <group  class="Addevent-groud" @click.native.stop="openFile" >
                <cell title="上传附件" >
                    <input type="file" @change="fileChange($event)" style="display: none" ref="file"  multiple="multiple">
                    <img src="/webdemo/h5/res/images/icon_shangchuanfj@2x.png" alt="" class="posa-img" >
                </cell>
                <div >
                    <x-input title="附件名称："  v-model="item.name" class="label-dv" v-for="(item, index) in array" :key="index" disabled></x-input>
                </div>
                
            </group>
        </div>

    </div>
</template>
<script>
import {  XTextarea, XInput, PopupPicker, Datetime} from 'vux' 
import Uploader from '../components/uploader'
import configs from '@/configs'
import axios from "axios"
import cookie from '@/utils/cookie'  
export default {
    components: {
        XInput,
        PopupPicker,
        Datetime,
        Uploader,
    },
    data(){
        return{
            value1: '',
            titles:'',
            titlename:'',
            title:'',
            lists:[
                {
                    code:'0',
                    value1:'张三'
                }
            ],
            fileChangestr:'',
            time1: '2017-06-01',
            value5: ['张飞'],
            list: [['张飞', 'B', 'C']],
            sessionName:'添加事件',
            value:'fdsds',
            showindex:true,
            falge:false,
            textarea:'',
            images:[],
            varmax:20,
            uploadUrl: `${configs.apiUrl}/api/common/upload`,
            form:{
                title:'',
                categoryId:'',
                stageId:'',
                nodeId:'',
                content:'',
                images:'',
                attachment:'',
                happenDate:''
            },
            imgurl:[],
            url:[],
            infourl:'',
            arr:[],
            array:[],
            e:[]

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
            if(this.lists.length == 1){
                this.$vux.toast.text('至少保留一个', 'bottom')
            }else{
                this.lists.splice(0,1)
            }
        },
        onsubmit(){
           
            if(!this.value1){
                this.$vux.toast.text('请输入标题', 'bottom')
                return 
            }
            if(!this.textarea){
                this.$vux.toast.text('请输入事件描述', 'bottom')
                return 
            }
             this.imgurl.forEach(element => {
                this.url.push(element.url)
            });
             let keywords = {
                title:this.value1,
                categoryId:cookie.readCookie('categoryId'),
                stageId:this.$route.query.item.stageId,
                nodeId:this.$route.query.item.id,
                content:this.textarea,
                images:this.url.join(','),
                attachment:this.infourl
            }
            this.$post('/api/event/add',keywords).then(res=>{
                if(res.result == 0){
                    this.$vux.toast.text(res.message, 'bottom')
                    cookie.setCookie('title', res.data.title)
                    this.$router.go(-1)
                }
            })
        },
        //   路由 传值/api/event/add
        addevent(){
            if(this.$route.query.item.stageId == 0){
                this.titles = '招商阶段'
            }else if(this.$route.query.item.stageId == 1){
                this.titles = '建设阶段'
            }else if(this.$route.query.item.stageId == 2){
                this.titles = '运营阶段'
            }
            this.titlename = cookie.readCookie('resultObjtitle')
            this.title = this.$route.query.item.title
           
        },
        openFile(){
            this.$refs.file.click();
        }, 
        fileChange(e){
            this.array = []
            this.array.push({ 
                 name:e.target.files[0].name
            })
            this.arr.push(e.target.files[0])
            let formData = new window.FormData();
            formData.append('files',e.target.files[0]);
            axios.post(this.uploadUrl, formData, { headers: {} }).then(response => {
                this.$vux.toast.text(response.data.message, 'bottom')
                this.infourl = response.data.data.url
            });
        }, 
        uploadImageSuccess(res){
            this.imgurl = res
        },
        showindexs(){
            if(this.$route.query.index ==1 || this.$route.query.index == 2){
                this.showindex = false
                this.falge = true
            }else{
                this.showindex = true
            }
        }

    },
    mounted(){
        this.showindexs()
        this.addevent()
    }

}
</script>
<style lang="less" >
.Addevent{
    background-color: rgb(244, 245, 247);
        height: 100%;
    .Addevent-header{
        padding-top: 50px;
        background-color: #fff;
    }
    .Addevent-groud{
        
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
    .Addevent-span{
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
            width: 6%;
            position: absolute;
            right: 1.1rem;
            top: 1rem;
        }
        .Addevent-input{
            padding: 0 12px;
            border-radius: 8px;
        }
    }
    .Addevent-p{
        padding: 0 12px;
        padding-bottom: 6px;
        font-size: 1.28rem;
        font-weight: 700;
            color: #000;
    }
    .Addevent-go{
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
