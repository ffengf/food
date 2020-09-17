
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Rview from "@/components/routerView/index.vue"

//跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
	//@ts-ignore
	return originalPush.call(this, location).catch((err: any) => err)
}

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/login',
		meta: {
			title: '登录',
			without_auth: true
		},
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/',
		redirect: '/home',
		component: () => import('@/components/global/index.vue'),
		children: [
			{
				path: 'home',
				meta: {
					title: '主页',
					cache: false
				},
				component: () => import('@/views/home/index.vue')
			},
			{
				path: 'shop',
				meta: {
					title: '商品管理',
					cache: false
				},
				redirect: '/shop/goods',
				component: () => import('@/views/shop/index.vue'),
				children: [
					{
						path: 'store',
						meta: {
							title: '店铺管理',
							cache: false
						},
						component: Rview,
						children: [
							{
								path: '',
								meta:{
									title: '店铺列表',
									cache: false
								},
								component: () => import('@/views/shop/store/index.vue'),
							},
							{
								path: 'create',
								meta:{
									title: '添加店铺',
									cache: false
								},
								component: () => import('@/views/shop/store/edit/index.vue'),
							},
							{
								path: 'edit/:id',
								meta:{
									title: '编辑店铺',
									cache: false
								},
								component: () => import('@/views/shop/store/edit/index.vue'),
							}
						]
					},
					{
						path: 'goods',
						meta: {
							title: '商品管理',
							cache: false
						},
						component: () => import('@/views/shop/goods/index.vue'),
					},
					{
						path: 'class',
						meta: {
							title: '分类管理',
							cache: false
						},
						component: () => import('@/views/shop/class/index.vue'),
					},
					{
						path: 'package',
						meta: {
							title: '套餐管理',
							cache: false
						},
						component: () => import('@/views/shop/package/index.vue'),
					},
					{
						path: 'remark',
						meta: {
							title: '评论管理',
							cache: false
						},
						component: () => import('@/views/shop/remark/index.vue'),
					},
				]
			}
		]
	},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: (e) => {
		document.title = e.meta.title
		return { x: 0, y: 0 }
	},
	routes,
});

export default router;
