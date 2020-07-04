// 发布环境

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

// 引入test环境配置
const testEnv = require('./test.env');

module.exports = merge(prodEnv,testEnv, {
  NODE_ENV: '"production"',
  // 测试环境官网地址
  address: '"http://www.xmadx.com"',
  // 线上API
  API_ROOT: '"https://api.xmadx.net"'
})
