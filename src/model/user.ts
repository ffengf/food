import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";

import store from "./index"
import StorageDb from '@/util/storage';
import { login } from '@/views/login/api';
import { api_login } from '@/views/login/api'
import { Id, user_level } from '@/types/global';

interface mutation_login {
	username: string
	token: string
	id:Id
	auth:user_level
}


@Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store })
export default class User extends VuexModule {
	private TOKEN: string | null = StorageDb.getLocal('token')
	private USERNAME: string | null = StorageDb.getLocal('username')
	private AUTH: string | null = StorageDb.getLocal('auth')
	private ID: Id | null = StorageDb.getLocal('id')

	@Mutation
	private LOGIN({ username, token, id }: mutation_login) {
		this.USERNAME = username
		this.TOKEN = token
		this.ID = id
	}

	@Mutation
	private LOGOUT() {
		this.USERNAME = ''
		this.AUTH = ''
		this.TOKEN = null
		this.ID = ''
	}

	@Action
	public async login(info: login) {
		const { username, token, id, auth } = await api_login.login(info)
		StorageDb.setLocal('username', username)
		StorageDb.setLocal('auth', auth)
		StorageDb.setLocal('token', token)
		StorageDb.setLocal('id', id)
		this.LOGIN({ username, auth, token, id })
	}

	@Action
	public logout() {
		StorageDb.removeLocal('username')
		StorageDb.removeLocal('auth')
		StorageDb.removeLocal('token')
		StorageDb.removeLocal('id')
		this.LOGOUT()
	}

	public get token() {
		return this.TOKEN
	}

	public get user_id(){
		return this.ID
	}

}


export const UserModule = getModule(User);
