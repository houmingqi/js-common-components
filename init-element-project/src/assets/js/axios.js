import axios from 'axios'
import qs from 'qs'
import { Message, Notification } from "element-ui"
import Vue from 'vue'

import {
    BaseUrl,
    getCookie
} from './common'

// 状态hook 单体模式
var statusHook = {
    200: "接口请求成功",
    202: "数据不存在",
    401: "用户身份需要验证",
    403: "服务器理解请求，拒绝执行",
    404: "客户端页面失踪",
    500: "服务器内部发生意想不到的错误",
    503: "服务器休憩，不能访问"
};

let token = null;

axios.interceptors.request.use(config => {
    config.data.token = getCookie("ssp_token");
    config.data = qs.stringify(config.data);
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    // console.log(response)

    if (response.data.code == "201") {
        // window.location.href = process.env.address + "?loginout=7";

        // window.location.href="http://adxtest.xiaoshentui.net/?loginout=7";//测试

        // window.location.href="http://adx_ssp.xiaoshentui.net/?loginout=7";

        // window.location.href = "http://www.xmadx.com/?loginout=7"//线上
        if (BaseUrl == '/api' || BaseUrl == 'http://adx-api.xiaoshentui.net') {
            window.location.href = "http://adxtest.xiaoshentui.net/?loginout=7";
        } else {
            window.location.href = "http://www.xmadx.com/?loginout=7"
        }

    } else {
        return response.data
    }
}, error => {
    return Promise.resolve(error.response)
});

axios.defaults.timeout = 100000;

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = '/api/';
} else {
  // axios.defaults.baseURL =  "http://adx_api.xiaoshentui.net/"
  axios.defaults.baseURL =  "http://api.xmadx.net/"   //线上地址
  // axios.defaults.baseURL =  "http://adx_api.xiaoshentui.net/"
}

var root = process.env.API_ROOT;

const Axios = function(obj) {
    return new Promise((response, reject) => {
        let method = obj.method || 'post';
        let data = obj.data || ''
        if (obj.url == "https://zhishuapi.aldwx.com/Main/action/Dashboard/Homepage/CommonAd") {
            root = ""
        } else {
            root = process.env.API_ROOT
        }
        axios({
            url:  obj.url,
            method: method,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (!res) return
            if (res.code === 200 || res.code === 202 || !res.code) {
                response(res)
            } else {
                Notification.error({
                    title: res.status || res.code || "发生错误",
                    message: statusHook[500],
                    duration: 2000
                })
            }
        }).catch(err => {
            throw new Error(err);

        })
    })
};

export default Axios;
