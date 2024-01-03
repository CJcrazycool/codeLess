import {get,post,put,del} from '@public/js/api'

/**
 *  登录认证
 */
export default {
	login: (params) => post('/sys/login', params),
	logout: (params) => get('/sys/logout', params),
	checkToken:(params) => get('/common/checkToken', params),
	getPermissionKeyValue:(params)=>get('/sys/getPermissionKeyValue', params),
	getLoginUserInfo: (params) => get('/sys/userLoginInfo', params),
	updateLoginUserPassword: (params) => get('/sys/editPassword', params),
	updateLoginUserInfo: (params) => post('/sys/updateSysUserName', params)
}
