import {get,post,put,del} from '@public/js/api'

/**
 * 数据字典
 */
export default {
	ditcPageList: (params) => post('/admin/dict/queryDictPageList', params),
	addDict: (params) => post('/admin/dict/addDict', params),
	editDict: (params) => post('/admin/dict/editDict', params),
	deleteDict: (params) => get('/admin/dict/deleteDict', params),
	queryDictById: (params) => get('/admin/dict/queryDictById', params),
	verifyDict: (params) => get('/admin/dict/verifyDict', params),
	
	dictItemList:(params) => get('/admin/dict/dictItemList', params),
	addDictItem: (params) => post('/admin/dict/addDictItem', params),
	editDictItem: (params) => post('/admin/dict/editDictItem', params),
	deleteDictItem: (params) => get('/admin/dict/deleteDictItem', params),
	queryDictItemById: (params) => get('/admin/dict/queryDictItemById', params),
	verifyDictItem: (params) => get('/admin/dict/verifyDictItem', params),
	batchAddDictItems: (params) => get('/admin/dict/batchAddDictItems', params),
}
