import {get,post,put,del} from '@public/js/api'
import {baseURL} from '@public/js/api'

/**
 *  绑定微信
 */
export default {
	getWxUserAuthUrl:(url)=>{return baseURL+url},
	unbind: (params) => get('/sys/untieSysUserOpenId', params),
	getBindUrl: (params) => get('/sys/userAuthorizationUrl', params),	
	checkBindResult: (params) => get('/sys/authorizationOpenIdResult', params),	
	getWxUserInfo: (params) => get('/sys/getMemberOpenId', params),	
}
