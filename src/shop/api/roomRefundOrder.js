import {
	get,
	post,
	put,
	del
} from '@public/js/api'

/**
 * 客房退款单
 */
export default {
	//申请退款单
	replaceRefund: (params) => post('/hotelOrder/replaceRefund', params),
	pageList: (params) => post('/hotelOrder/hotelOrderRefundPage', params),
	queryById:(params)=>get('/hotelOrder/refundOrderDetails', params),
	//查询是否有退款进行中的工单
	queryPendingOrder:(params)=>get('/hotelOrder/getRefundOrder', params),
	//驳回退款
	reject:(params)=>get('/hotelOrder/rejectionRefund', params),
	//同意退款
	agree:(params)=>get('/hotelOrder/consentRefund', params),
}
