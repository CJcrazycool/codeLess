import {get,post,put,del} from '@public/js/api'

/**
 * 系统数据直连
 */
export default {
	synHotelData: (params) => get('/directSystem/syncHotel', params),
	synCouponData: (params) => get('/directSystem/synCouponType', params),
	synMemberCardData: (params) => get('/directSystem/synMemberCardType', params),
	synSalesManData: (params) => get('/directSystem/syncMarketer', params),
	queryState: (params) => get('/directSystem/queryDirectSystemStateTime', params),
	recordPageList: (params) => post('/sys/log/queryDirectSystemLogPage', params)
}
