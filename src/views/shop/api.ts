


import { Http_list } from '@/http';
import { has_id, list } from '@/http/base';
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
export interface options {
	id: Id
	value: string
}
export interface specification_list {
	id: Id
	name: string
	options: options[]
}
export interface spu extends create_spu {
	id: Id
	specification_list: specification_list[]
}

export interface option_list {
	spec: string
	spec_id: Id
	option: string
	option_id: Id
}

export interface get_sku {
	id: Id
	VIP_1_price: number
	VIP_2_price: number
	VIP_3_price: number
	img: string
	option_list: option_list[]
	points: number
	stock: number
}

export interface base_sku {
	stock: number
	points: number
	VIP_1_price: number
	img: string
	[propName: string]: any
}

export interface create_sku extends base_sku {
	spu_id: Id
	option_id_list: Id[]
}


export interface put_sku extends base_sku {
	id: Id
}

class HttpGoods extends Http_list<spu>{

	get_goods_list = <T extends parmas>(parmas: T) => {
		return this.get<spu>(parmas)
	}

	change_is_supper(data: { id: Id[], is_upper: boolean }) {
		return this.patch_many(data)
	}

	get_info(id: Id): Promise<spu> {
		return this.get_one(id)
	}

	get_sku(id: Id): Promise<list<get_sku>> {
		return this.server.get(`/food_admin/sku/?spu_id=${id}`)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}

	create(data: create_spu): Promise<has_id> {
		return this.post(data) as Promise<has_id>
	}

	create_sku(data: create_sku) {
		return this.server.post('/food_admin/sku/', data)
	}

	put_sku({ id, ...data }: put_sku) {
		return this.server.put(`/food_admin/sku/${id}/`, data)
	}

	put_foods(data: any) {
		return this.put_one(data)
	}

	add_option(data: { spec_id: Id, value: string }) {
		return this.server.post(`/food_admin/foods/specifications/`, data)
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

	create(data: create_goods_class) {
		return this.post(data)
	}
}

export interface create_vclass {
	img: string
	name: string
}

export interface vclass extends create_vclass {
	id: Id
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

	create(data: create_vclass) {
		return this.post(data)
	}
}



export interface combo_category {
	id: Id
	name: string
	img: string
}

export interface base_package {
	name: string
	price: number
	img_list: string[]
	is_upper: boolean
	is_homepage_hot: boolean
	food_store: string
	combo_category?: combo_category
	create_time?: string
	[propName: string]: any
}

export interface package_list extends base_package {
	id:Id
}

export interface create_package {
	goods_desc:string
	name: string
	key_word: string
	price:number
	is_real_seal: boolean
	goods_sale: number
	img_list: string[]
	video:string
	img_detail:string[]
	food_store_id: Id
	combo_category_id: Id
	combo_content:string
	points:number
	stock:number
}

export interface put_package extends create_package {
	id:Id
}

class HttpPackage extends Http_list<package_list> {
	get_list = <T extends parmas>(parmas: T) => {
		return this.get<package_list>(parmas)
	}

	get_info(id:Id):Promise<put_package>{
		return this.get_one(id)
	}

	change_upper(data:{ id:Id[],is_upper:boolean }){
		return this.patch_many(data)
	}

	remove(id:Id[] | Id){
		return this.delete(id)
	}

	change_hot(data:{ id:Id,is_homepage_hot:boolean }){
		return this.patch(data)
	}

	create(data:create_package){
		this.post(data)
	}

	edit(data:put_package){
		this.put_one(data as any)
	}
}


export const api_store = new HttpStore('/food_admin/stores/')
export const api_goods = new HttpGoods('/food_admin/foods/')
export const api_class = new HttpGoodsClass('/food_admin/food_category/')
export const api_vclass = new HttpVClass('/food_admin/combo_category/')
export const api_package = new HttpPackage('/food_admin/combo/')
