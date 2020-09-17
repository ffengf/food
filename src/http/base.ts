
import axios, { AxiosInstance } from 'axios';
import { loadding } from './loadding'
import { app as Vue } from '@/main'
import { UserModule } from '@/model/user';
import { Id } from '@/types/global';

const server = axios.create({
	baseURL: process.env.VUE_APP_API,
	timeout: 10000,
	headers: {
		"Accept": 'application/json',
		"Content-Type": 'application/json',
	},
})


server.interceptors.request.use(config => {
	loadding.showLoading()
	config.headers.AUTHORIZATION = `token=${UserModule.token}`
	return config;
}, err => {
	loadding.hideLoading()
	return Promise.reject(err);
})
server.interceptors.response.use(({ data,status }) => {
	loadding.hideLoading()
	if (data.code) {
		Vue.$message.error(data.msg)
		return Promise.reject(data)
	}
	if(status === 204){
		Vue.$message.success('删除成功')
	}
	return data
}, err => {
	loadding.hideLoading()
	if (err?.response?.status === 401) {
		Vue.$message.error(`401错误`)
		return Promise.reject(err)
	}
	if (err?.response?.status === 403) {
		UserModule.logout()
		Vue.$router.push('/login')
		Vue.$message.error('登录过期')
		return Promise.reject(err)
	}
	Vue.$message.error(`请求错误`)
	return Promise.reject(err)
})



interface has_id {
	id: Id
}

export interface list<T> {
	count: number
	results: T[]
}

export abstract class Http_list<T extends has_id> {
	protected readonly uri: string
	protected readonly server: AxiosInstance = server;

	constructor(uri: string) {
		this.uri = uri
	}

	protected get<R>(params: any): Promise<list<R>> {
		return this.server.get(this.uri, { params })
	}

	protected get_one<R>(id: Id): Promise<R> {
		return this.server.get(`${this.uri}${id}`)
	}

	protected post<T>(data: T) {
		return this.server.post(this.uri, data)
	}

	protected put_one({ id, ...data }: T) {
		return this.server.put(`${this.uri}${id}/`, data)
	}

	protected patch<G extends has_id>({ id, ...data }: G) {
		return this.server.patch(`${this.uri}${id}`, data)
	}

	protected put_many(id_list: T[], type: unknown) {
		const updateid = id_list.map(x => x.id)
		return this.server.put(`${this.uri}multiple_put/`, { updateid, type })
	}

	protected async delete(id: Id | Id[],type = true) {
		if(type){
			await Vue.$confirm('是否删除?')
		}
		const deleteid = Array.isArray(id) ? id.join(',') : id
		return this.server.delete(`${this.uri}?id=${deleteid}`)
	}

	protected delete_one(id: Id) {
		return this.server.delete(`${this.uri}${id}/`)
	}
}


export abstract class Http {
	protected readonly uri: string
	protected readonly server: AxiosInstance = server;

	constructor(uri: string) {
		this.uri = uri
	}

	protected post(data: any): Promise<any> {
		return this.server.post(this.uri, data)
	}

	protected get(params?: any): Promise<any> {
		return this.server.get(this.uri, { params })
	}

	protected delete_one(id: Id) {
		return this.server.delete(`${this.uri}${id}/`)
	}
}
