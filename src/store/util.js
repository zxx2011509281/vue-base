import axios from 'axios';
axios.defaults.withCredentials=true;
// axios.defaults.xsrfCookieName = "BBTREE_ERP_SHARE_JSESSIONID";

export function getAxios(commit, url, data = {}, callFn) {

  return axios.get(url, {params: data}).then(function (rep) {

    if (rep.data.code === "000") {
      if (callFn) {
        callFn(rep.data.data)
      }
    }
  }).catch(function () {

  })
}

export function postAxios(commit, url, data = {}, callFn) {
  //commit("changStatus", true)
  return axios.post(url, data)
    .then(function (rep) {
     // commit("changStatus", false)
      if (rep.data.code === "000") {
        if (callFn) {
          return callFn(rep.data.data)
        }
      }
    })
    .catch(function (error) {
     // console.log(error);
    });
}


var mobilesSystemObj = null;
function getMobilesSystemObj(){
  if(null=== mobilesSystemObj){
    var u = navigator.userAgent, app = navigator.appVersion;
    var nativeVersionsObj = {
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1 //是否iPad
    };
    mobilesSystemObj = {
      isIos : nativeVersionsObj.ios || nativeVersionsObj.iPhone || nativeVersionsObj.iPad,
      isAndroid : nativeVersionsObj.android
    }
  }
  return mobilesSystemObj
}

export const isIos = getMobilesSystemObj().isIos
export const isAndroid = getMobilesSystemObj().isAndroid
