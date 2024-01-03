import {get, post, put, del} from '@public/js/api'
import {strings} from '@public/js/util'

/**
 * 微页面组件
 */
export default {
	//查询文章资讯列表
	newPageList: (params) => post('/wx/article/queryPageArticle', params)
}
