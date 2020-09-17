


import { Http_list } from '@/http';
import { Id, parmas } from "@/types/global"

export interface video {
	cover: string
	url: string
}

export interface store {
	id: Id
	create_time: string
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
	auth: number

	is_register: 0 | 1
	city: string

	password?: string
}


class HttpStore extends Http_list<store>{
	get_stores_list = <T extends parmas>(parmas: T) => {
		return this.get<store>(parmas)
	}

	create(data: store) {
		return this.post(data)
	}

	change_password(data: { id: Id, password: string }) {
		return this.patch(data)
	}

	change_one(data: store) {
		return this.put_one(data)
	}

	remove(id: Id | Id[]) {
		return this.delete(id)
	}
}

export const api_store = new HttpStore('/food_admin/stores/')
