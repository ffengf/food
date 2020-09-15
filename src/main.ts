import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import router from './router';
import store from './model';


import "@/assets/css/reset.css"
import "@/router/middleware"
Vue.config.productionTip = false;

Vue.use(Element)



export const app = new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
