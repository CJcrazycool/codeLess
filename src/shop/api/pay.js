import {
	get,
	post,
	put,
	del
} from '@public/js/api'

/**
 * 支付明细
 */
export default {
	pageList: (params) => post('/payOrder/payOrderItemPage', params)
}
