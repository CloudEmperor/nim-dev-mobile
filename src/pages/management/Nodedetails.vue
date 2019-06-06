<template>
    <div class="container-content Nodedetails">
        <div class="Nodedetails-header">
            <x-header class="head-tab" :left-options="{backText: ''}">
                {{sessionName}}
            </x-header>
        </div>
        <div >
            <div class="Nodedetails-ul">
                <ul>
                    <li v-for="(item, index) in listimg" :key="index" @click="jumplistimg(item)">
                        <img src="/webdemo/h5/res/images/pic_jdbg@2x.png" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            
            <div class="Nodedetails-right" v-for="(item, index) in nodes" :key="index" @click="jumpgroup(index,item)">
                <div class="Nodedetails-lift" >
                    <img src="/webdemo/h5/res/images/pic_jdjh@2x.png" alt="">
                    <img src="/webdemo/h5/res/images/pic_jdwjh@2x.png" alt="" v-show="condition">
                </div>
                <group  class="Nodedetails-groud" label-width="7em" >
                    <x-input :title="item.title"  class="label-dv" disabled >
                    </x-input>
                    <img src="/webdemo/h5/res/images/icon_bluedown@2x.png" alt="" class="posa-img" >
                    <div v-show="index == i">
                        <group  label-width="5.5em"  >
                            <div v-for="(items, index) in eventlist" :key="index" @click="jumpevent(items,item)">
                                <x-input  v-model="items.title "  disabled class="groups"   >
                                </x-input>
                            </div>
                            
                            
                        </group>
                        <p v-if="!$route.query.from" @click="jumpaddevent(item)"><img src="/webdemo/h5/res/images/icon_tjsj@2x.png" alt="">添加事件</p>
                    </div>
                        
                        
                </group>
            </div>
        </div>
    </div>
</template>
<script>
import cookie from '@/utils/cookie'
export default {
    data(){
        return{
            sessionName:'项目详情',
            condition:false,
            condition1:false,
            value1:'张三',
            // item.title:'恰谈项目',
            // listimg:[{id:'0',value:'招商阶段'},{id:'1',value:'建设阶段'},{id:'2',value:'运营阶段'}],
            listimg:[],
            nodess:[],
            nodes:[],
            i:-1,
            stageId:'',
            title:'',
            itemslist:[{id:'0',value:'招商阶段'},{id:'1',value:'建设阶段'},{id:'2',value:'运营阶段'}],
            events:[],
            eventss:[],
            eventlist:[]
        }
    },
    methods:{
        jumpgroup(index,item){
           this.i = index
           this.eventlist= []
            //    this.title = cookie.readCookie('title')
            this.eventss.forEach((items,index)=>{
                if(item.id ==items.nodeId ){
                    this.eventlist.push(items)
                }else if(this.eventlist.length < 0){
                    this.eventlist = []
                }
            })
        },
        jumpevent(items,item){  
            cookie.setCookie('itemsid',items.id)
            // cookie.setCookie('xiangqing',item)
            if(this.$route.query.from) {
              this.$router.push({path: "/EventDetails", query: {from: 'flexible'}})
            } else {
              this.$router.push({path: "/EventDetails",query:{item:item}})
            }
            // this.$router.push({ path: "/EventDetails",query:{item:item}})
        },
        jumpaddevent(item){
            this.$router.push({ path: "/Addevent",query:{item:item}})
        },
        jumpeventName(data){
             

        },
        //   节点列表   /api/event/getEvent
        getEvent(){
            let keywordes = {
                categoryId:cookie.readCookie('categoryId')
            }
            this.$post('/api/event/getEvent',keywordes).then(res=>{
                this.nodess = res.nodes
                this.eventss = res.events
                this.events = this.eventss
                this.listimg = res.stages
                this.nodes = this.nodess
            })
        },
        jumplistimg(item){
            let arr = []
            this.nodess.forEach(element => {
                this.stageId = element.stageId
                if(item.id == element.stageId){
                    arr.push(element)
                }
            });
            this.nodes = []
            arr.forEach(element => {
                this.nodes.push(element)
            });
            // this.jumpgroup()
        }
    },
    mounted(){ 
       this.getEvent()
       this.jumpeventName()
    },
}
</script>
<style lang="less">
    .Nodedetails{
        .Nodedetails-header{
            margin-top: 5rem;
            background-color: #fff;
        }
        .Nodedetails-lift{
             float: left;
             padding-left: 1rem;
             img{
                 width: 65%;
             }
        }
        .Nodedetails-ul{
            // overflow: hidden;
            ul{
                overflow: hidden;
                li{
                    list-style: none;
                    float: left;
                    position: relative;
                    width: 33.3333%;
                    img{
                        width: 100%;
                        display: block;
                    }
                    span{
                        color: #fff;
                        font-size:1.3rem;
                        position: absolute;
                        top: 1.8rem;
                        right: 2.6rem;
                        font-size: 1.3rem;
                    }
                }
            }
        }
        .Nodedetails-right{
            overflow: hidden;
            margin-bottom: 1rem;
            .Nodedetails-groud{
                box-shadow: #e8e8e8 0px 0px 6px;
                // padding: 0 12px;
                border-radius: 8px;
                position: relative;
                width: 77.5%;
                float: left;
               
                .vux-no-group-title{
                    border-radius: 8px;
                    // padding: 0 12px;
                    background-color: #fff;
                }
                .vux-no-group-title:before{
                    border-top:  0 !important;
                    border-bottom: 0 !important;
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
                .groups{
                    padding-bottom: 4px;
                }
                p{
                    text-align: center;
                    font-size: 1.3rem;
                    border-top: 1px solid #ccc;
                    margin:  0 12px;
                    padding-top: 8px;
                    padding-bottom: 4px;
                    img{
                        width: 5%;
                        margin-right: 0.3rem;
                    }
                }
            }
        }
        
        .posa-img{
            width: 3.6%;
            position: absolute;
            right: 1.1rem;
            top: 1.9rem;
        }
    }
</style>
