// 一：思路：将时间写到localStorage中，打开页面时，去localStorage中取。

<template>
  <div @click="getCode">
    <button v-if="flag">获取短信</button>
    <button v-if="!flag">剩余{{second}}s</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 60,
      flag: true,
      timer: null
    };
  },
  methods: {
    getCode() {
      let that = this;
      if (that.flag) {
        that.flag = false;
        let interval = window.setInterval(function() {
          that.setStorage(that.second);
          if (that.second-- <= 0) {
            that.second = 60;
            that.flag = true;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    },
    // 将显示的倒计时秒数和当前时间(毫秒数)存入localStorage中
    setStorage(param) {
      localStorage.setItem("delay", param);
      localStorage.setItem("_time", new Date().getTime());
    },
    getStorage() {
      let localDelay = {};
      localDelay.delay = localStorage.getItem("delay");
      localDelay.sec = localStorage.getItem("_time");
      return localDelay;
    },
    // 防止页面刷新是验证码失效
    judgeCode() {
      let that = this;
      let localDelay = that.getStorage();
      // 浏览器刷新的延迟秒数
      let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
      if (secTime > localDelay.delay) {
        that.flag = true;
        console.log("已过期");
      } else {
        that.flag = false;
        // 刷新之后页面倒计时应该显示的秒数
        let _delay = localDelay.delay - secTime;
        that.second = _delay;
        that.timer = setInterval(function() {
          if (_delay > 1) {
            _delay--;
            that.setStorage(_delay);
            that.second = _delay;
            that.flag = false;
          } else {
            that.flag = true;
            window.clearInterval(that.timer);
          }
        }, 1000);
      }
    }
  },
  mounted() {
    this.judgeCode();
  }
};
</script>