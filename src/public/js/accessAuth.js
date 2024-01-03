import axios from 'axios'
import {
	request
} from './request'

//登录令牌
export default class AccessAuth {
	
	checkTokenApi=null;
	store=null
	
	//载入本地登录信息
	loadStorege(){
		//token
		this.token = localStorage.getItem(this.getStorageName('token'))
		//用户信息
		this.user = JSON.parse(localStorage.getItem(this.getStorageName('user')))
		//请求头中自带附带上token标识
		this.setHeader()
		this.updateAccessAuth()
	}
	
	getStorageName(name){
		return name
	}
	
	updateAccessAuth(){
		this.store.commit('public/updateAccessAuth', this)
	}
	
	//保存登录会话
	setLoginSession(loginInfo){
		this.user = loginInfo.user
		this.token = loginInfo.token
		localStorage[this.getStorageName('token')] = this.token
		localStorage[this.getStorageName('user')] = JSON.stringify(this.user)
		this.setHeader()
		this.updateAccessAuth()
	}
	
	//注销清空令牌
	clear(){
		this.user = null
		this.token = null
		localStorage.removeItem([this.getStorageName('token')])
		localStorage.removeItem([this.getStorageName('user')])
		this.updateAccessAuth()
	}
	
	//令牌带入请求头
	setHeader(){
		if(this.token)
			axios.defaults.headers["X-Access-Token"] = this.token;
	}
	
	//检查登录token，用于检测token无效则跳转到登录页
	async checkToken(){
		var result = false
		if(this.checkTokenApi)
			await request(this.checkTokenApi({
				params: {
					token:this.token
				},
				success: (response) => {
					if(response.data.success)
						result = true
				}
		}))
		return result
	}
}