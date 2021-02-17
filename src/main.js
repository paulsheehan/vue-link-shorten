import Vue from "vue";
import App from "./App.vue";
import Clipboard from "v-clipboard";
import VueAnalytics from "vue-ua";

Vue.config.productionTip = false;
Vue.use(Clipboard, VueAnalytics, {
  appName: "link-shortener-c40d2",
  appVersion: "1",
  trackingId: process.env.API_KEY,
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
