import {get,post,put,del} from '@public/js/api'

/**
 * 微页面
 */
export default {
	pageList: (params) => post('/microPage/queryPageList', params),
	queryById: (params) => get('/microPage/queryById', params),
	setQueryPageList:(params) => post('/microPage/setQueryPageList', params),
	add: (params) => post('/microPage/add', params),
	edit: (params) => post('/microPage/edit', params),
	delete: (params) => get('/microPage/delete', params),
	setIndex: (params) => get('/microPage/setIndex', params),
	batchRelease: (params) => post('/microPage/batchRelease', params),
	batchDraftTransfer: (params) => post('/microPage/batchDraftTransfer', params),	
}
