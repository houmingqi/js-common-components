<script>
// 1. 获取指定时间的毫秒数
new Date("时间").getTime();
Date.parse("时间");

// 2. 时间格式化  转换为：yyyy-MM-dd hh:mm:ss格式
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt
      .replace(RegExp.$1, this.getFullYear() + "")
      .substr(4 - RegExp.$1.length);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
// 调用：
var time1 = new Date().Format("yyyy-MM-dd"); //2019-10-12
var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss"); //2010-11-11 11:11:11

// 3. 获取标准年月日
function getLastDate(time) {
  let date = new Date(time);
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "-" + month + "-" + day;
}

// 4: 获取今天0点0分0秒的时间戳
function getTodayUnix() {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}

// 5. 获取今年一月一日0点0分0秒的时间戳
function getYearUnix() {
  let date = new Date();
  date.setMonth(0);
  date.setDate(0);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}

//  6.转化时间（刚刚，1分钟前，5天前）
function getFormatTime(timestamp) {
  let now = new Date().getTime();
  let today = this.getTodayUnix();
  let year = this.getYearUnix();
  // 转化为秒级时间戳
  let timer = (now - timestamp) / 1000;
  let tip = "";
  if (timer <= 0) {
    tip = "刚刚";
  } else if (Math.floor(timer / 60) <= 0) {
    //   一分钟之内
    tip = "刚刚";
  } else if (timer < 3600) {
    //   一小时之内
    tip = Math.floor(timer / 60) + "分钟前";
  } else if (timer >= 3600 && timestamp - today >= 0) {
    //   一小时以上
    tip = Math.floor(timer / 3600) + "小时前";
  } else if (timer / 84600 <= 31) {
    //   一个月内
    tip = Math.ceil(timer / 86400) + "天前";
  } else {
    tip = this.getLastDate(timestamp);
  }
  return tip;
}

// 7. 获取今天星期几中文
function getWeekZh(value) {
  let dateArray = value.split("-");
  let zhWeek =
    "星期" +
    "日一二三四五".charAt(
      new Date(
        dateArray[0],
        parseInt(dateArray[1] - 1),
        dateArray[2].getDay()
      )
    );
  return zhWeek;
}
</script>