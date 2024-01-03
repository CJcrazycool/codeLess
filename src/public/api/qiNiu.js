import {get,post,put,del} from '@public/js/api'

/**
 * 七牛接口
 */
export default {
	getToken: (params) => get('/common/uploadToken', params)
}
