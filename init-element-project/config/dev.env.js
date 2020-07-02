// 测试环境

// 合并webpack配置文件
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

// 引入测试环境配置
const testEnv = require('./test.env');

module.exports = merge(prodEnv,testEnv, {
  NODE_ENV: '"development"',

  // 测试环境官网地址
  adress: '"http://adxtest.xiaoshentui.net/"',
  API_ROOT: '"/api"'
});