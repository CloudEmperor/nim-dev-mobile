<template>
  <div class="mainContainer">
    <div class="pageTitle" style="position: fixed;top: 0;left: 0;right: 0;z-index: 99">
      <x-icon
        type="ios-arrow-back"
        size="30"
        style="float: left;line-height: 3rem;height: 100%;"
        @click="back"
      ></x-icon>
      <span>查看图片</span>
    </div>
    <div class="imgBox">
      <img :src="url" alt="" onclick="return false">
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'ViewImg',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    this.url = this.$route.query.url
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
    text-align: center;
    box-shadow: 0 0.2rem 0.25rem rgba(0, 0, 0, 0.1);
    span {
      color: #333;
      font-size: 1.2rem;
      line-height: 3rem;
    }
  }
  .imgBox {
    width: 100%;
    padding-top: 3rem;
    img {
      width: 100%;
    }
  }
}
</style>
