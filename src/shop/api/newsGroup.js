import {get, post, put, del} from '@public/js/api'
import {strings} from '@public/js/util'

/**
 * 资讯分组
 */
export default {
   pageList: (params) => post('/article/queryPageArticleGroup', params),
   queryById: (params) => get('/article/getArticleGroupById', params),
   edit: (params) => post('/article/updateArticleGroup', params),
   add: (params) => post('/article/saveArticleGroup', params),
   delete: (params) => get('/article/deleteArticleGroup', params),
   list: (params) => get('/article/queryArticleGroupList', params)
}
