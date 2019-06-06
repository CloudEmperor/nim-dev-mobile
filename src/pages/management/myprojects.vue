<template>
    <div class="myprojects container-content">
        <div class="myprojects-header">
            <x-header class="head-tab" :left-options="{backText: ''}">
                    {{sessionName}}
            </x-header>
            <tab :line-width="2" custom-bar-width="60px" bar-active-color="#fff" >
                <tab-item selected @on-item-click="onItemClick" >{{ tittle.value }}</tab-item>
                <tab-item @on-item-click="onItemClick">{{tittle1.value}}</tab-item>
                <tab-item  @on-item-click="onItemClick">{{tittle2.value}}</tab-item>
                <tab-item @on-item-click="onItemClick">{{tittle3.value}}</tab-item>
            </tab>
        </div>
        <div class="myprojects-ul" >
            
            <flexbox>
                <flexbox-item orient="vertical">
                    <div class="flex-demo">
                        <ul @click="ProjectDetails(item)" v-for="(item, index) in rows" :key="index">
                            <h3 class="myprojects-h3">{{item.title}}</h3>
                            <div class="tip" :style="`background-color: ${item.color}`">{{item.status}}</div>
                            <li class="myprojects-em">
                                <img src="/webdemo/h5/res/images/icon_gsname@2x.png" alt="" style="width: 10%;">
                                <em>企业名称：{{item.enterprise}}</em>
                            </li>
                            <li>
                                <img src="/webdemo/h5/res/images/icon_jdwt@2x.png" alt="">
                                <em>项目类型：{{item.type === 1 ? '新增在谈项目' : item.type === 2 ? '在谈项目' : item.type === 3 ? '在建项目' : item.type === 4 ? '竣工项目' : item.type === 5 ? '停止谈判' : '未知'}}
</em>
                            </li>
                            <li v-if="item.projectTracker !== null ">
                                <img src="/webdemo/h5/res/images/icon_xmfzr@2x.png" alt="">
                                <em>跟踪人：{{item.projectTracker}}</em>
                            </li>
                            <li v-else>
                                <img src="/webdemo/h5/res/images/icon_xmfzr@2x.png" alt="">
                                <em>引进人：{{item.importingPeople}}</em>
                            </li>
                            <li>
                                <img src="/webdemo/h5/res/images/icon_qdsj@2x.png" alt="">
                                <em>首谈时间：{{item.firstTalkDate}}</em>
                            </li>
                            
                        </ul>
                    </div>
                </flexbox-item>
                <!-- <flexbox-item><div class="flex-demo">2</div></flexbox-item> -->
            </flexbox>
        </div>
        <transition name="mybox">
            <div class="myprojects-tost" v-show="condition">
                <!-- 引进年份 -->
                <ul>
                    <li v-for="(item, index) in yesr" :key="index" @click="changeyesr(item,index)" :class="{active: isactive == index}" >{{item}}</li>
                </ul>
            </div>
        </transition>
        <transition name="mybox">
            <div class="myprojects-tost" v-show="condition1">
                <!-- 项目类型 -->
                <ul>
                    <li v-for="(item, index) in types" :key="index" @click="changetypes(item,index)" :class="{active: isactive1 == index}">{{item.value}}</li>
                </ul>
            </div>
        </transition>
        <transition name="mybox">
            <div class="myprojects-tost" v-show="condition2">
                <!-- 项目状态 -->
                <ul>
                    <li v-for="(item, index) in status" :key="index" @click="changestatus(item,index)" :class="{active: isactive2 == index}">{{item.value}}</li>
                </ul>
            </div>
        </transition>
        <transition name="mybox">
            <div class="myprojects-tost" v-show="condition3">
                <!-- 更新时间 -->
                <ul>
                    <li v-for="(item, index) in times" :key="index" @click="changetimes(item,index)" :class="{active: isactive3 == index}">{{item.value}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import { Tab, TabItem,Flexbox,FlexboxItem, } from 'vux'
import cookie from '@/utils/cookie'
export default {
    components: {
        Tab,
        TabItem,
         Flexbox,
    FlexboxItem,
    },
    data(){
        return{
            index:0,
            sessionName:'我的项目',
            condition:false,
            condition1:false,
            condition2:false,
            condition3:false,
            yesr:['全部','2019','2018','2017','2016','2015','2014','2013','2012'],
            types:[{value:'全部',status:''},{value:'租办公室',status:'1'},{value:'买办公室',status:'2'},{value:'租厂房',status:'3'},{value:'买厂房',status:'4'},{value:'购地',status:'5'}],
            status:[{value:'全部',status:''},{value:'搁置',status:'1'},{value:'一般跟踪',status:'2'},{value:'重点跟踪',status:'3'},{value:'已落地',status:'4'},{value:'已完成',status:'5'},],
            times:[{value:'全部',status:''},{value:'三天以内',status:'3'},{value:'一周以内',status:'7'},{value:'一个月内',status:'30'},],
            tittle:{value:'引进年份',status:''},
            tittle1:{value:'项目类型',status:''},
            tittle2:{value:'项目状态',status:''},
            tittle3:{value:'更新时间',status:''},
            isactive:0,
            isactive1:0,
            isactive2:0,
            isactive3:0,
            offset:0,
            limit:8,
            rows:[],
            modifyTime:'',
            type:'',
            statu:'',
            lishow:true,
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        change(index){
             this.$router.push({ path: "/Initiatepending",query: {index: index}})
        },
        //   我的项目  /api/category/categoryList
        categoryList(Year,type,status,modifyTime){
            if(Year == '全部'){
                Year = ''
            }
            let keywords = {
                offset:this.offset,
                limit:this.limit,
                introducedYear:Year,
                type:type,
                status:status,
                modifyTime:modifyTime
            }
            this.$post('/api/category/categoryList',keywords).then(res=>{
                console.log(res,'fdsfs ')
                this.rows = res.rows
                if(res.rows.length < 5) {
                    this.loading = false
                    this.tip = '暂无数据'
                    } else {
                    this.loading = true
                    this.tip = '正在加载'
                    }
                    let arr = JSON.parse(JSON.stringify(this.rows))
                    this.rows.forEach(item => {
                        if(item.status == 1) {
                            item.status = '搁置'
                            item.color = '#aaa'
                        } else if(item.status == 2) {
                            item.status = '一般跟踪'
                            item.color = '#37cf37'
                        } else if(item.status == 3) {
                            item.status = '重点跟踪'
                            item.color = '#dd001b'
                        } else if(item.status == 4) {
                            item.status = '已落地'
                            item.color = '#f9ab2f'
                        } else if(item.status == 5) {
                            item.status = '已完成'
                            item.color = '#289dd2'
                        }
                        arr.push(item)
                    })
            }).catch(err => {
                        this.position = 'bottom'
                        this.showPositionValue = true
                        this.loading = false
                        this.tip = '暂无数据'
                        this.flag = true
                    })
        },
        changeyesr(row,index){
            this.tittle.value = row
            this.isactive = index
            this.categoryList(row)
            this.lishow = !this.lishow
            this.condition = !this.condition 
        },
        changetypes(row,index){
            this.type = row.status
            this.tittle1.value = row.value
            this.isactive1 = index
            let Year = ''
            this.categoryList(Year,row.status)
            this.condition1 = !this.condition1
        },
        changestatus(row,index){
            this.statu = row.status
            this.tittle2.value = row.value
            this.isactive2 = index
            let Year = ''
            let type = ''
            this.categoryList(Year,type,row.status)
            this.condition2 = !this.condition2
        },
        changetimes(row,index){
            this.modifyTime = row.status
            this.tittle3.value = row.value
            this.isactive3 = index
            let Year = ''
            let type = ''
            let status = ''
            this.categoryList(Year,type,status,row.status)
            this.condition3 = !this.condition3
        },
        
        ProjectDetails(item){
            cookie.setCookie('itemid', item.id)
            this.$router.push({path: "/ProjectDetails",query:{item:item}})
        },
        onItemClick (index) {
            if(index == 0){
                this.condition = !this.condition            
                this.condition1 = false
                this.condition2 = false
                this.condition3 = false
            }else if(index == 1){
                this.condition1 = !this.condition1
                this.condition = false
                this.condition2 = false
                this.condition3 = false
            }else if(index== 2){
                this.condition2 = !this.condition2
                this.condition = false
                this.condition1 = false
                this.condition3 = false
            }else if(index ==3){
                this.condition3 = !this.condition3
                this.condition = false
                this.condition1 = false
                this.condition2 = false
            }
            this.index = index
        }
    },
    mounted(){
        this.categoryList()
    }
}
</script>
<style lang="less" scoped>
    .myprojects{
        background-color: rgb(244, 245, 247);
        height: 100%;
        .flex-demo {
            text-align: center;
            color: #fff;
            // background-color: #fff;
            border-radius: 8px;
            background-clip: padding-box;
             box-shadow: #e8e8e8 0px 0px 6px;
            ul{
                overflow: hidden;
                margin-bottom: 1rem;
                background-color: #fff;
                border-radius: 8px;
                position: relative;
                .myprojects-h3{
                    color: #000;
                    text-align-last: left;
                    margin-left: 0.5rem;
                    margin-top: 1rem;
                    font-size: 1.3rem;
                    font-weight: 700;
                }
                .tip {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 0.3rem 0.5rem;
                    border-radius: 0 0.8rem 0 0.8rem;
                    color: #fff;
                }
                li{
                    float: left;
                    padding: 1rem 0rem;
                    padding-left: 0.5rem;
                    text-align: left;
                    em{
                        font-style: normal;
                        color: #000;
                        overflow: hidden;	
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        display: inline-block;
                        width: 11rem;
                    }
                    img{
                        width: 10%;
                        float: left;
                        margin-right: 1rem;
                    }
                }
            }
        }
        .vux-flexbox-item{
            padding: 10px 12px;
        }
        .myprojects-header{
            padding-top: 50px;
            background-color: #fff;
        }
        .myprojects-go{
            padding: 0 1rem;
            img{
                    float: left;
            }
            h3{
                font-size: 1.35rem;
                font-weight: 700;
            }
        }
        .myprojects-tost{
            width: 100%;
            position: absolute;
            top: 7.85rem;
            left: 0;
            ul{
                background-color: #fff;
                li{
                    list-style: none;
                    padding: 0.5rem 0.5rem;
                    border-bottom: 1px solid #f7f4f4;
                    color: #666;
                }
            }
            .active{
                background-color: #3366FF;
                color: #fff;
            }
        }
        .mybox-leave-active,.mybox-enter-active{
            transition: all 1s ease;
        }
        .mybox-leave-active,.mybox-enter{
            opacity:0 !important;
        }
        .mybox-leave,.mybox-enter-active{
            opacity: 500;
        }

    }
   
</style>
