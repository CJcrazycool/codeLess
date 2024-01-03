import {get,post,put,del} from '@public/js/api'

/**
 * 商户素材
 */
export default {
	pageList:(params)=>post('/microPage/img/queryMicroImgMaterial',params),
	batchAdd:(params)=>post('/microPage/img/batchSaveMicroImgMaterial',params),
	delete: (params) => get('/microPage/img/removeByIdMicroImgMaterial', params),
	batchDelete: (params) => post('/microPage/img/removeByIdsMicroImgMaterial', params),
	batchMove: (params) => post('/microPage/img/batchMoveMicroImgMaterial', params),
	edit: (params) => post('/microPage/img/updateByIdMicroImgMaterial', params),
	queryById: (params) => get('/microPage/img/queryMicroImgMaterialById', params)
}