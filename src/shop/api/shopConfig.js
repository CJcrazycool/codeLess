import {get,post,put,del} from '@public/js/api'

/**
 * 商户经营配置
 */
export default {
	queryRoomConfig: (params) => get('/hotel/getHotelConfig', params),
	saveRoomConfig: (params) => post('/hotel/updateHotelConfig', params),
	queryMemberConfig: (params) => get('/member/getMemberConfig', params),
	saveMemberConfig: (params) => post('/member/updateMemberConfig', params),
}