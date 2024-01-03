import {
	envConfig
} from '@public/components/env.js'


import resourceApi from '@shop/api/resource'
import resourceCategoryApi from '@shop/api/resourceCategory'

/**
 * 组件环境
 * 有些组件需要环境依赖，需要先设置环境变量
 */
envConfig.resource.image.movePath = '/shop/resource/image/list'
envConfig.resource.image.batchAddApi = resourceApi.batchAdd
envConfig.resource.image.categoryListApi = resourceCategoryApi.treeList
envConfig.resource.image.listApi = resourceApi.pageList


envConfig.pageEditor.setLinkOptions = [ {
	value: 'hotel',
	label: '酒店',
	children: [{
		value: 'hotelDetail',
		label: '酒店详情'
	}, {
		value: 'hotelAll',
		label: '酒店列表'
	}]
},{
	value: 'user',
	label: '会员',
	children: [{
		value: 'user',
		label: '会员中心'
	}, {
		value: 'order',
		label: '我的订单'
	},{
		value: 'recharge',
		label: '充值中心'
	}]
},{
	value: 'system',
	label: '系统',
	children: [{
		value: 'index',
		label: '首页'
	}, {
		value: 'page',
		label: '微页面'
	}]
}]
