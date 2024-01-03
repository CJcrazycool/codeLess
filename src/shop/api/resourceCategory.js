import {get,post,put,del} from '@public/js/api'

/**
 * 商户素材分类
 */
export default {
	queryById:(params)=>get('/microPage/img/queryMicroImgClassifyById',params),
	treeList:(params)=>get('/microPage/img/queryMicroImgClassifyTreeList',params),
	add:(params)=>post('/microPage/img/saveMicroImgClassify',params),
	edit:(params)=>post('/microPage/img/updateMicroImgClassify',params),
	delete: (params) => get('/microPage/img/deleteMicroImgClassify', params),
	sort:(params)=>post('/microPage/img/microImgClassifySort',params),
}