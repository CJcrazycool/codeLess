import {get,post,put,del} from '@public/js/api'

/**
 * 微信小程序草稿箱
 */
export default {
	pageList: (params) => post('/admin/appletTemplate/appletDraftList', params),
	update: (params) => get('/admin/appletTemplate/updateDraft', params),
	addTpl: (params) => get('/admin/appletTemplate/addToTemplate', params)
}