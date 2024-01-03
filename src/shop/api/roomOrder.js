import {get,post,put,del} from '@public/js/api'

/**
 * 客房订单
 */
export default {
	pageList:(params)=>post('/hotelOrder/hotelOrderPage', params),
	queryById:(params)=>get('/hotelOrder/orderDetails', params),
	//查询最大退款金额
	queryMaxRefundFee:(params)=>get('/hotelOrder/getMaxRefundFee', params),
	//同步订单
	pushOrder:(params)=>get('/hotelOrder/syncHotelOrder', params)
}
