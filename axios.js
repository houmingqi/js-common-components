import axios from 'axios';
// qs: 序列化字符串的
import qs from 'qs';
import { Message, Notification } from 'element-ui';

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

// 请求拦截器  登录拦截
axios.interceptors.request.use(config => {
    // 将token保存在cookie中了
    config.data.token = getCookie("ssp_token");
    config.data = qs.stringify(config.data);
    return config;
},err => {
    return Promise.reject(err);
}),

// 响应拦截器
axios.interceptors.response.use(response => {
    if(response.data.code == "201") {
        if(BaseUrl == '/api' || BaseUrl == 'http://adx-api.xiaoshentui.net') {
            // 测试环境
            window.location.href = "http://adxtest.xiaoshentui.net/?loginout=7";
        }else {
            window.location.href = "http://www.xmadx.com/?loginout=7";
        }
    }
})

axios.defaults.timeout = 100000;

// dev.env.js中设置的接口地址
var root = process.env.API_ROOT;

const Axios = function (obj) {
    return new Promise((response, reject) => {
        let method = obj.method || 'post';
        let data = obj.data || '';
        if (obj.url == "https://zhishuapi.aldwx.com/Main/action/Dashboard/Homepage/CommonAd") {
            root = '';
        } else {
            root = process.env.API_ROOT;
        }
        axios({
            url: root + obj.url,
            method: method,
            data: data,
            headers: {
                'X-Request-With': "XMLHttpRequest",
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res => {
            if (!res) return
            if (res.code === 200 || res.code === 202 || !res.code) {
                response(res);
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
}

export default Axios;