import Vue from 'vue'
import Router from 'vue-router'
//主页
import Homepage from '../views/home/home.vue';

// 个人中心下的
import Authentication from '../views/MyCenter/authentication';
import FinanceInfo from "../views/MyCenter/financeInfo";
import SetPassword from "../views/MyCenter/setPassword";

//  工具下的
import DownloadSdk from '../views/tools/downloadSdk';

//接单管理下的
import OrdersCpa from '../views/Ad_Manage/ordersCpa';
import AdorderCpa from "../views/Ad_Manage/adOrderCpa"

// 媒体管理下的
import myMedia from "../views/mediaManage/myMedia";
import smartAD from "../views/mediaManage/smartAD";

// 财务下的
import incomeAll from "../views/finance/incomeAll";
import withdrawManage from "../views/finance/withdrawManage"

// 引入store
import store from './store'

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    routes: [
        //首页
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: "/Authentication",
            name: "Authentication",
            component: Authentication
        },
        {
            path: "/DownloadSdk",
            name: "DownloadSdk",
            component: DownloadSdk
        },
        {
            path: "/OrdersCpa",
            name: "OrdersCpa",
            component: OrdersCpa
        },
        {
            path: "/AdorderCpa",
            name: "AdorderCpa",
            component: AdorderCpa
        },
        {
            path: "/myMedia",
            name: "myMedia",
            component: myMedia
        },
        {
            path: "/smartAD",
            name: "smartAD",
            component: smartAD
        },
        {
            path: "/incomeAll",
            name: "incomeAll",
            component: incomeAll
        },
        {
            path: "/withdrawManage",
            name: "withdrawManage",
            component: withdrawManage
        },
        {
            path: "/FinanceInfo",
            name: "FinanceInfo",
            component: FinanceInfo
        },
        {
            path: "/SetPassword",
            name: "SetPassword",
            component: SetPassword
        },
        // 登录页面，用于开发登录
        {
            path: '/login-dev',
            name: 'loginDev',
            component: () => import('@/views/login/login')
        },
        { path: '*', redirect: '/' }
    ],
})