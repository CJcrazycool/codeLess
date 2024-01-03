import {get,post,put,del} from '@public/js/api'

/**
 * 租户
 */
export default {
	pageList: (params) => post('/admin/company/queryPageList', params),
	queryById: (params) => get('/admin/company/getCompanyById', params),
	verifyUnique: (params) => get('/admin/company/verifyCompany', params),
	add: (params) => post('/admin/company/addCompany', params),
	edit: (params) => post('/admin/company/editCompany', params),
	permissionTreeList: (params) => get('/admin/menu/menuTreeList', params),
	saveAuthorization: (params) => post('/admin/company/menuAuthorization', params),
	loginAdmin:(params) => get('/admin/company/companyLogin', params),
	
	
	//查询微信公众号、小程序配置信息
	queryWxInfo: (params) => get('/admin/publicNo/getByCompanyId', params),
	getAuthUrl:(params) => get('/admin/publicNo/getAuthorizeUrl', params),
	saveWxInfo: (params) => post('/admin/publicNo/edit', params),
	checkAuthResult: (params) => get('/admin/publicNo/authorizationPublicNo', params)
	
	 
}