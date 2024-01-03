import {get,post,put,del} from '@public/js/api'

/**
 * 系统
 */
export default {
	updateSysParameter: (params) => post('/microPage/parameter/updateMicroPageParameter', params),
	querySysParameter: (params) => get('/microPage/parameter/getMicroPageParameter', params),
}

