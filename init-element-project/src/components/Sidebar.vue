<template>
  <div id="sidebar" ref="sideBar">
    <div class="inner-container">
      <el-menu :default-active="$route.path" :router="true">
        <el-menu-item id="side-home" index="/">
          <i class="home-side-loc"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="sliderIcon hot" style="width: 20px"></i>
            <span>接单管理</span>
          </template>
          <el-menu-item-group>
            <!--NeworderCpa-->
            <el-menu-item index="/OrdersCpa">快速接单</el-menu-item>
            <el-menu-item style="padding-left: 40px" index="/AdorderCpa">广告订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="sliderIcon loc1"></i>
            <span>媒体管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/myMedia">我的媒体</el-menu-item>
            <el-menu-item index="/smartAD">智投广告</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="sliderIcon loc2"></i>
            <span>财务</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/incomeAll">收益数据</el-menu-item>
            <el-menu-item index="/withdrawManage">提现管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-goods loc4"></i>
            <span>工具</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/DownloadSdk">接入文档</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="sliderIcon loc3"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Authentication">账户资料</el-menu-item>
            <el-menu-item index="/FinanceInfo">财务信息</el-menu-item>
            <el-menu-item index="/SetPassword">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("../assets/css/color.less");

.el-icon-files {
  color: white;
}
.inner-container {
  overflow-x: hidden;
  // overflow-y: auto;
  width: 170px;
  height: 100%;
}

.inner-container::-webkit-scrollbar {
  display: none;
}

#sidebar {
  width: 170px;
  height: calc(100vh - 50px);
  background: #364051;
}

#side-home {
  height: 46px;
  font-size: 14px;
  color: #fff;
  line-height: 46px;
  padding-left: 17px;
  border-left: none;
  cursor: pointer;
}

#side-home.is-active {
  color: @base;
  border-left: 2px solid @base;
  background-color: #2b3341;
}

.home-side-loc {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url("../assets/img/WechatIMG55.png") no-repeat;
  margin-right: 8px;
}

.sliderIcon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 8px;
}
.hot {
  background: url("../assets/img/icon-hot.gif") center center no-repeat;
  background-size: 100% 100%;
  margin-left: -6px;
}
.loc1 {
  background: url("../assets/img/sidebar1.png") center center no-repeat;
}

.active {
  background: url("../assets/img/WechatIMG55.png") no-repeat;
  background-position: -14px 0;
}

.loc2 {
  background: url("../assets/img/sidebar4.png") center center no-repeat;
}

.activeloc2 {
  background: url("../assets/img/WechatIMG55.png") no-repeat;
  background-position: -42px 0;
}

.loc3 {
  background: url("../assets/img/mycenter1.png") center center no-repeat;
  background-size: 100%;
}
.loc4 {
  width: 14px !important;
  height: 14px;
  font-size: 16px !important;
  color: rgba(230, 231, 233, 0.9);
  margin-right: 8px !important;
}
.activeloc3 {
  background: url("../assets/img/mycenter2.png") no-repeat;
  background-size: 100%;
}

.homeIcon {
  background: url("../assets/img/WechatIMG55.png") no-repeat;
}

#sidebar a {
  color: #262626;
  font-size: 12px;
}

.activeColor {
  color: @base;
}
</style>
<style>
.el-menu-item {
  padding-left: -35px !important;
}
.el-submenu__title {
  padding-left: 25px !important;
}
</style>
