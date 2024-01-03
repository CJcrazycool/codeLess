import {get,post,put,del} from '@public/js/api'

/**
 * 微信小程序模版
 */
export default {
	pageList: (params) => post('/admin/appletTemplate/appletTemplateList', params),
	update: (params) => get('/admin/appletTemplate/updateTemplateBase', params),
	delete: (params) => get('/admin/appletTemplate/deleteTemplate', params),
	setDefault: (params) => get('/admin/appletTemplate/setDefault', params),
	examinePageList: (params) => post('/admin/appletTemplate/getAppletAuditList', params),
	refreshExamineState: (params) => get('/admin/appletTemplate/refreshAuditState', params)
}