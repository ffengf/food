


import { Http_list, Http } from '@/http';
import { has_id, list } from '@/http/base';
import { Id } from "@/types/global"

export interface set_info {
	contract:string
	title:string
	id:Id
	store_type:number
}


class HttpSet extends Http {
	get_info():Promise<set_info[]>{
		return this.get()
	}

	save({ contract,id,store_type }:set_info){
		return this.server.put(`${this.uri}${id}/`,{ contract,store_type })
	}
}

export const api_set = new HttpSet('/food_admin/setting/')
