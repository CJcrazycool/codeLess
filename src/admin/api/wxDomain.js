import {get,post,put,del} from '@public/js/api'

/**
 * 微信域名白名单
 */
export default {
	queryDomainConfig: (params) => get('/admin/domain/getDomainConfig', params),
	updateDomainConfig: (params) => post('/admin/domain/updateDomainConfig', params)
}