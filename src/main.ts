import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';
Vue.config.productionTip = false;

Vue.use(Element)

//跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
	//@ts-ignore
	return originalPush.call(this, location).catch((err: any) => err)
}

router.afterEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	window.scrollTo(0, 0)
})

export const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
