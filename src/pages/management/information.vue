<template>
    <div class="container-content Addevent">
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            <div class="head-tab_right" slot="right" @click="onsubmit">
                <img src="/webdemo/h5/res/images/icon_fb.png"/>
            </div>
        </x-header>
       
        <div style="margin-top: 5rem;">
            <p class="Addevent-p">反馈信息</p>
            <group  class="Addevent-groud" label-width="5.5em"  >
                <x-textarea  placeholder="请输入反馈信息" :show-counter="false" :rows="3" v-model="textarea" :height="200" ></x-textarea>
            </group>
        </div>
        <div  style="margin-top: 1rem;">
            <p class="Addevent-p">联系方式</p>
            <group class="Addevent-groud" label-width="5.5em">
                <x-input title="手机号" v-model="iphone"></x-input>
            </group>
        </div>
    </div>
</template>
<script>
import {  XTextarea, XInput, PopupPicker, Datetime} from 'vux' 
import Uploader from 'vux-uploader'
export default {
    components: {
        XInput,
        PopupPicker,
        Datetime,
        Uploader,
    },
    data(){
        return{
            
            sessionName:'意见反馈',
            
            textarea:'',
            iphone:''
           
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        onsubmit(){
            let keywords = {
                content:this.textarea,
                contactWay:this.iphone
            }
            this.$post('/api/feedback/submit',keywords).then(res=>{
                if(res.result == 700){
                    this.$vux.toast.text(res.message, 'bottom')
                    this.$router.go(-1)
                }
            })
        }
    },
    mounted(){
       
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
   
    .Addevent-p{
        padding: 0 12px;
        padding-bottom: 6px;
        font-size: 1.28rem;
        font-weight: 700;
            color: #000;
    }
}
    
</style>
