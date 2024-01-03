import {get,post,put,del} from '@public/js/api'

/**
 * 数据统计
 */
export default {

	//今日实时数据
	todayData: (params) => get('/dataStatistics/realTimeData', params),
	//数据趋势图
	tendencyData: (params) => get('/dataStatistics/dataTendency', params),
	//待办任务
	missionData: (params) => get('/dataStatistics/pendingOrder', params),
	
}
