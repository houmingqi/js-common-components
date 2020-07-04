import { log } from 'util';
// 设置cookie 参数为小时
function setCookie(c_name, value, expiredays) {
    //写cookies
    var exdate = new Date();
    exdate.setHours(exdate.getHours() + expiredays);
    var rootUrl = window.location.href;
    var reg = /www\.xmadx\.com/g
    if (!reg.test(rootUrl)) {
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    } else {
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=xmadx.com";
    }
};

// 获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var _dsp_arr = new RegExp("(^| )dsp_token=([^;]*)(;|$)");
    // 检测 dsp的token
    if (arr = document.cookie.match(reg)) {
        return (arr[2] ? arr[2] : _dsp_arr[2]);
    } else {
        return null;
    }
}

// 删除cookie   有问题
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

}

const BaseUrl = (function() {
    let url;
    url = process.env.API_ROOT
    return url;
})();

var outUrl = process.env.address;
// console.log(outUrl)

export {
    setCookie,
    getCookie,
    delCookie,
    BaseUrl,
    outUrl
}