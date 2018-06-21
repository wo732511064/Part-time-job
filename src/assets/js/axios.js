import axios from 'axios';
import qs from 'qs'
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://jz.bellairehc.com/index.php';

//http request 拦截器
axios.interceptors.request.use(
  config => {
   
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded',
      
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
//axios.interceptors.response.use(
//response => {
//  if(response.data.errCode ==2){
//    router.push({
//      path:"/login",
//      querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//    })
//  }
//  return response;
//},
//error => {
//  return Promise.reject(error)
//}
//)

axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        console.log('开始请求')
        console.log(`请求地址: ${config.url}`)
        return config
      }, function (error) {
        // Do something with request error
        console.log('请求失败')
        return Promise.reject(error)
      })
      axios.interceptors.response.use(function (config) {
        // Do something before request is sent
        console.log('接收响应')
        return config
      }, function (error) {
        // Do something with request error
        console.log('响应出错')
        return Promise.reject(error)
      })


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response);
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

 export function post(url,data={}){
 	 console.log(data)
   return new Promise((resolve,reject) => {
   	 console.log(data)
     axios.post(url,data)
          .then(response => {
          	console.log(data)
            resolve(response);
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

export function patch(url,data = {}){
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

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}