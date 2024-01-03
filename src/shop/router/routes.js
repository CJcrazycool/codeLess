/**
 * 路由配置
 */
const routes = [{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/',
		component: () => import('@shop/views/Index'),
		children: [

			//主页
			{
				path: '/home',
				component: () => import('@shop/views/Home')
			},

			//系统模块
			{
				path: '/system/user/list',
				component: () => import('@shop/views/system/user/List')
			}, {
				path: '/system/role/list',
				component: () => import('@shop/views/system/role/List')
			}, {
				path: '/system/data-syn/update',
				component: () => import('@shop/views/system/data-syn/Update')
			}, {
				path: '/system/data-syn/record',
				component: () => import('@shop/views/system/data-syn/Record')
			},
			{
				path: '/system/logs/operate',
				component: () => import('@shop/views/system/logs/operate/List')
			}, {
				path: '/system/logs/api',
				component: () => import('@shop/views/system/logs/api/List')
			}, {
				path: '/system/logs/exception',
				component: () => import('@shop/views/system/logs/exception/List')
			},

			//店铺模块
			{
				path: '/shop/resource/image/list',
				component: () => import('@shop/views/shop/resource/image/List')
			}, {
				path: '/shop/resource/category/list',
				component: () => import('@shop/views/shop/resource/category/List')
			},{
				path: '/shop/setting/room',
				component: () => import('@shop/views/shop/setting/Room')
			},{
				path: '/shop/setting/member',
				component: () => import('@shop/views/shop/setting/Member')
			},{
				path: '/shop/helper/wxapp',
				component: () => import('@shop/views/shop/helper/wxapp/Index')
			},{
				path: '/shop/helper/wxmp',
				component: () => import('@shop/views/shop/helper/wxmp/Index')
			},{
				path: '/shop/helper/pay',
				component: () => import('@shop/views/shop/helper/pay-config/List')
			},{
				path: '/shop/news/list',
				component: () => import('@shop/views/shop/news/List')
			},{
				path: '/shop/news/group/list',
				component: () => import('@shop/views/shop/news/group/List')
			},

			//页面编辑器
			{
				path: '/page-editor/page/list',
				component: () => import('@shop/views/page-editor/page/List')
			}, {
				path: '/page-editor/page/category',
				component: () => import('@shop/views/page-editor/page/category/List')
			}, {
				path: '/page-editor/tabbar/set',
				component: () => import('@shop/views/page-editor/tabbar/Set')
			}, {
				path: '/page-editor/style/set',
				component: () => import('@shop/views/page-editor/style/Set')
			}, 
			
			//酒店模块
			{
				path: '/hotel/hotel/list',
				component: () => import('@shop/views/hotel/hotel/List')
			},
			{
				path: '/hotel/salesman/list',
				component: () => import('@shop/views/hotel/salesman/List')
			},

			//客户模块
			{
				path: '/custom/customer/list',
				component: () => import('@shop/views/custom/customer/List')
			}, {
				path: '/custom/member-card/list',
				component: () => import('@shop/views/custom/member-card/List')
			}, {
				path: '/custom/recharge-channel/list',
				component: () => import('@shop/views/custom/recharge-channel/List')
			}, {
				path: '/custom/recharge-record/list',
				component: () => import('@shop/views/custom/recharge-record/List')
			}, {
				path: '/custom/coupon/list',
				component: () => import('@shop/views/custom/coupon/List')
			},

			//订单模块
			{
				path: '/order/room-order/list',
				component: () => import('@shop/views/order/room-order/List')
			}, {
				path: '/order/room-refund/list',
				component: () => import('@shop/views/order/room-refund/List')
			},

			//交易模块
			{
				path: '/trade/pay-record/list',
				component: () => import('@shop/views/trade/pay-record/List')
			}, {
				path: '/trade/trade-record/list',
				component: () => import('@shop/views/trade/trade-record/List')
			},

		]
	},

	//店铺模块
	{
		path: '/shop/news/save',
		component: () => import('@shop/views/shop/news/Save')
	},


	//酒店模块
	{
		path: '/hotel/hotel/edit',
		component: () => import('@shop/views/hotel/hotel/edit/Index')
	},
	{
		path: '/hotel/hotel/edit/photo',
		component: () => import('@shop/views/hotel/hotel/edit/photo/Index')
	}, {
		path: '/hotel/hotel/edit/room',
		component: () => import('@shop/views/hotel/hotel/edit/room/Index')
	},
	
	//客户模块
	{
		path: '/custom/customer/detail',
		component: () => import('@shop/views/custom/customer/Detail')
	},

	//页面编辑器
	{
		path: '/page-editor/page/save',
		component: () => import('@shop/views/page-editor/page/Save')
	},

	//订单模块
	{	
		path: '/order/room-order/detail',
		component: () => import('@shop/views/order/room-order/Detail')
	},
	{
		path: '/order/room-refund/detail',
		component: () => import('@shop/views/order/room-refund/Detail')
	},
	
	//当前账户信息
	{
		path: '/curr-user/system',
		component: () => import('@shop/views/curr-user/System')
	},
	{
		path: '/curr-user/user',
		component: () => import('@shop/views/curr-user/user/Index')
	},
	{
		path: '/curr-user/edit-password',
		component: () => import('@shop/views/curr-user/EditPassword')
	},

	//登录
	{
		path: '/login',
		component: () => import('@shop/views/Login'),
		meta: {
			//跳过检查token
			skipCheckAuthToken: true
		}
	},
	//Test
	{
		path: '/test',
		component: () => import('@shop/views/Test'),
		meta: {
			//跳过检查token
			skipCheckAuthToken: true
		}
	},

	{
		path: '*',
		component: {
			template: `<div>404</div>`
		}
	}
]
export default routes
