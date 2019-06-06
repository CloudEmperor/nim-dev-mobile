<template>
 <!-- v-touch:swipeleft="show" v-touch:swiperight="hide" -->
  <div class="mainContainer" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="1" v-touch:swipeleft="show" v-touch:swiperight="hide">
    <div class="pageTitle" style="position: fixed;top: 0;left: 0;right: 0;">
      <!-- <img src="/webdemo/h5/res/images/goback.png" alt="" style="float: left; line-height: 3rem; width:1.6rem;"> -->
      <x-icon type="ios-arrow-back" size="30" style="float: left;line-height: 3rem;height: 100%;" @click="backHome"></x-icon>
      <div>{{$route.query.name||'灵活查询'}}</div>
    </div>
    <div class="mark" v-show="queryShow" @click="markClick">
      <div class="choose">
        <div class="chooseBox">
          <div class="chooseItem">
            <div class="itemTitle">
              引进年份
            </div>
            <div class="itemBody">
              <datetime
                placeholder="引进年份"
                style="height: 3rem"
                format="YYYY"
                start-date="1800-01-01"
                end-date="3000-01-01"
                v-model="introducedYear"></datetime>
            </div>
          </div>
          <div class="chooseItem">
            <div class="itemTitle">
              项目分类
            </div>
            <div class="itemBody">
              <!-- , active: item.id == projectClassification -->
              <div style="position:relative" :class="{itemOption:true}" v-for="(item, i) in projectClassificationData" :key="i" @click="projectClassificationChange(item.id)">{{item.name}}
              <img v-show="item.id == projectClassification" src="/webdemo/h5/res/images/icon_xuanzhong.png" alt="" style="position:absolute;bottom:0;right:0;width: 2rem;"></div>
            </div>
          </div>
          <div class="chooseItem">
            <div class="itemTitle">
              项目类型
            </div>
            <div class="itemBody">
              <div style="position:relative" :class="{itemOption:true}" v-for="(item, i) in typeData" :key="i" @click="typeChange(item.id)">{{item.name}}
              <img v-show="item.id == type" src="/webdemo/h5/res/images/icon_xuanzhong.png" alt="" style="position:absolute;bottom:0;right:0;width: 2rem;"></div>
            </div>
          </div>
          <div class="chooseItem">
            <div class="itemTitle">
              项目规模
            </div>
            <div class="itemBody">
              <div style="position:relative" :class="{itemOption:true}" v-for="(item, i) in investmentScaleData" :key="i" @click="investmentScaleChange(item.id)">{{item.name}}
              <img v-show="item.id == investmentScale" src="/webdemo/h5/res/images/icon_xuanzhong.png" alt="" style="position:absolute;bottom:0;right:0;width: 2rem;"></div>
            </div>
          </div>
          <div class="chooseItem">
            <div class="itemTitle">
              首谈时间
            </div>
            <div class="itemBody">
              <datetime
                placeholder="开始时间"
                style="height: 3rem;"
                format="YYYY-MM-DD"
                start-date="1800-01-01"
                :end-date="endDate"
                v-model="firstTalkDateStart"></datetime>
              <datetime
                placeholder="截止时间"
                style="height: 3rem;"
                format="YYYY-MM-DD"
                :start-date="startDate"
                end-date="3000-12-31"
                v-model="firstTalkDateEnd"></datetime>
            </div>
          </div>
        </div>
        <div class="buttonGroup">
          <div class="close" @click="hide"><x-icon type="ios-close-empty" size="4rem" style="line-height: 4rem;"></x-icon></div>
          <div class="reset" @click="reset">重置</div>
          <div class="confirm" @click="confirm">确认查询</div>
        </div>
      </div>
    </div>
    
    <div class="mainContent">
    <div class="query">
      <div style="position:relative">
        <input type="text" placeholder="搜索..." v-model="search">
        <img src="/webdemo/h5/res/images/icon_lhsch.png" alt="" style="width:1.5rem; position: absolute; top: 0.7rem; right: 1rem;" @click="confirm">
      </div>
      <span @click="show">筛选<img src="/webdemo/h5/res/images/icon_sxuan.png" alt="" style="width:1.5rem; vertical-align: middle; margin-left: 0.2rem"></span>
    </div>
      <div class="mainBox">
        <div class="mainItem" v-for="(item, i) in flexibleData" :key="i" @click="toProjectDetail(item)">
          <div class="title">{{item.title}}</div>
          <div>
            <div class="people" v-if="item.projectClassification !== 3"><p>跟踪人：</p><span>{{item.projectTracker}}</span></div>
            <div class="people" v-else><p>引进人：</p><span>{{item.importingPeople}}</span></div>
            <div class="bar"><p>项目进度：</p><span>{{item.rateOfProgress}}</span></div>
          </div>
          <div class="introduction">
            {{item.introduction}}
          </div>
        </div>
      </div>
      <load-more :show-loading="loading" :tip="tip" background-color="#fff"></load-more>
    </div>
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :position="position" style="font-size: 12px" :text="text"></toast>
  </div>
</template>
<script>
import { Icon, LoadMore, Toast, Datetime } from 'vux'
import cookie from '@/utils/cookie'
export default {
  name: 'FlexibleQuery1',
  components: {
    LoadMore,
    Toast,
    Icon,
    Datetime
  },
  data() {
    return {
      showPopup: false,
      loading: true,
      tip: '正在加载',
      text: `<p style='font-size: 1rem'>系统繁忙!</p>`,
      position: 'bottom',
      showPositionValue: false,
      busy: true,
      offset: 0,
      limit: 10,
      introducedYear: '',
      investmentScale: '',
      projectClassification: '',
      type: '',
      firstTalkDateStart: '',
      firstTalkDateEnd: '',
      search: '',
      flexibleData: [],
      queryShow: false,
      projectClassificationData: [
        {
          id: 1,
          name: '管委会招商项目'
        },
        {
          id: 2,
          name: '公司自营载体项目'
        }
      ],
      typeData: [
        {
          id: 1,
          name: '租办公室'
        },
        {
          id: 2,
          name: '买办公室'
        },
        {
          id: 3,
          name: '租厂房'
        },
        {
          id: 4,
          name: '买厂房'
        },
        {
          id: 5,
          name: '购地'
        }
      ],
      investmentScaleData: [
        {
          id: 1,
          name: '5000万以下'
        },
        {
          id: 2,
          name: '5000万以上'
        }
      ],
      endDate: '3000-12-31',
      startDate: '1800-01-01'
    }
  },
  methods: {
    markClick(e) {
      if(e.target.className == 'mark') {
        document.querySelector('.choose').style.transform = "translateX(100%)"
        setTimeout(() => {
          this.queryShow = false
        }, 500);
      }
    },
    // 去项目详情
    toProjectDetail(item){
      cookie.setCookie('itemid', item.id)
      this.$router.push({path: "/ProjectDetails",query:{item:item, from: 'flexible'}})
    },
    show() {
      this.queryShow = true
      setTimeout(() => {
        document.querySelector('.choose').style.transform = "translateX(0)"
      }, 100);
    },
    hide() {
      document.querySelector('.choose').style.transform = "translateX(100%)"
      setTimeout(() => {
        this.queryShow = false
      }, 500);
    },
    initData(flag) {
      this.busy = true
      if(flag == 1) {
        this.offset = 0
        this.flexibleData = []
      }
      let query = {
        introducedYear: this.introducedYear,
        investmentScale: this.investmentScale,
        projectClassification: this.projectClassification,
        type: this.type,
        firstTalkDateStart: this.firstTalkDateStart,
        firstTalkDateEnd: this.firstTalkDateEnd,
        rateOfProgress: this.$route.query.id||'',
        search: this.search,
        offset: this.offset,
        limit: this.limit
      }
      this.$post('/api/category/flexibleQuery', query).then(res =>{
        if(res.rows.length < 10) {
          this.loading = false
          this.tip = '暂无数据'
        } else {
          this.loading = true
          this.tip = '正在加载'
        }
        let arr = JSON.parse(JSON.stringify(this.flexibleData))
        res.rows.forEach(item => {
          switch (item.rateOfProgress) {
            case 1:
              item.rateOfProgress = '新增在谈项目'
              break;
            case 2:
              item.rateOfProgress = '在谈项目'
              break;
            case 3:
              item.rateOfProgress = '在建项目'
              break;
            case 4:
              item.rateOfProgress = '竣工项目'
              break;
            case 5:
              item.rateOfProgress = '停止谈判项目'
              break;
          }
          arr.push(item)
        })
        this.flexibleData = arr
        this.busy = false
      }).catch(err => {
        this.position = 'bottom'
        this.showPositionValue = true
        this.loading = false
        this.tip = '暂无数据'
      })
    },
    backHome() {
      this.$router.push({
        path: '/Home'
      })
    },
    loadMore() {
      this.offset += 10
      this.initData()
    },
    typeChange(id) {
      this.type = id
    },
    projectClassificationChange(id) {
      this.projectClassification = id
    },
    investmentScaleChange(id) {
      this.investmentScale = id
    },
    reset() {
      this.introducedYear = ''
      this.investmentScale = ''
      this.projectClassification = ''
      this.type = ''
      this.firstTalkDateStart = ''
      this.firstTalkDateEnd = ''
    },
    confirm() {
      document.querySelector('.choose').style.transform = "translateX(100%)"
      setTimeout(() => {
        this.queryShow = false
      }, 500);
      this.initData(1)
    }
  },
  mounted() {
    this.initData()
  },
  watch: {
    firstTalkDateStart(val) {
      if(this.firstTalkDateEnd != '' && Number(new Date(val)) > Number(new Date(this.firstTalkDateEnd))) {
        this.firstTalkDateEnd = ''
        this.startDate = val
      } else {
        if(val == '') {
          this.startDate = '1800-01-01'
        } else {
          this.startDate = val
        } 
      }
    },
    firstTalkDateEnd(val) {
      if(this.firstTalkDateStart != '' && Number(new Date(val)) < Number(new Date(this.firstTalkDateStart))) {
        this.firstTalkDateStart = ''
        this.endDate = val
      } else {
        if(val == '') {
          this.endDate = '3000-12-31'
        } else {
          this.endDate = val
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mainContainer {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  touch-action: pan-y;
  .pageTitle {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    text-align: center;
    z-index: 999 ;
    box-shadow: 0 0.2rem 0.25rem rgba(0, 0, 0, .1);
    div {
      text-align: center;
      color: #333;
      font-size: 1.2rem;
      line-height: 3rem;
    }
  }
  .query {
    height: 5rem;
    // position: fixed;
    // top: 3rem;
    // left: 0;
    // right: 0;
    width: 100%;
    padding: 1rem 0.5rem 1rem 3rem;
    box-sizing: border-box;
    // border-top: 0.1rem solid #eee;
    border-bottom: 0.1rem solid #eee;
    background: #fff;
    div {
      float: left;
      height: 3rem;
      width: 80%;
      input {
        line-height: 3rem;
        width: 100%;
        height: 100%;
        background-color: #eee;
        border: 0;
        padding-left: 1rem;
        font-size: 1.2rem;
      }
    }
    span {
      float: left;
      width: 20%;
      line-height: 3rem;
      text-align: center;
      font-size: 1.1rem;
    }
  }
  .mark {
    position: fixed;
    top: 3rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    .choose {
      transition: all 0.5s;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 15%;
      right: 0;
      background-color: #fff;
      border-top: 0.05rem solid #000;
      transform: translateX(100%);
      .chooseBox {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 4rem;
        box-sizing: border-box;
        background-color: #eee;
        .chooseItem {
          margin-bottom: 0.5rem;
          background-color: #fff;
          .itemTitle {
            padding: 0.5rem;
            font-size: 1.2rem;
            border-bottom: 0.05rem solid #eee;
          }
          .itemBody {
            padding: 1rem 0.5rem;
            overflow: hidden;
            .itemOption {
              float: left;
              padding: 0.5rem 2rem;
              background-color: #e5e5e5;
              color: #333;
              margin-right: 1.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
              border-radius: 0.2rem;
            }
            .active {
              background-color: #587bef;
              color: #fff;
            }
          }
        }
      }
      .buttonGroup {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        text-align: center;
        height: 4rem;
        line-height: 4rem;
        box-shadow: 0.2rem -0.3rem 0.5rem #eee;
        font-size: 1.2rem;
        background-color: #fff;
        .close {
          flex: 2;
          border-right: 0.05rem solid #eee;
        }
        .reset {
          flex: 4;
        }
        .confirm {
          flex: 4;
          background-color: #587bef;
          color: #fff;
        }
      }
    }
  }
  .mainContent {
    padding: 3rem 0 4rem;
    .mainItem {
      padding: 1rem;
      border-bottom: 0.05rem solid #eee;
      .title {
        font-size: 1.3rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: #333333;
      }
      >div {
        line-height: 2rem;
        height: 2rem;
        .people {
          float: left;
          font-size: 1rem;
          color: #0b0967;
          font-weight: 700;
          margin-right: 2rem;
          p {
            float: left;
          }
        }
        .bar {
          float: left;
          font-size: 1rem;
          color: #0b0967;
          font-weight: 700;
          p {
            float: left;
          }
        }
      }
      .introduction {
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
