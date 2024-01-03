/**
 * 路由配置
 */
const routes = [{
		path: '/',
		redirect: '/home'
	}, {
		path: '/',
		component: () => import('@admin/views/Index'),
		children: [

			//主页
			{
				path: '/home',
				component: () => import('@admin/views/Home')
			},

			//开发者模块
			{
				path: '/dev/dict/list',
				component: () => import('@admin/views/dev/dict/List')
			},
			{
				path: '/dev/tenant-auth/list',
				component: () => import('@admin/views/dev/tenant-auth/List')
			},


			//租户模块
			{
				path: '/tenant/tenant/list',
				component: () => import('@admin/views/tenant/tenant/List')
			},

			//平台模块
			{
				path: '/platform/style/list',
				component: () => import('@admin/views/platform/style/List')
			},

			//微信服务商
			{
				path: '/wx/domain',
				component: () => import('@admin/views/wx/domain/Index')
			},
			{
				path: '/wx/wxapp/template/list',
				component: () => import('@admin/views/wx/wxapp/template/List')
			}, {
				path: '/wx/wxapp/template/draft',
				component: () => import('@admin/views/wx/wxapp/template/Draft')
			}, {
				path: '/wx/wxapp/examine-record/list',
				component: () => import('@admin/views/wx/wxapp/examine-record/List')
			},
		]
	},

	//租户环境
	// {
	// 	path: '/tenant/tenant/env',
	// 	component: () => import('@admin/views/tenant/tenant/env/wx/Index')
	// },
	{
		path: '/tenant/tenant/api-config',
		component: () => import('@admin/views/tenant/tenant/env/api-config/Index'),
	},
	
	//登录商户后台
	{
		path: '/login-shop',
		component: () => import('@admin/views/LoginShop')
	},

	//登录
	{
		path: '/login',
		component: () => import('@admin/views/Login'),
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
