<template>
  <div class="m-main main-gap" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="1">
    <!-- 1 -->
    <div v-if="permissionType == 1">
      <div class="mainHeader">
        <img src="/webdemo/h5/res/images/banner@2x.png" alt="">
        <div class="message" @click="toPending">
          <img src="/webdemo/h5/res/images/icon_tongz_cli.png" alt="">
          <div class="count" v-if="count">{{count}}</div>
        </div>
        <div class="search" @click="toSearch">
          项目名称|行业|企业名称|项目经理
          <icon type="search" style="float: right; margin-right: 1rem; margin-top: 0.5rem; font-size: 1.2rem"></icon>
        </div>
      </div>
      <div class="mainNav">
        <div @click="jumpmyproject">
          <img src="/webdemo/h5/res/images/icon_wdxm.png" alt="">
          <p>我的项目</p>
        </div>
        <div @click="toDynamic">
          <img src="/webdemo/h5/res/images/icon_dt.png" alt="">
          <p>项目动态</p>
        </div>
        <div @click="toFlexibleQuery">
          <img src="/webdemo/h5/res/images/icon_lhcx.png" alt="">
          <p>灵活查询</p>
        </div>
        <div @click="jumpApproval">
          <img src="/webdemo/h5/res/images/icon_spgl.png" alt="">
          <p>审批管理</p>
        </div>
      </div>
      <div class="mainContent">
        <div class="tab">
          <div @click="tabClick(1)" :class="classification == 1 ? 'active' : ''">在谈项目</div>
          <div @click="tabClick(2)" :class="classification == 2 ? 'active' : ''">竣工项目</div>
          <div @click="tabClick(3)" :class="classification == 3 ? 'active' : ''">自营项目</div>
          <div @click="tabClick(4)" :class="classification == 4 ? 'active' : ''">在建项目</div>
          <div @click="tabClick(5)" :class="classification == 5 ? 'active' : ''">停止谈判</div>
        </div>
        <div class="contentInfo">
          <div v-for="(item, index) in data" :key="index" @click="toProjectDetail(item)">
            <h3>{{item.title}}</h3>
            <div class="tip" :style="`background-color: ${item.color}`">{{item.status}}</div>
            <div>
              <div><img src="/webdemo/h5/res/images/icon_gsname.png" alt=""><p>企业名称：</p><span>{{item.enterprise}}</span></div>
              <div><img src="/webdemo/h5/res/images/icon_jdwt.png" alt=""><p>项目类型：</p><span>{{item.type}}</span></div>
            </div>
            <div>
              <div v-if="classification !== 3"><img src="/webdemo/h5/res/images/icon_xmfzr.png" alt=""><p>跟踪人：</p><span>{{item.projectTracker}}</span></div>
              <div v-else><img src="/webdemo/h5/res/images/icon_xmfzr.png" alt=""><p>引进人：</p><span>{{item.importingPeople}}</span></div>
              <div><img src="/webdemo/h5/res/images/icon_qdsj.png" alt=""><p>首谈时间：</p><span>{{item.firstTalkDate}}</span></div>
            </div>
          </div>
        </div>
        <load-more :show-loading="loading" :tip="tip" background-color="#f0f3f8"></load-more>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :position="position" :text="text"></toast>
    </div>
    <div v-else>
      <div class="mainHeader1">
        <img src="/webdemo/h5/res/images/banner1.png" alt="">
        <div class="search1" @click="toSearch">
          项目名称|行业|企业名称|项目经理
          <icon type="search" style="float: right; margin-right: 1rem; margin-top: 0.5rem; font-size: 1.2rem"></icon>
        </div>
        <div class="projectCount">
          <div>
            <p @click="jumpmyprojects(0)" style="font-size: 1.4rem">{{projectSum}}</p>
            <p style="font-size: 0.9rem;">项目总数</p>
          </div>
          <div>
            <div v-for="(info, index) in projectCount" :key="index">
              <p @click="jumpmyprojects(index + 1)">{{info.count || 0}}</p>
              <p>{{index === 0 ? '新建在谈' : index === 1 ? '在谈项目' : index === 2 ? '在建项目' : index === 3 ? '竣工项目' : index === 4 ? '停止谈判' : '未知'}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mainNav">
        <div style="padding: 0.5rem 0 0.5rem;" @click="toFlexibleQuery">
          <img src="/webdemo/h5/res/images/icon_lhcx.png" alt="">
          <p>灵活查询</p>
        </div>
        <div style="padding: 0.5rem 0 0.5rem;" @click="toDynamic">
          <img src="/webdemo/h5/res/images/icon_dt.png" alt="">
          <p>项目动态</p>
        </div>
        <div style="padding: 0.5rem 0 0.5rem;" @click="jumpApproval">
          <img src="/webdemo/h5/res/images/icon_spgl.png" alt="">
          <p>审批管理</p>
        </div>
      </div>
      <h2><img src="/webdemo/h5/res/images/icon_xmdt.png" alt="">项目动态</h2>
      <div class="mainContent1">
        <div class="contentItem" v-for="(item, index) in dynamicData" :key="index" @click="toEventDetail(item)">
          <img src="/webdemo/h5/res/images/iocn_xmdttt.png" alt="">
          <div>
            <h3>{{item.categoryTitle}}</h3>
            <div v-html="item.content"></div>
            <div>
              <a v-for="(item1, index1) in item.images.split(',')" :key="index1" @click.stop="toViewImg(`${imgUrl + item1}`)"><img :src="`${imgUrl + item1}`"></a>
            </div>
            <div>
              <span>{{item.modifyTime}}</span>
              <span>{{item.addUserName}}</span>
            </div>
          </div>
        </div>
        <load-more :show-loading="loading" :tip="tip" background-color="#fff"></load-more>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :position="position" :text="text"></toast>
    </div>
    <div class="imgMask" @click.stop="hideMask">
      <img :src="url" alt="">
    </div>
  </div>
</template>

<script>
import { Icon, LoadMore, Toast } from 'vux'
import cookie from '@/utils/cookie'
import config from '@/configs'

export default {
  name: "Home",
  components: {
    Icon,
    LoadMore,
    Toast
  },
  data() {
    return {
      classification: 1,
      busy: true,
      data: [],
      loading: true,
      tip: '正在加载',
      offset: 0,
      limit: 5,
      position: 'default',
      showPositionValue: false,
      text: `<p style='font-size: 1rem'>系统繁忙!</p>`,
      permissionType: '',
      projectSum: 0,
      projectCount: [],
      dynamicData: [],
      imgUrl: config.imgUrl,
      flag: true,
      count: 0,
      url: '',
      animateFlag: true
    };
  },
  created() {
    this.permissionType = cookie.readCookie('permissionType')
  },
  mounted() {
    if(this.permissionType == 1) {
      this.initData();
      this.getCount()
    } else {
      this.$post('/api/category/projectsCount').then(res => {
        this.projectSum = res.sum
        this.projectCount = res.classification
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
      })
      this.initData1()
    }
  },
  methods: {
    toViewImg(url) {
      if(this.animateFlag) {
        document.querySelector('.imgMask').style.transition = '0.5s all'
        document.querySelector('.imgMask').style.transform = 'translateX(0)'
      } else {
        document.querySelector('.imgMask').style.transition = '0.5s all'
        document.querySelector('.imgMask').style.transform = 'translateY(0)'
      }
      
      this.url = url
    },
    hideMask() {
      if(this.animateFlag) {
        document.querySelector('.imgMask').style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.querySelector('.imgMask').style.transition = 'none'
          document.querySelector('.imgMask').style.transform = 'translateY(-100%)'
        }, 500);
      } else {
        document.querySelector('.imgMask').style.transform = 'translateY(100%)'
        setTimeout(() => {
          document.querySelector('.imgMask').style.transition = 'none'
          document.querySelector('.imgMask').style.transform = 'translateX(-100%)'
        }, 500);
      }
      this.animateFlag = !this.animateFlag
    },
    getCount() {
      this.$post('/api/schedule/messageCount').then(res => {
        if(res.sum > 99) {
          this.count = 99
        } else {
          this.count = Number(res.sum)
        }
      }).catch(err => {
        this.count = 0
      })
    },
    // 去项目详情
    toProjectDetail(item){
      cookie.setCookie('itemid', item.id)
      this.$router.push({path: "/ProjectDetails",query:{item:item}})
    },
    jumpApproval(){
      this.$router.push({ path: "/Approval" })
    },
    // 去事件详情
    toEventDetail(items) { 
      cookie.setCookie('itemsid',items.id)
      this.$router.push({ path: "/EventDetails", query:{from: 'dynamic'}})
    },
    toPending() {
      this.$router.push({
        path: "/pending"
      })
    },
    toFlexibleQuery() {
      this.$router.push({
        path: "/flexibleQuery1",
        name: "FlexibleQuery1"
      })
    },
    toDynamic() {
      this.$router.push({
        path: "/dynamic",
        name: "Dynamic"
      })
    },
    toSearch() {
      this.$router.push({
        path: "/searchProject",
        name: "SearchProject"
      })
    },
    jumpmyproject() {
      this.$router.push({
        path: "/myprojects"
      })
    },
    //   我的项目路由跳转
    jumpmyprojects(id){
      if(id) {
        this.$router.push({
          path: "/flexibleQuery1",
          query: {
            id,
            name: '查看项目'
          }
        })
      } else {
        this.$router.push({path: "/flexibleQuery1",query: {name: '查看项目'}})
      }
    },
    initData() {
      this.busy = true
      let query = {
        offset: this.offset,
        limit: this.limit,
        classification: this.classification
      }
      this.$post('/api/category/categoryList', query).then(res =>{
        if(res.rows.length < 5) {
          this.loading = false
          this.tip = '暂无数据'
        } else {
          this.loading = true
          this.tip = '正在加载'
        }
        let arr = JSON.parse(JSON.stringify(this.data))
        res.rows.forEach(item => {
          if(item.type == 1) {
            item.type = '租办公室'
          } else if(item.type == 2) {
            item.type = '买办公室'
          } else if(item.type == 3) {
            item.type = '租厂房'
          } else if(item.type == 4) {
            item.type = '买厂房'
          } else if(item.type == 5) {
            item.type = '购地'
          }
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
        this.data = arr
        this.busy = false
        this.flag = true
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
        this.loading = false
        this.tip = '暂无数据'
        this.flag = true
      })
    },
    initData1() {
      this.busy = true
      let query = {
        offset: this.offset,
        limit: this.limit
      }
      this.$post('/api/event/dynamicList', query).then(res =>{
        if(res.rows.length < 5) {
          this.loading = false
          this.tip = '暂无数据'
        } else {
          this.loading = true
          this.tip = '正在加载'
        }
        let arr = JSON.parse(JSON.stringify(this.dynamicData))
        res.rows.forEach(item => {
          arr.push(item)
        })
        this.dynamicData = arr
        this.busy = false
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
        this.loading = false
        this.tip = '暂无数据'
      })
    },
    tabClick(classification) {
      if (this.classification != classification && this.flag) {
        this.classification = classification
        this.data = []
        this.loading = true
        this.tip = '正在加载'
        this.offset = 0
        this.flag = false
        this.initData()
      }
    },
    loadMore() {
      if(this.permissionType == 1) {
        this.offset += 5
        this.initData()
      } else {
        this.offset += 5
        this.initData1()
      }
    },
  }
};
</script>

<style lang='less' scoped>
.m-main {
  &::-webkit-scrollbar {
    display: none;
  }
  touch-action: pan-y;
  width: 100%;
  background-color: #f0f3f8;
  touch-action: pan-y;
  padding-bottom: 4rem;
  .mainHeader {
    position: relative;
    padding-bottom: 1rem;
    background-color: #fff;
    .message {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 50%;
      img {
        width: 1.2rem;
      }
      .count {
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        font-size: 0.8rem;
      }
    }
    .search {
      width: 80%;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -40%;
      line-height: 3rem;
      color: #ccc;
      background-color: #fff;
      text-align: center;
      border-radius: 1.5rem;
      box-shadow: 0 0.4rem 0.4rem #eee;
      cursor: pointer;
      vertical-align: middle;
    }
    >img {
      width: 100%;
    }
  }
  .mainHeader1 {
    position: relative;
    padding-bottom: 3.5rem;
    background-color: #fff;
    >img {
      width: 100%;
    }
    .search1 {
      width: 80%;
      position: absolute;
      top: 1rem;
      left: 50%;
      margin-left: -40%;
      line-height: 3rem;
      color: #ccc;
      background-color: #fff;
      text-align: center;
      border-radius: 1.5rem;
      box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, .2);
      cursor: pointer;
      vertical-align: middle;
    }
    >.projectCount {
      width: 80%;
      position: absolute;
      bottom: 0.5rem;
      left: 50%;
      margin-left: -43%;
      background: -webkit-linear-gradient(#4d81f1, #5752f4);
      background: -o-linear-gradient(#4d81f1, #5752f4);
      background: -moz-linear-gradient(#4d81f1, #5752f4);
      background: linear-gradient(#4d81f1, #5752f4);
      border-radius: 0.8rem;
      padding: 1rem;
      color: #fff;
      text-align: center;
      box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, .2);
      >div:last-of-type {
        display: flex;
        margin-top: 1rem;
        >div {
          flex: 1;
          >p:first-of-type {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
          }
          >p:last-of-type {
            font-size: 0.8rem;
            font-weight: 700;
          }
        }
      }
    }
  }
  .mainNav {
    display: flex;
    div {
      flex: 1;
      background-color: #fff;
      text-align: center;
      padding: 1rem 0 0.5rem;
      box-sizing: border-box;
      img {
        // width: 2.4rem;
        height: 2.2rem;
      }
      p {
        margin-top: 0.2rem;
      }
    }
  }
  >div>h2 {
    text-align: left;
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    >img {
      width: 1.2rem;
      vertical-align: middle;
      margin-right: 0.4rem;
    }
  }
  .mainContent {
    position: relative;
    .tab {
      width: 75%;
      display: flex;
      margin: 1rem auto;
      border: 0.05rem solid blue;
      border-radius: 0.2rem;
      div {
        flex: 1;
        font-size: 0.8rem;
        padding: 0.4rem;
        box-sizing: border-box;
        border-right: 0.05rem solid blue;
        text-align: center;
        &:last-of-type {
          border-right: 0;
        }
        &.active {
          background-color: blue;
          color: #fff;
        }
      }
    }
    .contentInfo {
      padding: 0.8rem;
      padding-top: 0;
      >div {
        padding: 0.8rem;
        background-color: #fff;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        box-shadow: 0 0.25rem 0.5rem #ddd;
        position: relative;
        >h3 {
          text-align: left;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 1rem;
          font-weight: 600;
          width: 80%;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        >.tip {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.3rem 0.5rem;
          border-radius: 0 0.8rem 0 0.8rem;
          color: #fff;
        }
        >div {
          display: flex;
          margin-bottom: 0.8rem;
          color: #888;
          >div {
            flex: 1;
            line-height: 1.5rem;
            img {
              float: left;
              width: 1.2rem;
              margin-right: 0.4rem;
              margin-top: 0.1rem;
            }
            p {
              float: left;
            }
            span {
              float: left;
              width: 7rem;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
            }
          }
        }
      }
    }
  }
  .mainContent1 {
    padding: 0.5rem;
    padding-top: 0;
    background-color: #fff;
    >.contentItem {
      position: relative;
      border-bottom: 0.1rem solid #ededed;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      >img {
        position: absolute;
        top: 0.6rem;
        left: 0;
        width: 2rem;
      }
      >div {
        padding-left: 2.4rem;
        h3 {
          height: 2rem;
          color: #3a3980;
          text-align: left;
          font-weight: 700;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        >div:first-of-type {
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 1rem;
        }
        >div{
          display: flex;
          a {
            width: 30%;
            float: left;
            margin-right: 3%;  
            img {
              width: 100%;
              height: 6rem;
            }
          }
          &:last-of-type {
            margin-top: 0.5rem;
            color: #777;
            span {
              font-size: 1rem;
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
  .imgMask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #000;
    transition: 0.5s all;
    transform: translateX(-100%);
    img {
      margin: auto;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
