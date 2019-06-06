<template>
  <div
    class="mainContainer"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="busy"
    infinite-scroll-distance="1"
  >
    <div class="pageTitle" style="position: fixed;top: 0;left: 0;right: 0;z-index: 99">
      <x-icon
        type="ios-arrow-back"
        size="30"
        style="float: left;line-height: 3rem;height: 100%;"
        @click="backHome"
      ></x-icon>
      <span>项目动态</span>
    </div>
    <tab
      :line-width="0"
      custom-bar-width="60px"
      bar-active-color="#333"
      style="position: fixed;top: 3rem;left: 0;right: 0;z-index: 99; height: 3rem; box-shadow: 0 0.2rem 0.25rem rgba(0, 0, 0, .1)"
    >
      <tab-item selected @on-item-click="onItemClick">{{tittle}}</tab-item>
      <tab-item @on-item-click="onItemClick">{{tittle1}}</tab-item>
      <tab-item @on-item-click="onItemClick">{{tittle2}}</tab-item>
      <tab-item @on-item-click="onItemClick">{{tittle3}}</tab-item>
    </tab>
    <transition name="mybox">
      <div class="myprojects-tost" v-show="condition">
        <!-- 引进年份 -->
        <ul>
          <li
            v-for="(item, index) in yesr"
            :key="index"
            @click="changeyesr(item)"
            :class="{active: item.id == investmentScale}"
          >{{item.name}}</li>
        </ul>
      </div>
    </transition>
    <transition name="mybox">
      <div class="myprojects-tost" v-show="condition1">
        <!-- 项目类型 -->
        <ul>
          <li
            v-for="(item, index) in types"
            :key="index"
            @click="changetypes(item)"
            :class="{active: item.id == type}"
          >{{item.name}}</li>
        </ul>
      </div>
    </transition>
    <transition name="mybox">
      <div class="myprojects-tost" v-show="condition2">
        <!-- 项目状态 -->
        <ul>
          <li
            v-for="(item, index) in status"
            :key="index"
            @click="changestatus(item)"
            :class="{active: item.id == rateOfProgress}"
          >{{item.name}}</li>
        </ul>
      </div>
    </transition>
    <transition name="mybox">
      <div class="myprojects-tost" v-show="condition3">
        <!-- 更新时间 -->
        <ul>
          <li
            v-for="(item, index) in times"
            :key="index"
            @click="changetimes(item)"
            :class="{active: item.id == modifyTime}"
          >{{item.name}}</li>
        </ul>
      </div>
    </transition>
    <div style="padding-top: 6.25rem;">
      <div class="mainContent1">
        <div class="contentItem" v-for="(item, index) in dynamicData" :key="index" @click="toEventDetail(item)">
          <img src="/webdemo/h5/res/images/iocn_xmdttt.png">
          <div>
            <h3>{{item.categoryTitle}}</h3>
            <div v-html="item.content"></div>
            <div>
              <a
                v-for="(item1, index1) in item.images.split(',')"
                :key="index1"
                @click.stop="toViewImg(`${imgUrl + item1}`)"
              >
                <img :src="`${imgUrl + item1}`">
              </a>
            </div>
            <div>
              <span>{{item.modifyTime}}</span>
              <span>{{item.addUserName}}</span>
            </div>
          </div>
        </div>
        <load-more :show-loading="loading" :tip="tip" background-color="#fff"></load-more>
      </div>
      <toast
        v-model="showPositionValue"
        type="text"
        :time="1000"
        is-show-mask
        :position="position"
        :text="text"
      ></toast>
    </div>
    <div class="imgMask" @click.stop="hideMask">
      <img :src="url" alt="">
    </div>
  </div>
</template>
<script>
import { Icon, LoadMore, Toast, Tab, TabItem } from "vux";
import cookie from "@/utils/cookie";
import config from "@/configs";
export default {
  name: "Dynamic",
  components: {
    LoadMore,
    Toast,
    Icon,
    Tab,
    TabItem
  },
  data() {
    return {
      tittle: "投资规模",
      tittle1: "项目类型",
      tittle2: "完成进度",
      tittle3: "更新时间",
      busy: true,
      loading: true,
      tip: "正在加载",
      offset: 0,
      limit: 10,
      position: "default",
      showPositionValue: false,
      text: `<p style='font-size: 1rem'>系统繁忙!</p>`,
      dynamicData: [],
      imgUrl: config.imgUrl,
      investmentScale: "",
      type: "",
      rateOfProgress: "",
      modifyTime: "",
      condition: false,
      condition1: false,
      condition2: false,
      condition3: false,
      yesr: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "5000万以下"
        },
        {
          id: 2,
          name: "5000万以上"
        }
      ],
      types: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "租办公室"
        },
        {
          id: 2,
          name: "买办公室"
        },
        {
          id: 3,
          name: "租厂房"
        },
        {
          id: 4,
          name: "买厂房"
        },
        {
          id: 5,
          name: "购地"
        }
      ],
      status: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "新增在谈项目（1个月内）"
        },
        {
          id: 2,
          name: "在谈项目"
        },
        {
          id: 3,
          name: "在建项目"
        },
        {
          id: 4,
          name: "竣工项目"
        },
        {
          id: 5,
          name: "停止谈判项目"
        }
      ],
      times: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 3,
          name: "三天以内"
        },
        {
          id: 7,
          name: "一周以内"
        },
        {
          id: 30,
          name: "一个月内"
        }
      ],
      url: '',
      animateFlag: true,
      isNotfirst: false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 去事件详情
    toEventDetail(items) { 
      cookie.setCookie('itemsid',items.id)
      this.$router.push({ path: "/EventDetails", query:{from: 'dynamic'}})
    },
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
    initData(flag) {
      this.busy = true;
      if (flag == 1) {
        this.offset = 0;
        this.dynamicData = [];
      }
      let query = {
        investmentScale: this.investmentScale,
        type: this.type,
        rateOfProgress: this.rateOfProgress,
        modifyTime: this.modifyTime,
        offset: this.offset,
        limit: this.limit
      };
      this.$post("/api/event/dynamicList", query).then(res => {
        if (res.rows.length < 10) {
          this.loading = false;
          this.tip = "暂无数据";
        } else {
          this.loading = true;
          this.tip = "正在加载";
        }
        let arr = JSON.parse(JSON.stringify(this.dynamicData));
        res.rows.forEach(item => {
          arr.push(item);
        });
        this.dynamicData = arr;
        this.busy = false;
        this.isNotfirst = true
      }).catch(err => {
        this.position = "bottom";
        this.showPositionValue = true;
        this.loading = false;
        this.tip = "暂无数据";
      });
    },
    closeItem() {
      this.condition = false;
      this.condition1 = false;
      this.condition2 = false;
      this.condition3 = false;
    },
    changeyesr(val) {
      if (!val.id) {
        this.tittle = "投资规模";
      } else {
        this.tittle = val.name;
      }
      this.investmentScale = val.id;
      this.closeItem();
      this.initData(1);
    },
    changetypes(val) {
      if (!val.id) {
        this.tittle1 = "项目类型";
      } else {
        this.tittle1 = val.name;
      }
      this.type = val.id;
      this.closeItem();
      this.initData(1);
    },
    changestatus(val) {
      if (!val.id) {
        this.tittle2 = "完成进度";
      } else {
        this.tittle2 = val.name;
      }
      this.rateOfProgress = val.id;
      this.closeItem();
      this.initData(1);
    },
    changetimes(val) {
      if (!val.id) {
        this.tittle3 = "更新时间";
      } else {
        this.tittle3 = val.name;
      }
      this.modifyTime = val.id;
      this.closeItem();
      this.initData(1);
    },
    backHome() {
      this.$router.push({
        path: "/Home"
      });
    },
    loadMore() {
      if(this.isNotfirst) {
        this.offset += 10;
        this.initData();
      }
    },
    onItemClick(index) {
      if (index == 0) {
        this.condition = !this.condition;
        this.condition1 = false;
        this.condition2 = false;
        this.condition3 = false;
      } else if (index == 1) {
        this.condition1 = !this.condition1;
        this.condition = false;
        this.condition2 = false;
        this.condition3 = false;
      } else if (index == 2) {
        this.condition2 = !this.condition2;
        this.condition = false;
        this.condition1 = false;
        this.condition3 = false;
      } else if (index == 3) {
        this.condition3 = !this.condition3;
        this.condition = false;
        this.condition1 = false;
        this.condition2 = false;
      }
      this.index = index;
    }
  }
};
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
    text-align: center;
    // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    span {
      color: #333;
      font-size: 1.2rem;
      line-height: 3rem;
    }
  }
  .myprojects-tost {
    width: 100%;
    position: absolute;
    top: 6rem;
    left: 0;
    z-index: 99;
    ul {
      background-color: #fff;
      li {
        list-style: none;
        padding: 0.5rem 0.5rem;
        border-bottom: 1px solid #f7f4f4;
        color: #666;
      }
    }
    .active {
      background-color: deepskyblue;
      color: #fff;
    }
  }
  .mybox-leave-active,
  .mybox-enter-active {
    transition: all 0.3s ease;
  }
  .mybox-leave-active,
  .mybox-enter {
    opacity: 0 !important;
  }
  .mybox-leave,
  .mybox-enter-active {
    opacity: 500;
  }
  .mainContent1 {
    padding: 0.5rem;
    padding-top: 0;
    background-color: #fff;
    > .contentItem {
      position: relative;
      border-bottom: 0.1rem solid #ededed;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      > img {
        position: absolute;
        top: 0.6rem;
        left: 0;
        width: 2rem;
      }
      > div {
        padding-left: 2.4rem;
        h3 {
          height: 2rem;
          color: #3a3980;
          text-align: left;
          font-weight: 700;
        }
        > div:first-of-type {
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 1rem;
        }
        > div {
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
