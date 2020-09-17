


import { Http } from "@/http"
import { Id, user_level } from '@/types/global'


export interface login{
	username:string
	password:string
}

export interface login_info {
	id:Id
	username:string
	token:string
	auth:user_level
}

class HttpLogin extends Http{
	login(info:login):Promise<login_info>{
		return this.post(info)
	}
}

export const api_login =  new HttpLogin('/food_admin/login')
