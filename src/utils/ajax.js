import {ToastAndroid as Toast} from 'react-native';
import axios from 'axios';
// import Toast from "react-native-root-toast";
// import qs from "qs";

// import config from "../Config";
import Global from '../Global';
import ViewUtil from './ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';

import {getConfigLS} from '../utils/Storage';

// import {log} from './Logger';

class ajax extends Object {
  static axiosInstance = null;
}

function setAxiosInstance(url, timeout) {
  ajax.axiosInstance = axios.create({
    timeout: timeout,
    async: false,
    // Config中配置的后台地址
    // 传入的 url 如果不是全地址，则会自动将 baseURL 拼装在 URL 前端
    // 如需指向非 baseURL 的地址，则在发起请求的地方拼接全地址即可
    baseURL: url, // config.getBaseURL()
  });
}

// 临时，从本地存储取后台访问地址
getConfigLS().then(config => {
  // console.log("config in ajax:", config);
  if (config) {
    // paresInt 第二个参数在 eslint 里必填（2、8、10、16，分别对应二进制、八进制、十进制、十六进制）
    setAxiosInstance(config.host, parseInt(config.hostTimeout, 10));
  }
});

/**
 * 发送请求
 * @param {*} url
 * @param {*} params
 * @param {*} extendAxiosOption
 */
function send(url, params, extendAxiosOption) {
  // console.log(`url:${url}`, `params:${params}`, `extendAxiosOption:${extendAxiosOption}`);
  const defaultOptions = {
    responseType: 'json',
  };
  let options = Object.assign(defaultOptions, extendAxiosOption);
  // console.log("1 >>>> ", options);
  options.url = url;
  // 绑定用户token
  // console.log("Global token in ajax:", Global.token);
  options.headers = Object.assign(
    {
      'X-AUTH-TOKEN': Global.token,
    },
    options.headers || {},
  );
  // console.log("2 >>>> ", options);
  return new Promise((resolve, reject) => {
    ajax.axiosInstance
      .request(options)
      .then(function (response) {
        // log.debug('ajax > send() response : ', response);
        // console.log("3 >>>> response:", response);
        let data = response.data;
        if (data.success) {
          // 成功的访问，返回正常数据
          resolve(data);
        } else {
          reject(data);
          // 成功的访问，但出现逻辑异常
          if (data.code === 402) {
            Toast.showWithGravity(
              '登陆过期，请重新登录。',
              Toast.SHORT,
              Toast.CENTER,
            );
            NavigationUtil.navigate('LoginPage');
          }
        }
      })
      .catch(function (error) {
        // 失败的访问，网络或者接口参数异常
        // console.log("--- ajax error ---", error, error.response);
        if (error && error.response) {
          ViewUtil.toast(error.response.errorMsg || '网络错误');
        }
        let exception = {};
        if (error.message.indexOf('400') >= 0) {
          exception.code = 400;
          exception.errorMsg = '请求错误';
        } else if (error.message.indexOf('403') >= 0) {
          exception.code = 403;
          exception.errorMsg = '拒绝访问';
        } else if (error.message.indexOf('404') >= 0) {
          exception.code = 404;
          exception.errorMsg = '请求地址错误';
        } else if (error.message.indexOf('415') >= 0) {
          exception.code = 415;
          exception.errorMsg = '请求参数异常';
        } else if (error.message.indexOf('504') >= 0) {
          exception.code = 504;
          exception.errorMsg = '网关超时';
        } else {
          exception.code = 404;
          exception.errorMsg = '网络超时';
        }
        reject({
          ...exception,
          axiosInstance: ajax.axiosInstance,
          options: options,
        });
      })
      .finally(() => {
        // console.log("send finally...");
      });
  });
}

/**
 * get 请求
 * @param {*} url
 * @param {*} params
 */
function get(url, params) {
  // console.log(`url:${url}`, `params:${params}`);
  const option = {
    method: 'get',
    params: params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return send(url, params, option);
}

/**
 * put 请求
 * @param {*} url
 * @param {*} params
 */
function put(url, params) {
  const option = {
    method: 'put',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return send(url, params, option);
}

/**
 * delete 请求
 * @param {}} url
 * @param {*} params
 */
function del(url, params) {
  const option = {
    method: 'delete',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return send(url, params, option);
}

/**
 * post 请求
 * @param {}} url
 * @param {*} params
 */
function post(url, params) {
  const option = {
    method: 'post',
    data: JSON.stringify(params), //qs.stringify(params), //
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return send(url, params, option);
}

/**
 * 处理公用异常
 * @param {*} e
 */
function handleRequestException(e) {
  if (e.status) {
    // 非授权相关错误，直接提示。授权错误可能涉及到已经渲染的场景里会做特殊处理，所以放给业务开发者自己处理
    if (e.status !== 401 && e.status !== 403) {
      console.log(e);
      ViewUtil.toast(e.msg);
    }
  } else {
    console.log(e);
    ViewUtil.toast('处理请求出错');
  }
}

/**
 * 导出可供调用的对象
 */
export default {
  get,
  post,
  del,
  put,
  handleRequestException,
  setAxiosInstance,
};
