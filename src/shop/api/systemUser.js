import {get,post,put,del} from '@public/js/api'

/**
 * 系统用户
 */
export default {
	pageList: (params) => post('/sys/user/queryPageList', params),
	queryById: (params) => get('/sys/user/queryById', params),
	add: (params) => post('/sys/user/add', params),
	edit: (params) => post('/sys/user/edit', params),
	editPassword: (params) => get('/sys/user/editPassword', params),
	delete: (params) => get('/sys/user/delete', params),
	verify: (params) => get('/sys/user/verify', params)
}
