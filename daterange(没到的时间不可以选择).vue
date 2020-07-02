<template>
  <div>
    <div class="date daterange" v-show="showDate">
      <el-date-picker
        v-model="value1"
        :picker-options="mediaPickerOptions"
        ref="daterange"
        value-format="yyyy/MM/dd"
        type="daterange"
        @focus="datefocus"
        size="small"
        @change="dateChange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="date monthrange" v-show="!showDate">
      <el-date-picker
        v-model="value2"
        :picker-options="mediaPickerOptions"
        ref="monthrange"
        value-format="yyyy/MM/dd"
        size="small"
        type="monthrange"
        @change="monthChange"
        range-separator="~"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      ></el-date-picker>
    </div>
  </div>

  <!-- 父组件调用 -->
   <!-- <range-date v-model="timeValue" @dataChange="timeChange"></range-date> -->
</template>
<script>
let getClassNameEl = (className, index) => {
  return document.getElementsByClassName(className)[index];
};
export default {
  model: {
    prop: "rangeDate",
    event: "change"
  },
  props: {
    rangeDate: Array | String
  },
  data() {
    return {
      value1: "",
      value2: "",
      showDate: true,
      mediaPickerOptions: {
        disabledDate(time) {
          //大于今天的不可以选
          return time.getTime() > Date.now();
        }
      }
    };
  },
  watch: {
    rangeDate(val) {
      this.value1 = val;
      this.value2 = "";
      this.showDate = true;
    }
  },
  created() {
    this.value1 = this.rangeDate;
  },
  methods: {
    datefocus(component) {
      let _this = this;
      let fatherEl = document.getElementsByClassName("el-picker-panel")[0];
      if (fatherEl) {
        fatherEl.classList.remove("el-zoom-in-top-leave-active");
        fatherEl.classList.remove("el-zoom-in-top-leave-to");
        fatherEl.classList.add(
          "el-zoom-in-top-enter-active",
          "el-zoom-in-top-enter-to"
        );
      }
      let headerEl = getClassNameEl("el-date-range-picker__header", 0);
      let headerEl2 = getClassNameEl("el-date-range-picker__header", 1);
      if (headerEl) {
        let monthText = headerEl.getElementsByTagName("div")[0];
        let monthText2 = headerEl2.getElementsByTagName("div")[0];
        let isDateRange = monthText.innerHTML.indexOf("月") > 0;
        if (isDateRange) {
          monthText.style.cursor = "pointer";
          monthText.style.color = "#ff7300";
          monthText2.style.cursor = "pointer";
          monthText2.style.color = "#ff7300";
          // 点击月份
          monthText.onclick = function(e) {
            _this.showDate = false;
            fatherEl.classList.add(
              "el-zoom-in-top-leave-active",
              "el-zoom-in-top-leave-to"
            );
            _this.$refs.monthrange.focus();
            monthText.style.color = "#606266";
          };
          monthText2.onclick = function(e) {
            _this.showDate = false;
            fatherEl.classList.add(
              "el-zoom-in-top-leave-active",
              "el-zoom-in-top-leave-to"
            );
            _this.$refs.monthrange.focus();
            monthText2.style.color = "#606266";
          };
        }
      }
    },
    dateChange() {
      this.$emit("change", this.value1);
      this.$emit("dataChange");
    },
    monthChange(val) {
      // 选中的日期
      let [year, month, day] = val[1].split(["/"]);
      // 当前日期
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + 1;

      let lastDay, newLastDay;
      if (month < nowMonth) {
        // 选择的日期小于当前月份
        lastDay = new Date(year, month, 0).getDate();
        lastDay = lastDay < 10 ? "0" + lastDay : lastDay;
        newLastDay = `${year}/${month}/${lastDay}`;
      } else {
        lastDay = nowDate.getDate();
        lastDay = lastDay < 10 ? "0" + lastDay : lastDay;
        newLastDay = `${nowYear}/${nowMonth}/${lastDay}`;
      }
      val[1] = newLastDay;
      this.$emit("change", this.value2);
      this.$emit("dataChange");
      this.showDate = true;
    },

    // setDate(n) {
    //   this.timeDefaultValue = new Date().getMonth() - 1;
    //   let d = new Date();
    //   let year = d.getFullYear();
    //   let mon = d.getMonth() + 1;
    //   let day = new Date(d.getTime()- 24*60*60*1000);
    //   let newDay = day.getDate()
    //   let nowData = `${year}/${mon}/${newDay}`;
    //   if (day <= n) {
    //     if (mon > 1) {
    //       mon = mon - 1;
    //     } else {
    //       year = year - 1;
    //       mon = 12;
    //     }
    //   }
    //   d.setDate(d.getDate() - n);
    //   year = d.getFullYear();
    //   mon = d.getMonth() + 1;
    //   day = d.getDate();
    //   let s =
    //     year +
    //     "/" +
    //     (mon < 10 ? "0" + mon : mon) +
    //     "/" +
    //     (day < 10 ? "0" + day : day);
    //   this.timeValue = [s, nowData];
    // },
  },
  // mounted() {
  //   this.setDate(7);
  // }
};
</script>
<style lang='less' scoped>
.date {
  display: inline-block;
}
.monthText {
  cursor: pointer;
  color: #ff7300;
}
</style>