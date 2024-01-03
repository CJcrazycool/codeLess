import {get,post,put,del} from '@public/js/api'

/**
 * 主题风格
 */
export default {	
	queryPresets: (params) => get('/company/color/queryThemeColorsTacitly', params),
	queryByShop: (params) => get('/company/color/getThemeColors', params),
	save: (params) => post('/company/color/createThemeColors', params),
}