<template>
    <div class="EventDetails container-content">
        <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            <div v-if="!$route.query.from" class="head-tab_right" slot="right" @click="jumpfalge">
                ●●●
            </div>
            
        </x-header>
        <div class="EventDetails-span" v-show="falge">
            <ul>
                <li @click="jumpeditors">   
                    <img src="/webdemo/h5/res/images/icon_sjbj@2x.png" alt="">
                    <span>编辑事件</span>
                </li>
                <li @click="jumpdelete">
                    <img src="/webdemo/h5/res/images/icon_sjdalete@2x.png" alt="">
                    <span>删除事件</span>
                </li>
            </ul>
        </div>
        <div style="margin-top: 5rem;" class="EventDetails-dv0">
            <div class="EventDetails-dv">
                <h2>{{datadetail.title}}</h2>
                <p  class="fsdf">
                    <span>{{datadetail.userName}}</span>
                    <span>{{datadetail.modifyTime}}</span>
                </p>
            </div>
            <div class="EventDetails-dv">
                <h2>事件详情</h2>
                <p  class="fsdf" v-html="datadetail.content">
                    
                </p>
            </div>
            <div class="EventDetails-dv">
                <h2>事件照片</h2>
                <img :src="`${configs.imgUrl + item}`"  v-for="(item, index) in images" :key="index" style="width: 46%;margin-bottom: 1rem; margin-right: 1rem;">
                
            </div>
             <div class="EventDetails-dv">
                <h2>附件</h2>
               <p v-for="(item, index) in attachment" :key="index">
                  
                       <span>
                        <img src="/webdemo/h5/res/images/icon_wjtub@2x.png" style="width: 8%;margin-right: 0.5rem;">
                    </span>
                    <span>
                        {{item.substring(item.lastIndexOf("/")+1)}}
                    </span>
                  
               </p>
            </div>
        </div>
    </div>
</template>
<script>
import cookie from '@/utils/cookie'  
import configs from '@/configs'  
export default {
    data(){
        return{
            sessionName:'事件详情',
            datadetail:{},
            images:[],
            attachment:[],
            falge:false,
            configs: configs
        }
    },
    methods:{
        //   
        jumpeditors(){
            this.$router.push({path: "/editors",query:{id:this.datadetail.id,item:this.$route.query.item}})
        },
        jumpfalge(){
            this.falge = !this.falge
        },
        //   事件详情 /api/event/detail
        detail(){
            let key ={
                eventId:cookie.readCookie('itemsid')
            }
            this.$post('/api/event/detail',key).then(res=>{
                if(res.result == 0){
                    this.datadetail = res.data
                    this.images = this.datadetail.images.split(",")
                    this.attachment =this.datadetail.attachment.split(",")
                }
            })
        },
        //  删除事件   、
        jumpdelete(){
            let key = {
                id:cookie.readCookie('itemsid')
            }
            this.$post('/api/event/delete',key).then(res=>{
                if(res.result == 0){
                    this.$vux.toast.text(res.message, 'bottom')
                    this.$router.go(-1)
                }
            })
        }
    },
    mounted(){
        this.detail()
    }
}
</script>
<style lang="less" scoped>
    .EventDetails{
        background-color: rgb(244, 245, 247);
        height: 100%;
        .EventDetails-span{
            position: absolute;
            right: 1.5rem;
            top: 3rem;
            z-index: 10;
            ul{
                li{
                    padding: 1rem 2rem;
                    background-color: #fff;
                    
                    img{
                        width: 20%;
                    }
                }
                li:nth-child(1){
                    border-bottom: 1px solid rgb(226, 226, 226);
                }
            }
            
        }
        .EventDetails-dv0{
            background-color: #fff;
            margin: 0 0.5rem;
            border-radius: 8px;
            padding-left: 0.5rem;
            .EventDetails-dv{
                border-bottom: 1px solid rgb(226, 226, 226);
                h2{
                    text-align: left;
                    font-size: 1.3rem;
                    color: #000;
                    font-weight: 700;
                    padding-bottom: 1.5rem;
                    padding-top: 0.8rem;
                    
                }
                .fsdf{
                    padding-bottom: 0.5rem;
                }
            } 
        }
          
    }
  
</style>
