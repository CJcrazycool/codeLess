/**
 * 路径配置
 */
const pathConfig = [{
		match: '^/home',
		menuActive: '/home',
		pathName: '主页'
	}, {
		match: '^/dev',
		pathName: '开发者',
		subs: [{
			menuActive: '/dev/dict/list',
			match: '/dict',
			pathName: '数据字典'
		}, {
			menuActive: '/dev/tenant-auth/list',
			match: '/tenant-auth',
			pathName: '租户权限集'
		}]
	},
	{
		match: '^/platform',
		pathName: '平台管理',
		subs: [{

			menuActive: '/platform/style/list',
			match: '/style',
			pathName: '预设主题'
		}]
	}, {
		match: '^/tenant',
		subs: [{
			menuActive: '/tenant/tenant/list',
			match: '/tenant',
			pathName: '租户开通'
		}]
	}, {
		match: '^/wx',
		pathName: '微信服务商',
		subs: [{
			menuActive: '/wx/domain',
			match: '/domain',
			pathName: '域名白名单'
		}, {
			match: '/wxapp',
			pathName: '微信小程序',
			subs: [{
				menuActive: '/wx/wxapp/template/list',
				match: '/template',
				subs: [{
					match: '/list',
					pathName: '模板库'
				}, {
					match: '/draft',
					pathName: '草稿箱'
				}]
			}, {
				menuActive: '/wx/wxapp/examine-record/list',
				match: '/examine-record',
				pathName: '审核记录'
			}]
		}]
	}
]
export default pathConfig
