import {get,post,put,del} from '@public/js/api'

/**
 * 系统角色
 */
export default {
	pageList: (params) => post('/sys/role/queryPageList', params),
	querySysRoleList: (params) => post('/sys/role/querySysRoleList', params),
	queryById: (params) => get('/sys/role/queryById', params),
	add: (params) => post('/sys/role/add', params),
	edit: (params) => post('/sys/role/edit', params),
	delete: (params) => get('/sys/role/delete', params),
	verify: (params) => get('/sys/role/verify', params),
	
	permissionTreeList: (params) => get('/sys/role/permissionTreeList', params),
	saveAuthorization: (params) => post('/sys/role/roleAuthorization', params),
	roleUserList: (params) => post('/sys/role/roleUserList', params),
	getUserPermission: (params) => post('/sys/role/getUserPermission', params),

}
