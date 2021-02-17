import Vue from "vue";
import App from "./App.vue";
import Clipboard from "v-clipboard";
import VueAnalytics from "vue-ua";

Vue.config.productionTip = false;
Vue.use(Clipboard, VueAnalytics, {
  appName: "Squisheo",
  appVersion: "1",
  trackingId: process.env.API_KEY,
  debug: {
    enabled: true, // default value
    trace: true, // default value
    sendHitTask: true, // default value
  },
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
