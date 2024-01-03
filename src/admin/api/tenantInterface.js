import {get,post,put,del} from '@public/js/api'

/**
 * 租户接口
 */
export default {
	pageList: (params) => post('/admin/company/interfacePageList', params),
	add: (params) => post('/admin/company/addInterface', params),
	edit: (params) => post('/admin/company/editInterface', params),
	delete: (params) => get('/admin/company/deleteInterface', params),
	queryById: (params) => get('/admin/company/getInterfaceById', params)
}