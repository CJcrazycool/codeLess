import {get, post, put, del} from '@public/js/api'
import {strings} from '@public/js/util'

/**
 * 资讯
 */
export default {
    pageList: (params) => post('/article/queryPageArticle', params),
    queryById: (params) => get('/article/getArticleById', params),
    edit: (params) => post('/article/updateArticle', params),
    add: (params) => post('/article/saveArticle', params),
    delete: (params) => get('/article/deleteArticle', params)
}
