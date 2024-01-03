import {get,post,put,del} from '@public/js/api'

/**
 * 会员
 */
export default {
	pageList: (params) => post('/member/memberPageList', params),//会员-分页
	getDetailById: (params) => get('/member/memberDetail', params),//会员-详情
	update: (params) => post('/member/editMember', params),//会员-修改
    delete: (params) => get('/member/deleteMember', params),//会员-删除

	mbrCardTypeList: (params) => get('/member/mbrCardTypeList', params),//会员卡类型-列表
	getMemberCardType: (params) => get('/member/getMemberCardType', params),//会员卡类型查询
	mbrCardTypePageList: (params) => post('/member/mbrCardTypePageList', params),//会员卡类型-分页
	editMbrCardType: (params) => post('/member/editMbrCardType', params),//会员卡类型-修改
	setDefaultMbrCardType: (params) => get('/member/setDefaultMbrCardType', params),//会员卡类型-设置默认卡
	memberRechargePolicy: (params) => get('/member/memberRechargePolicy', params),//会员卡类型-查询会员卡充值政策
	

	rechargeChannelPageList: (params) => post('/member/rechargeChannelPageList', params),//充值渠道-分页
	getMemberRechargeChannel: (params) => get('/member/getMemberRechargeChannel', params),//充值渠道-查询
	addRechargeChannel: (params) => post('/member/addRechargeChannel', params),//充值渠道-新增
	editRechargeChannel: (params) => post('/member/editRechargeChannel', params),//充值渠道-修改
	deleteRechargeChannel: (params) => del('/member/deleteRechargeChannel', params),//充值渠道-删除
	setDefaultRechargeChannel: (params) => get('/member/setDefaultRechargeChannel', params),//充值渠道-设置默认政策
	
}
