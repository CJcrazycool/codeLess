import {get,post,put,del} from '@public/js/api'

/**
 * 租户权限集
 */
export default {
	treeList:(params)=>get('/admin/menu/menuTreeList',params),
	queryById:(params)=>get('/admin/menu/queryById',params),
	add:(params)=>post('/admin/menu/add',params),
	edit:(params)=>post('/admin/menu/edit',params),
	delete:(params)=>get('/admin/menu/delete',params),
	sort:(params)=>post('/microPage/sortType',params),
}