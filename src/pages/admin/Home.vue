<template>
  <div class="m-main main-gap" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="0">
    <div v-if="permissionType == 1">
      <div class="mainHeader">
        <img src="/webdemo/h5/res/images/banner@2x.png" alt="">
        <div class="message">
          <img src="/webdemo/h5/res/images/icon_tongz_cli.png" alt="">
        </div>
        <div class="search">
          项目名称|行业|企业名称项目经理
          <icon type="search" style="float: right; margin-right: 1rem; margin-top: 0.5rem; font-size: 1.2rem"></icon>
        </div>
      </div>
      <div class="mainNav">
        <div>
          <img src="/webdemo/h5/res/images/icon_wdxm.png" alt="">
          <p>我的项目</p>
        </div>
        <div>
          <img src="/webdemo/h5/res/images/icon_dt.png" alt="">
          <p>项目动态</p>
        </div>
        <div>
          <img src="/webdemo/h5/res/images/icon_lhcx.png" alt="">
          <p>灵活查询</p>
        </div>
        <div>
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
          <div v-for="(item, index) in data" :key="index">
            <h3>{{item.title}}</h3>
            <div class="tip" :style="`background-color: ${item.color}`">{{item.status}}</div>
            <div>
              <div><img src="/webdemo/h5/res/images/icon_gsname.png" alt=""><p>企业名称：</p><span>{{item.enterprise}}</span></div>
              <div><img src="/webdemo/h5/res/images/icon_jdwt.png" alt=""><p>项目类型：</p><span>{{item.type}}</span></div>
            </div>
            <div>
              <div v-if="this.classification != 3"><img src="/webdemo/h5/res/images/icon_xmfzr.png" alt=""><p>跟踪人：</p><span>{{item.projectTracker}}</span></div>
              <div v-else><img src="/webdemo/h5/res/images/icon_xmfzr.png" alt=""><p>跟踪人：</p><span>{{item.importingPeople}}</span></div>
              <div><img src="/webdemo/h5/res/images/icon_qdsj.png" alt=""><p>首谈时间：</p><span>{{item.firstTalkDate}}</span></div>
            </div>
          </div>
        </div>
        <load-more :show-loading="loading" :tip="tip" background-color="#f0f3f8"></load-more>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :position="position" style="font-size: 12px" :text="text"></toast>
    </div>
    <div v-else>
      <div class="mainHeader1">
        <img src="/webdemo/h5/res/images/banner1.png" alt="">
        <div class="search1">
          项目名称|行业|企业名称项目经理
          <icon type="search" style="float: right; margin-right: 1rem; margin-top: 0.5rem; font-size: 1.2rem"></icon>
        </div>
        <div class="projectCount">
          <div>
            <p style="font-size: 1.4rem">50</p>
            <p style="font-size: 1rem; font-weight: 700">项目总数</p>
          </div>
          <div>
            <div>
              <p>10</p>
              <p>新建在谈</p>
            </div>
            <div>
              <p>10</p>
              <p>在谈项目</p>
            </div>
            <div>
              <p>10</p>
              <p>在建项目</p>
            </div>
            <div>
              <p>10</p>
              <p>竣工项目</p>
            </div>
            <div>
              <p>10</p>
              <p>停止谈判</p>
            </div>
          </div>
        </div>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :position="position" style="font-size: 12px" :text="text"></toast>
    </div>
  </div>
</template>

<script>
import { Icon, LoadMore, Toast } from 'vux'
import cookie from '@/utils/cookie'
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
      permissionType: ''
    };
  },
  created() {
    this.permissionType = cookie.readCookie('permissionType');
  },
  mounted() {
    if(this.permissionType == 1) {
      this.initData();
    } else {
      this.$get('/api/category/projectsCount').then(res => {
        console.log(res)
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
      })
    }
  },
  methods: {
    initData() {
      this.busy = true
      let query = {
        offset: this.offset,
        limit: this.limit,
        classification: this.classification
      }
      this.$post('/api/category/categoryList', query).then(res =>{
        console.log(res)
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
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
        this.loading = false
        this.tip = '暂无数据'
      })
    },
    tabClick(classification) {
      if (this.classification != classification) {
        this.classification = classification
        this.data = []
        this.loading = true
        this.tip = '正在加载'
        this.offset = 0
        this.initData()
      }
    },
    loadMore() {
      if(this.permissionType == 1) {
        this.offset += 5
        this.initData()
      } else {

      }
    }
  }
};
</script>

<style lang='less' scoped>
.m-main {
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  width: 100%;
  background-color: #f0f3f8;
  touch-action: pan-y;
  padding-bottom: 50px;
  .mainHeader {
    position: relative;
    padding-bottom: 1rem;
    background-color: #fff;
    .message {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: #fff;
      padding: 5px;
      border-radius: 50%;
      img {
        width: 1.2rem;
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
    padding-bottom: 5rem;
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
      bottom: 2rem;
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
      >div:last-of-type {
        display: flex;
        margin-top: 1rem;
        >div {
          flex: 1;
          >p:first-of-type {
            font-size: 1.2rem;
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
  .mainContent {
    position: relative;
    .tab {
      width: 75%;
      display: flex;
      margin: 10px auto;
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
}
</style>
