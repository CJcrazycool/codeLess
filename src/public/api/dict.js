import {get,post,put,del} from '@public/js/api'

/**
 * 数据字典
 */
export default {
	queryAll: (params) => get('/common/queryDictKeyList', params)
}
