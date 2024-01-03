import {get,post,put,del} from '@public/js/api'

/**
 * 优惠券政策
 */
export default {
	pageList: (params) => post('/member/couponTypePageList', params),	
	queryById: (params) => get('/member/getCouponType', params),	
	edit: (params) => post('/member/editCouponType', params)
}
