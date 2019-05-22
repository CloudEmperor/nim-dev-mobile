import axios from 'axios';
import config from "../configs";
import cookie from "./cookie";

/**
  * 提示函数
  * 
  */
const tip = msg => {
  alert(msg);
};

/**
  * 跳转登录页
  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  */
const toLogin = () => {
    window.location.href = config.loginUrl;
}

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
  */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
      // 401: 未登录状态，跳转登录页
      case 401:
        toLogin();
        break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
        tip("登录过期，请重新登录");
        setTimeout(() => {
          toLogin();
        }, 1000);
        break;
      // 404请求不存在
      case 404:
        tip("请求的资源不存在");
        break;
      //500
      case 500:
        tip("接口异常");
        break;
      default:
        console.log(other);
    }}
        
// 创建axios实例
 axios.create({
   timeout: 5000
 });
//配置开发和生产环境baseURL
axios.defaults.baseURL = config.apiUrl;
// 设置post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
/**
  * 请求拦截器
  * 每次请求前，如果存在token则在请求头中携带token
  */
axios.interceptors.request.use(
  configs => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    //const appkey = config.appkey;
    const token = cookie.readCookie("token");
    console.log('token', token)
    //configs.headers["appkey"] = appkey;
    if (token) configs.headers["token"] = token;
     return configs;
  },
  error => Promise.error(error)
);

// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      //toLogin();
    }
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export const get =(url,params={}) =>{
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export const post=(url,data = {}) =>{
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const patch=(url,data = {})=>{
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const put=(url,data = {}) =>{
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const del=(url,params={}) =>{
  return new Promise((resolve,reject) => {
    axios.delete(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

