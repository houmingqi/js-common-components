<template>
  <div class="123">
    <div id="header">
      <div class="headerBox">
        <div class="header-left" @click="toIndex">
          <img src="../assets/img/logo1.png" alt />
        </div>
        <div class="header-right">
          <div style="margin-right: 20px" class="badge" @click="downSDK">接入文档</div>
          <div class="msgIconArea">
            <div class="badge notice" @click="showNotice"></div>

            <!-- n条未读未实现 -->
          </div>
          <div
            class="header-userCenter"
            v-on:mouseenter="userCenterover"
            v-on:mouseleave="userCenterout"
          >
            <i class="header-userpic"></i>
            <i class="el-icon-caret-bottom pos"></i>
            <div class="user-layer" v-show="isShow">
              <h5>
                <i class="user-icon"></i>
                <span>hi,{{phone}}</span>
              </h5>
              <div class="header-btn">
                <el-button @click="gocenter">个人中心</el-button>
                <el-button @click="exit">退出登录</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie, delCookie, setCookie, outUrl } from "../assets/js/common";
export default {
  name: "homePage",
  data () {
    return {
      phone: getCookie("ssp_phone"),
      isShow: false,
    };
  },
  methods: {
    userCenterover () {
      this.isShow = true;
    },
    userCenterout () {
      this.isShow = false;
    },
    gocenter () {
      this.$router.push({ name: "Authentication" });
    },
    downSDK () {
      this.$router.push({ path: "/DownloadSdk" });
    },
    // 去首页
    toIndex () {
      window.location.href = outUrl; //线上
    },
    showNotice() {},
    exit () {
      setCookie("ssp_phone", "", -1);
      setCookie("ssp_token", "", -1);
      this.$router.push({path: "/login-dev"});
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/color.less";

.content_Area {
  height: 500px;
  overflow-y: scroll;
}

.noRead {
  color: #999;
  line-height: 500px;
  text-align: center;
}

#header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // z-index: 200;
}

.noticeModel {
  header {
    width: 200px;
  }
}

.headerBox {
  width: 100%;
  height: 50px;
  // min-width: 1280px;
  background: @gary;
  line-height: 50px;
  // position: relative;
}

.modelCollapse {
  /*width: 30%;*/
  span {
    display: inline-block;
    padding: 0 10px;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.msgIconArea {
  position: relative;
  .tipMsg {
    position: absolute;
    width: 135px;
    padding: 5px 10px;
    background: @base;
    color: #fff;
    z-index: 9999;
    right: -47px;
    top: 40px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    &:after {
      position: absolute;
      content: "";
      top: -26px;
      // right: 14px;
      margin: 20px;
      border-right: 1px solid rgba(0, 0, 0, 0.15);
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      width: 10px;
      height: 10px;
      -o-transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      -moz-transform: rotate(-135deg);
      -ms-transform: rotate(-135deg);
      transform: rotate(-135deg);
      background: @base;
    }
    span {
      display: block;
      padding: 0;
      margin: 0;
      height: 20px;
      line-height: 20px;
    }
  }
}

.header-left {
  display: flex;
  float: left;
  height: 50px;
  align-items: center;
  cursor: pointer;
  img {
    margin-left: 20px;
    width: 300px;
  }
}

.header-right {
  position: absolute;
  right: 0;
  display: flex;
  height: 50px;
  align-items: center;
  > div {
    // position: relative;
    display: flex;
    height: 50px;
    align-items: center;
    cursor: pointer;
  }
  .header-userCenter {
    padding: 0 16px;
    margin: 0 10px;
  }
  .badge {
    color: @base;
  }
  .notice {
    width: 12px;
    height: 14px;
    background: url("../assets/img/header-notice.png") no-repeat;
  }
  // .header-help {
  //   width: 14px;
  //   height: 14px;
  //   background: url('../assets/img/header-help.png') no-repeat;
  //   margin-right: 29px;
  // }
  .header-userpic {
    width: 14px;
    height: 16px;
    background: url("../assets/img/header-usercenter.png") no-repeat;
  }
  .pos {
    color: @base;
    margin-left: 5px;
  }
  .user-layer {
    position: absolute;
    width: 178px;
    height: 97px;
    left: -30px;
    top: 35px;
    color: #262626;
    display: flex;
    flex-direction: column;
    background: url("../assets/img/user-center.png") no-repeat;
    z-index: 1000000;
    h5 {
      height: 26px;
      line-height: 26px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #edf1f5;
      margin: 14px 8px 5px 7px;
    }
    .user-icon {
      width: 11px;
      height: 12px;
      margin-right: 5px;
      background: url("../assets/img/user-icon.png") no-repeat;
    }
  }
  .header-btn {
    margin-left: 8px;
  }
}

.el-button {
  font-size: 12px;
  padding: 7px 11px;
}

.notice-date {
  float: right;
  margin-right: 20px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  left: -100%;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(-100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(100%);
}

.drawerArea {
  position: fixed;
  top: 50px;
  left: 160px;
  right: 0;
  bottom: 0;
  z-index: 10000;
}
</style>
