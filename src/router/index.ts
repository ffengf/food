
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Rview from "@/components/routerView/index.vue"
import { UserModule } from '@/model/user';
import { user_level } from '@/types/global';

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
				path: 'order',
				meta: {
					title: '用户订单',
					cache: false
				},
				redirect: '/order/manage',
				component: () => import('@/views/order/index.vue'),
				children: [
					{
						path:'manage',
						meta: {
							title: '订单管理',
							cache: false
						},
						component: Rview,
						children:[
							{
								path:'',
								meta: {
									title: '订单列表',
									cache: false
								},
								component: () => import('@/views/order/manage/index.vue'),
							},
							{
								path:'info/:order_id',
								meta: {
									title: '订单详情',
									cache: false
								},
								component: () => import('@/views/order/manage/info/index.vue'),
							},
						]
					}
				]
			},
			{
				path: 'shop',
				meta: {
					title: '商品管理',
					cache: false
				},
				beforeEnter(to,form,next){
					if(to.path === '/shop'){
						if(UserModule.user_level === user_level.root){
							return next('/shop/store')
						}
						if(UserModule.user_level === user_level.admin){
							return next('/shop/goods')
						}
					}else{
						return next()
					}
				},
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
								meta: {
									title: '店铺列表',
									cache: false
								},
								component: () => import('@/views/shop/store/index.vue'),
							},
							{
								path: 'create',
								meta: {
									title: '添加店铺',
									cache: false
								},
								component: () => import('@/views/shop/store/edit/index.vue'),
							},
							{
								path: 'edit/:id',
								meta: {
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
							title: '菜品管理',
							cache: false
						},
						component: Rview,
						children: [
							{
								path: '',
								meta: {
									title: '菜品列表',
									cache: false
								},
								component: () => import('@/views/shop/goods/index.vue'),
							},
							{
								path: 'create',
								meta: {
									title: '添加菜品',
									cache: false
								},
								component: () => import('@/views/shop/goods/edit/index.vue'),
							},
							{
								path: 'edit/:id',
								meta: {
									title: '编辑菜品',
									cache: false
								},
								component: () => import('@/views/shop/goods/edit/index.vue'),
							}
						]
					},
					{
						path: 'class',
						meta: {
							title: '商品分类管理',
							cache: false
						},
						component: () => import('@/views/shop/class/index.vue'),
					},
					{
						path: 'vclass',
						meta: {
							title: '套餐分类管理',
							cache: false
						},
						component: () => import('@/views/shop/vclass/index.vue'),
					},
					{
						path: 'package',
						meta: {
							title: '套餐管理',
							cache: false
						},
						component: Rview,
						children: [
							{
								path: '',
								meta: {
									title: '套餐列表',
									cache: false
								},
								component: () => import('@/views/shop/package/index.vue'),
							},
							{
								path: 'create',
								meta: {
									title: '添加套餐',
									cache: false
								},
								component: () => import('@/views/shop/package/edit/index.vue'),
							},
							{
								path: 'edit/:id',
								meta: {
									title: '编辑套餐',
									cache: false
								},
								component: () => import('@/views/shop/package/edit/index.vue'),
							}
						]
					},
					{
						path: 'remark',
						meta: {
							title: '评论管理',
							cache: false
						},
						component: () => import('@/views/shop/remark/index.vue'),
					},
					{
						path: 'join',
						meta: {
							title: '店铺入驻',
							cache: false
						},
						component: Rview,
						children:[
							{
								path:'',
								meta: {
									title: '店铺入驻列表',
									cache: false
								},
								component: () => import('@/views/shop/join/index.vue')
							},
							{
								path:'info/:id',
								meta: {
									title: '店铺入驻详情',
									cache: false
								},
								component: () => import('@/views/shop/join/info/index.vue')
							}
						]
					},
				]
			},
			{
				path: 'set',
				meta: {
					title: '设置',
					cache: false
				},
				redirect: '/set/default',
				component: () => import('@/views/set/index.vue'),
				children: [
					{
						path:'default',
						meta: {
							title: '后台设置',
							cache: false
						},
						component: () => import('@/views/set/default/index.vue'),
					}
				]
			},
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
