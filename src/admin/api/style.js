import {get,post,put,del} from '@public/js/api'

/**
 * 预设风格
 */
export default {
	pageList: (params) => post('/admin/color/queryThemeColorsTacitly', params),
	delete: (params) => get('/admin/color/deleteThemeColorsIdBy', params),
	queryById: (params) => get('/admin/color/getThemeColorsIdBy', params),
	add: (params) => post('/admin/color/saveThemeColors', params),
	edit: (params) => post('/admin/color/updateThemeColors', params),
	setDefault: (params) => get('/admin/color/defaultThemeColor', params),
}