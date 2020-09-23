


import { Http_list, Http } from '@/http';
import { has_id, list } from '@/http/base';
import { Id, parmas } from "@/types/global"

export enum pay_type {
	微信支付 = 1,
	商城储值支付 = 2,
	商城零钱支付 = 3,
	店铺储值支付 = 4,
}
export interface user {
	id: Id
	username: string
	phone: string
}
export interface goods {
	id: Id
	name: string
	count: number
	img: string
	price: number
}
export enum order_classify {
	套餐 = 1,
	普通菜品 = 2
}
export enum order_status {
	已取消 = 0,
	待支付 = 1,
	待消费 = 2,
	待评价 = 4,
	售后中 = 5,
	完成 = 6,
}

export interface manage_list {
	// id: Id没有的，防止TS报错
	order_id: string
	order_classify: order_classify
	status: number
	pay_type: pay_type
	total_amount: number
	user: user
	goods: goods[]
	food_store: string
	create_time: string
}

export interface order_settle {
	order_id:string
	settle_code:string
}

class HttpManage extends Http {
	get_list = <T extends parmas>(parmas: T): Promise<list<manage_list>> => {
		return this.get(parmas)
	}

	info(order_id:string):Promise<manage_list>{
		return this.server.get(`/food_admin/order/${order_id}/`)
	}

	settle(data: order_settle) {
		return this.server.patch('/food_admin/order/settle/', data)
	}
}

export const api_manage = new HttpManage('/food_admin/order/')
