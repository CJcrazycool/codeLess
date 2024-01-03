import {get,post,put,del} from '@public/js/api'

/**
 * 业务员
 */
export default {
	pageList: (params) => post('/member/queryMarketerPageList', params)
}
