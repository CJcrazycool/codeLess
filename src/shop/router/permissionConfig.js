export default  {
	
	//白名单不验证权限
	whiteList:['^/home','^/curr-user'],
	
	verifyList:{
		//系统管理
		'^/system/user':'system:user',
		'^/system/role':'system:role',
		'^/system/data-syn':'system:direct',
		'^/system/logs':'system:log',
		
		//店铺管理
		'^/shop/resource':'shop:resource',
		'^/shop/setting':'shop:setting',
		'^/shop/helper':'shop:helper',
		'^/shop/news':'shop:news',
		
		//页面装修
		'^/page-editor/page':'pageEditor:wpage',
		'^/page-editor/tabbar':'pageEditor:tabbar',
		'^/page-editor/style':'pageEditor:style',
		
		//酒店管理
		'^/hotel/hotel':'hotel:hotel',
		'^/hotel/salesman':'hotel:salesman',
		
		//客户管理
		'^/custom/customer':'customer:customer',
		'^/custom/recharge-record':'customer:rechargeRecord',
		'^/custom/member-card':'customer:memberCard',
		'^/custom/coupon':'customer:coupon',
		'^/custom/recharge-channel':'customer:rechargeChannel',
		
		//订单管理
		'^/order/room-order':'order:hotelOrder:query',
		'^/order/room-refund':'order:hotelOrderRefund',
		
		//订单管理
		'^/trade/pay-record':'trade:payRecord',
		'^/trade/trade-record':'trade:tradeRecord'
	}
}

