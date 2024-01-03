/**
 * 路径配置
 */
const pathConfig = [{
	match: '^/home',
	menuActive: '/home',
	pathName: '主页'
}, {
	match: '^/system',
	pathName: '系统管理',
	subs: [{
		menuActive: '/system/user/list',
		match: '/user',
		pathName: '用户管理'
	}, {
		menuActive: '/system/role/list',
		match: '/role',
		pathName: '角色管理'
	}, {
		menuActive: '/system/data-syn/update',
		match: '/data-syn',
		pathName: '系统直连'
	}, {
		menuActive: '/system/logs/operate',
		match: '/logs',
		pathName: '系统日志'
	}]
}, {
	match: '^/shop',
	pathName: '店铺管理',
	subs: [
		{
			menuActive: '/shop/helper/wxapp',
			match: '/helper',
			pathName: '开店助手',
			subs: [{
				match: '/wxapp',
				pathName: '微信小程序'
			},{
				match: '/wxmp',
				pathName: '微信公众号'
			},{
				match: '/pay',
				pathName: '支付配置'
			}]
		},
		{
		menuActive: '/shop/resource/image/list',
		match: '/resource',
		pathName: '素材空间',
		subs: [{
			match: '/image',
			pathName: '图片管理',
		}, {
			match: '/category',
			pathName: '素材分类',
		}]
	},{
		menuActive: '/shop/setting/room',
		match: '/setting',
		pathName: '经营设置',
	},{
		menuActive: '/shop/news/list',
		match: '/news',
		pathName: '文章资讯',
		subs: [{
			match: '/group',
			pathName: '文章分组',
		}]
	}]
}, {
	match: '^/page-editor',
	pathName: '页面装修',
	subs: [{
			menuActive: '/page-editor/page/list',
			match: '/page',
			pathName: '微页面',
			subs: [{
				match: '/category',
				pathName: '页面分类',
			}]
		},
		{
			menuActive: '/page-editor/tabbar/set',
			match: '/tabbar',
			pathName: '导航菜单',
		},
		{
			menuActive: '/page-editor/style/set',
			match: '/style',
			pathName: '主题风格',
		}
	]
}, {
	match: '^/hotel',
	pathName: '酒店管理',
	subs: [{
			menuActive: '/hotel/hotel/list',
			match: '/hotel',
			pathName: '酒店信息'
		},
		{
			menuActive: '/hotel/salesman/list',
			match: '/salesman',
			pathName: '业务员信息',
		}
	]
}, {
	match: '^/custom',
	pathName: '客户管理',
	subs: [{
		menuActive: '/custom/customer/list',
		match: '/customer',
		pathName: '客户查询'
	}, {
		menuActive: '/custom/member-card/list',
		match: '/member-card',
		pathName: '会员卡'
	}, {
		menuActive: '/custom/recharge-channel/list',
		match: '/recharge-channel',
		pathName: '充值渠道'
	}, {
		menuActive: '/custom/recharge-record/list',
		match: '/recharge-record',
		pathName: '充值查询'
	}, {
		menuActive: '/custom/coupon/list',
		match: '/coupon',
		pathName: '优惠券'
	}]
}, {
	match: '^/order',
	pathName: '订单管理',
	subs: [{
		menuActive: '/order/room-order/list',
		match: '/room-order',
		pathName: '订房查询'
	}, {
		menuActive: '/order/room-refund/list',
		match: '/room-refund',
		pathName: '退款查询'
	}, {
		menuActive: '/order/pay-record/list',
		match: '/pay-record',
		pathName: '支付明细'
	}]
}, {
	match: '^/trade',
	pathName: '交易账单',
	subs: [{
		menuActive: '/trade/pay-record/list',
		match: '/pay-record',
		pathName: '支付明细'
	}, {
		menuActive: '/trade/trade-record/list',
		match: '/trade-record',
		pathName: '对账中心'
	}]
}, ]
export default pathConfig
