// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import './assets/css/index.css'

import ElementUI from 'element-ui'
import './assets/css/element.sass'
import './assets/css/mod-element.less'
import '@/assets/css/common.less'

// 引入iconfont
import '@/assets/font/iconfont.less'

import echarts from 'echarts'
import axios from './assets/js/axios.js'

// 导入store
import store from "@/router/store"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts);
Vue.prototype.axios = axios;
Vue.use(Vuex);

import { getCookie } from "./assets/js/common";

router.beforeEach((to, from, next) => {
    let cookie = getCookie('ssp_token');
    if(to.path.startsWith('/login-dev')) {
        if(!cookie) {
            store.commit('increment', false);
            next();
        }else {
            next({ path: '/' });
        }
    } else {
        if(!cookie) {
            store.commit('increment', false);
            next({ path: '/login-dev' })
        }else {
            store.commit('increment', true);
            next();
        }
    }
})


window.store = store

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})