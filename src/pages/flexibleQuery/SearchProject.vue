<template>
  <div class="mainContainer" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="1">
    <div class="pageTitle" style="position: fixed;top: 0;left: 0;right: 0;">
      <x-icon type="ios-arrow-back" size="30" style="float: left;line-height: 3rem;height: 100%;" @click="back"></x-icon>
      <input type="text" v-model="search" placeholder="搜索..." autofocus>
      <x-icon type="ios-search" size="25" style="float: right;line-height: 3rem;height: 100%;margin-right: 0.5rem;" @click="initData(1)"></x-icon>
    </div>
    <div class="mainContent">
      <div class="mainBox">
        <div class="mainItem" v-for="(item, i) in flexibleData" :key="i" @click="toProjectDetail(item)">
          <div class="title">{{item.title}}</div>
          <div>
            <div class="people" v-if="item.projectClassification != 2"><p>跟踪人：</p><span>{{item.projectTracker}}</span></div>
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
import { Icon, LoadMore, Toast } from 'vux'
import cookie from '@/utils/cookie'
export default {
  name: 'SearchProject',
  components: {
    LoadMore,
    Toast
  },
  data() {
    return {
      loading: true,
      tip: '正在加载',
      text: `<p style='font-size: 1rem'>系统繁忙!</p>`,
      position: 'bottom',
      showPositionValue: false,
      busy: true,
      offset: 0,
      limit: 10,
      search: '',
      flexibleData: []
    }
  },
  methods: {
    // 去项目详情
    toProjectDetail(item){
      cookie.setCookie('itemid', item.id)
      this.$router.push({path: "/ProjectDetails",query:{item:item, from: 'search'}})
    },
    initData(flag) {
      this.busy = true
      if(flag == 1) {
        this.offset = 0
        this.flexibleData = []
      }
      let query = {
        introducedYear: '',
        investmentScale: '',
        projectClassification: '',
        type: '',
        firstTalkDateStart: '',
        firstTalkDateEnd: '',
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
    back() {
      window.history.back(-1);
    },
    loadMore() {
      this.offset += 10
      this.initData(2)
    }
  },
  mounted() {
    this.initData(2)
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
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
    input {
      line-height: 2rem;
      box-sizing: border-box;
      margin-top: 0.5rem;
      margin-left: 2%;
      width: 80%;
      border: 0;
      font-size: 1.2rem;
    }
  }
  .mainContent {
    padding: 3rem 0;
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
