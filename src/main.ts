import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import router from './router';
import store from './model';
//@ts-ignore
import VueAMap from "vue-amap"

import "@/assets/css/reset.css"
import "@/router/middleware"
Vue.config.productionTip = false;

Vue.use(Element)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '89bf01f52b9f96eff3cba83e20c6cc06',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})


export const app = new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
