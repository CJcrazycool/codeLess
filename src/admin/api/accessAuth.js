import {get,post,put,del} from '@public/js/api'

/**
 *  登录认证
 */
export default {
	login: (params) => post('/admin/user/login', params),
	logout: (params) => get('/admin/user/logout', params),
	getLoginUserInfo: (params) => get('/admin/user/userLoginInfo', params),
	checkToken:(params) => get('/common/adminCheckToken', params)
}
