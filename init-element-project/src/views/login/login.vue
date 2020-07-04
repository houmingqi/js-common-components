<template>
  <div class="login">
    <div class="login-box">
      <h5>登录</h5>
      <div class="user-name mask-inp">
        <label>用户名：</label>
        <el-input aria-placeholder="请输入用户名" v-model="userName"></el-input>
      </div>
      <div class="user-pass mask-inp">
        <label>密码：</label>
        <el-input aria-placeholder="请输入密码" v-model="userPass" @keydown.13="login" type="password"></el-input>
      </div>
      <div class="login-btn">
        <el-button type="primary" id="login-btn" @click="login">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosPost, setCookie } from '../../assets/js/common'
export default {

  data () {
    return {
      userName: '',
      userPass: '',
    };
  },
  mounted () {

  },
  methods: {
    login () {
      const _this = this;
      this.axios({
        url: "/Main/action/Login_reg/Login/login",
        data: {
          phone: _this.userName,
          password: _this.userPass,
          platform: 7
        }
      }).then(res => {
        if (res.code === 200) {
          setCookie("ssp_phone", _this.userName, 12);
          this.$nextTick(() => {
            setCookie("ssp_token", res["data"].token, 12);
          });
          _this.$router.push('/');
        } else if (res.code == 202) {
          _this.$message.error(res.msg)
        }
      });
    }
  }

};
</script>

<style scoped>
.login-box {
  width: 300px;
  height: 300px;
  padding: 40px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.login-box h5 {
  line-height: 50px;
  text-align: center;
  font-size: 18px;
}
.user-name label,
.user-pass label {
  display: inline-block;
  width: 50px;
  text-align: left;
}
.user-name {
  padding: 20px 0;
}
.user-pass {
  margin-bottom: 40px;
}
.login-btn {
  text-align: center;
}
</style>
