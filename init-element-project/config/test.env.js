// 发布环境

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = {
    NODE_ENV: '"test"',

    // 测试环境官网地址
    address: '"http://adxtest.xiaoshentui.net/"',
    // 测试API
    API_ROOT: '"http://adx-api.xiaoshentui.net"'
}