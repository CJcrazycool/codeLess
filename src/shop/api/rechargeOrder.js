import {get,post,put,del} from '@public/js/api'

/**
 * 充值订单
 */
export default {
	pageList:(params)=>post('/rechargeOrder/rechargeOrderPage', params),
	queryById:(params)=>get('/rechargeOrder/orderDetails', params),
	refund:(params)=>get('/rechargeOrder/refund', params),
	retry:(params)=>get('/rechargeOrder/retryRecharge', params),
}
