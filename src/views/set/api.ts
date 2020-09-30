


import { Http_list, Http } from '@/http';
import { has_id, list } from '@/http/base';
import { Id, parmas } from "@/types/global"

export interface set_info {
	contract:string
}


class HttpSet extends Http {
	get_info():Promise<set_info>{
		return this.get()
	}

	save(info:set_info){
		return this.server.put(`${this.uri}`,info)
	}
}

export const api_set = new HttpSet('/food_admin/setting/1/')
