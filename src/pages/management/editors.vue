<template>
    <div class="container-content Addevent">
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
                <x-textarea  placeholder="请输入事件描述" :show-counter="false" :rows="3" v-html="textarea"  ></x-textarea>
            </group>
        </div>
        <div style="margin-top: 2rem;  position: relative;" class="Addevent-span">
            <group  class="Addevent-groud" label-width="5.5em" v-for="(item, index) in lists" :key="index"  >
               <uploader
                    ref="input"
                    :max="varmax"
                    :images="images"
                    :upload-url="uploadUrl"
                    :handle-click="false"
                    :auto-upload="true"
                    name="files"
                    size="small"  
                    @upload-image-success="uploadImageSuccess"
                    :accept="alldata.images"
                    ></uploader>
            </group>
            <p class="Addevent-pp">上传附件</p>
            <group  class="Addevent-groud" @click.native.stop="openFile" >
                <!-- item.substring(item.lastIndexOf("/")+1) file .substring(file .lastIndexOf("_")+1)-->
                <cell :title="strattachment" >
                    <input type="file" @change="fileChange($event)" style="display: none" ref="file"   multiple="multiple">
                    <img src="/webdemo/h5/res/images/icon_shangchuanfj@2x.png" alt="" class="posa-img" >
                </cell>
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
            file:'',
            lists:[
                {
                    code:'0',
                    value1:'张三'
                }
            ],
            time1: '2017-06-01',
            value5: ['张飞'],
            list: [['张飞', 'B', 'C']],
            sessionName:'编辑事件',
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
            alldata:{},
            strattachment:'',

        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
       
        onsubmit(){
            this.imgurl.forEach(element => {
                this.url.push(element.url)
            });
             let keywords = {
                title:this.value1,
                id:this.$route.query.id,
                content:this.textarea,
                images:this.url.join(','),
                attachment:this.infourl
            }
            this.$post('/api/event/update',keywords).then(res=>{
                if(res.result == 0){
                    this.$vux.toast.text(res.message, 'bottom')
                    cookie.setCookie('title', res.data.title)
                    this.$router.go(-2)
                }
            })
        },
        //  编辑接口  
        Alledito(){
            let key ={
                eventId:this.$route.query.id
            }
            console.log(key,'265635656')
            this.$post('/api/event/findById',key).then(res=>{
                console.log(res,'是的房间的设计费')
                if(res.result == 0){
                    this.alldata = res.data
                    this.textarea = res.data.content
                    this.value1 = res.data.title
                    this.images = res.data.images.split(",")
                    this.strattachment = res.data.attachment.substring(res.data.attachment.lastIndexOf("/")+1)
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
          let formData = new window.FormData();
         formData.append('files', e.target.files[0]);
          axios.post(this.uploadUrl, formData, { headers: {} })
          .then(response => {
              this.infourl = response.data.data.url
            
          });
        }, 
        uploadImageSuccess(res){
            this.imgurl = res
            this.imgurl.forEach(element => {
                this.url.push(element.url)
            });
        },
     

    },
    mounted(){
        this.addevent()
        this.Alledito()
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
    .Addevent-pp{
        padding: 1rem 12px;
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
