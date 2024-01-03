/**
 * API工具
 */

/*
3.0测试环境

商户后台
https://eshoptest.gshis.net/jkd/shop.html
运营后台
https://eshoptest.gshis.net/jkd/admin.html
接口地址
https://eshoptest.gshis.net/jxd-weixin
文档
https://eshoptest.gshis.net/jxd-weixin/doc.html
*/


export var baseURL = process.env.VUE_APP_BASE_URL;
console.log("env：", process.env);


export function request(url, method, params) {
    return {
        baseURL,
        url,
        method,
        ...params
    }
}

export function get(url, params) {
    return request(url, 'get', params)
}

export function post(url, params) {
    return request(url, 'post', params)
}

export function put(url, params) {
    return request(url, 'put', params)
}

export function del(url, params) {
    return request(url, 'delete', params)
}

export const dataConvertor = {
    //移动树节点，将数据封装为接口接受的数据格式
    dropNode: (node, target, type, idKey) => {
        idKey = idKey || 'id'
        var data = {
            id: node.data[idKey],
            ids: null,
            parentId: null
        }
        var ids = []
        var sortNodes = null
        var parentId = null
        if (type == 'inner') {
            parentId = target.data[idKey]
            sortNodes = target.childNodes
        } else {
            parentId = target.parent.level == 0 ? null : target.parent.data[idKey]
            sortNodes = target.parent.childNodes
        }
        for (var i in sortNodes) {
            if (sortNodes[i].data[idKey] == '') {
                continue
            }
            ids.push(sortNodes[i].data[idKey])
        }
        data.ids = ids
        data.parentId = parentId
        return data
    }
}
