let config = {
  sdk: 'NIM_Web_SDK_v6.1.0',
  // 用户自定义的登录注册地址
  loginUrl: '/webdemo/h5/index.html#/login',
  homeUrl: '/webdemo/h5/index.html#/home',
  
  // 资源路径根目录，为了方便用户部署在二级以上URL路径上
  resourceUrl: 'http://yx-web.nos.netease.com/webdoc/h5',
  // 用户logo地址
  logo: '/webdemo/h5/res/images/pic_login.png',
  // 默认用户头像
  defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
  // 默认普通群头像
  defaultGroupIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-group.png',
  // 默认高级群头像
  defaultAdvancedIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-advanced.png',
  // 系统通知图标
  noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
  // 我的手机图标
  myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
  // 本地消息显示数量，会影响性能
  localMsglimit: 36,
  //是否开启indexDB
  useDb: false,
  //图片路径
  imgUrl: 'http://114.115.157.154:9080/resource'
}

let env = 'dev'
if (process.env.NODE_ENV === 'production'){
  env = 'prod'
}else{
  env = 'dev'
}
let appConfig = {
  // 用户的appkey
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  dev: {
    appkey: "a5b1946c089c3cd759aa5adf761cf32b", 
    postUrl: "https://app.netease.im", 
    apiUrl:"http://192.168.1.33" 
   
  },
  prod: {
    appkey: "a5b1946c089c3cd759aa5adf761cf32b", 
    postUrl: "https://app.netease.im",
    apiUrl: "http://114.115.157.154:9080",
  }
};

config = Object.assign(config, appConfig[env])

export default config
