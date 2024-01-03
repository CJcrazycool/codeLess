import {
	get,
	post,
	put,
	del
} from '@public/js/api'

/**
 * 交易对账记录
 */
export default {
	pageList: (params) => post('/payOrder/tradeRecordPage', params),
	totalData: (params) => post('/payOrder/tradeRecordTotal', params)
}
