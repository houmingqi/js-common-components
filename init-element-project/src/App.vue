<template>
  <div id="app">
    <div class="header" ref="head">
      <vheader v-if="$store.state.isShowFrame"></vheader>
    </div>

    <div class="layout" ref="main">
      <vsidebar v-if="$store.state.isShowFrame"></vsidebar>
      <div class="mainRight">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import vheader from "./components/Header";
import vsidebar from "./components/Sidebar";
import {
  getCookie
} from '@/assets/js/common'
export default {
  name: "App",
  components: {
    vheader,
    vsidebar
  },
  data() {
    return {
    }
  },
};
</script>

<style scope>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.contentBox {
  margin-top: 52px;
}
.layout {
  display: flex;
  height: calc(100vh - 50px);
}

.header {
  height: 50px;

  /* background: springgreen */
}
.mainRight {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
