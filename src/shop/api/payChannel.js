import {
	get,
	post,
	put,
	del
} from '@public/js/api'

/**
 * 支付渠道
 */
export default {
	pageList: (params) => post('/company/payConfig/queryPageList', params),
	add: (params) => post('/company/payConfig/add', params),
	edit: (params) => post('/company/payConfig/edit', params),
	delete: (params) => get('/company/payConfig/delete', params),
	queryById:(params) => get('/company/payConfig/getById', params),
	setDefault:(params) => get('/company/payConfig/setDefault', params),
	setState:(params) => get('/company/payConfig/enableDisable', params)
}
