import {get,post,put,del} from '@public/js/api'

/**
 * 微页面分类
 */
export default {
	treeList:(params)=>get('/microPage/treeList',params),
	queryById:(params)=>get('/microPage/queryTypeById',params),
	add:(params)=>post('/microPage/addType',params),
	edit:(params)=>post('/microPage/editType',params),
	delete:(params)=>get('/microPage/deleteType',params),
	sort:(params)=>post('/microPage/sortType',params),
}