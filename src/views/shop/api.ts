


import { Http_list } from '@/http';
import { Id, parmas } from "@/types/global"

export interface video {
	cover: string
	url: string
}

export interface create_stroe {
	name: string
	address: string
	longitude: number
	latitude: number
	image: string[]
	video: video[]
	phone: string
	start_time: string
	end_time: string
	per_cost: string
	m_value: string
	username: string
	auth: 0 | 1

	is_register: 0 | 1

	password: string
}

export interface store extends create_stroe {
	id: Id
	// create_time: string
	// name: string
	// address: string
	// longitude: number
	// latitude: number
	// image: string[]
	// video: video[]
	// phone: string
	// start_time: string
	// end_time: string
	// per_cost: string
	// m_value: string
	// username: string
	// auth: 0 | 1

	// is_register: 0 | 1
	// city: string

	// password?: string
}

export interface change_pass {
	id: Id
	password: string
}

class HttpStore extends Http_list<store>{

	get_stores_list = <T extends parmas>(parmas: T) => {
		return this.get<store>(parmas)
	}

	get_info(id: Id): Promise<create_stroe> {
		return this.get_one(id)
	}

	create(data: create_stroe) {
		return this.post(data)
	}

	change_password(data: change_pass) {
		return this.patch(data)
	}

	change_one(data: store) {
		return this.put_one(data)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}

}

export interface specification {
	[propName: string]: any
}

export interface create_spu {
	name: string
	goods_desc: string
	key_word: string
	is_real_seal: boolean
	goods_sale: number
	food_category_id: Id
	img_list: string[]
	specification: specification
}

export interface spu extends create_spu {
	id:Id
}


class HttpGoods extends Http_list<spu>{

	get_goods_list = <T extends parmas>(parmas: T) => {
		return this.get<spu>(parmas)
	}

	change_is_supper(data: { id: Id[], is_upper: boolean }) {
		return this.patch_many(data)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}

	create(data: create_spu) {
		return this.post(data)
	}
}


export interface create_goods_class {
	name: string
	order: number
}

export interface goods_class extends create_goods_class {
	id: Id
	food_num?: number
}


class HttpGoodsClass extends Http_list<goods_class>{

	get_list = <T extends parmas>(parmas: T) => {
		return this.get<goods_class>(parmas)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}

	edit(data: goods_class) {
		return this.put_one(data)
	}

	create(data:create_goods_class){
		return this.post(data)
	}
}

export interface create_vclass {
	img:string
	name:string
}

export interface vclass extends create_vclass {
	id:Id
}


class HttpVClass extends Http_list<vclass>{

	get_list = <T extends parmas>(parmas: T) => {
		return this.get<vclass>(parmas)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}

	edit(data: vclass) {
		return this.put_one(data)
	}

	create(data:create_vclass){
		return this.post(data)
	}
}


export const api_store = new HttpStore('/food_admin/stores/')
export const api_goods = new HttpGoods('/food_admin/foods/')
export const api_class = new HttpGoodsClass('/food_admin/food_category/')
export const api_vclass = new HttpVClass('/food_admin/combo_category/')
