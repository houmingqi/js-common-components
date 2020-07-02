import Vue from "vue"
import router from '@/router'
import store from './store'
import {getCookie} from "../assets/js/common";

router.beforeEach((to, from, next) => {
  // 判断页面有没有token没有token统一返回login页面
  Vue.nextTick(() => {
    if(getCookie("ssp_token") && to.path !== "/login-dev") {
      store.commit('increment')
    } else {
      if (to.path === "/login-dev") {
        next();
        return;
      }
      // 进入登录页面
      store.commit('increment',false);
      router.push({
        path: "/login-dev"
      })
    }

      if(to.path == '/NewMedia'){
        window.onbeforeunload=function(e){
          　　var e = window.event||e;
          　　e.returnValue=("确定离开当前页面吗？");
          }
      }else{
        window.onbeforeunload = null;
      }
    next()
  })
});

