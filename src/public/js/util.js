/**
 * 工具类
 */
import {request} from './request'
import qiNiuApi from '@public/api/qiNiu'
import * as qiniu from 'qiniu-js'

//数据格式化
export const formatter = {
	//转换为文件kb大小
	getFileSizeToKB(value) {
		return parseFloat((value / 1024).toFixed(2)) + 'KB'
	},
	//date转化为日期格式文本
	getDateText(date) {
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
		var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		return Y + M + D + h + m + s
	},
	//金额格式化
	price(value) {
		return value.toFixed(2)
	},
	
};

//字符串工具
export const stringHelper = {
	//转数组并取值
	toArrayIndex(text,index){
		if(!text)
			return null
		if(!index)
			index = 0
		var result = null;
		var arr = text.split(',');
		if (arr.length > 0) {
		    result = arr[index];
		}
		return result
	}
};

//日期助手
export const dateHelper = {
	//获取最近日期范围
	getRecentDayRange(day) {
		const end = new Date();
		const start = new Date();
		start.setTime(start.getTime() - 3600 * 1000 * 24 * (day));
		start.setHours(0)
		start.setMinutes(0)
		start.setSeconds(0)
		end.setHours(23)
		end.setMinutes(59)
		end.setSeconds(59)
		return {
			start,
			end
		}
	},
	//根据时间获取date对象，例如传入09:00
	getDateByTime(value){
		let date = new Date()
		let dateArr = value.split(":")
		date.setHours(parseInt(dateArr[0])) 
		date.setMinutes(parseInt(dateArr[1]))
		return date
	}
}

//递归循环
export function recursionEach(data, handler, childrenKey = "children") {
	const recursion = (data) => {
		if (data)
			data.forEach((item) => {
				handler(item)
				if (item[childrenKey])
					recursion(item[childrenKey])
			})
	}
	recursion(data)
}

//表单验证错误时，滚动至文字提示
function scrollIntoErrorFormField(formCom) {
	var errorEls = formCom.fields.filter((item) => {
		return item.validateState === 'error';
	})
	if (errorEls) {
		errorEls[0].$el.scrollIntoView({
			block: 'center',
			behavior: 'smooth'
		})
	}
}

//同步表单验证，并自动滚动定位
export function validateForm(formCom) {
	var result = true
	formCom.validate((valid, items) => {
		if (!valid) {
			scrollIntoErrorFormField(formCom)
			result = false
		}
	})
	return result
}

//异步验证表单，并自动滚动定位
export async function asyncValidateForm(formCom, async) {
	var valid = true
	try {
		await formCom.validate()
	} catch (e) {
		valid = false
		scrollIntoErrorFormField(formCom)
	}
	return valid
}


//获取七牛url前缀
export function getQiniuUrlPrefix() {
	return '@qiniu'
}

//获取资源url路径
export function getResourceUrl(url) {
	if (!url)
		return ''
	var result = {
		url: null,
		storage: null
	}
	var qiniuPrefix = getQiniuUrlPrefix()
	if (url.search('^' + qiniuPrefix) >= 0) {
		result.url = url.replace(qiniuPrefix, 'http://res.gshis.net')
		result.storage = 'qiniu'
	} else {
		result.url = url
	}
	return result
}

//获取图片资源url路径，附带options选项，可提供图片缩略图生成
export function getImageResourceUrl(options) {
	if (!options)
		return ''
	if (typeof(options) == 'string') {
		options = {
			url: options
		}
	}
	var resourceUrl = getResourceUrl(options.url)
	if (resourceUrl.storage == 'qiniu') {
		if (options.thumbnail) {
			var presets = {
				'thumb': '50', //缩略图尺寸
				'mini': '100',
				'small': '300',
				'normal': '500',
				'large': '800'
			}
			var thumbnailValue = presets[options.thumbnail] ? presets[options.thumbnail] : options.thumbnail
			//resourceUrl.url += '?imageMogr2/thumbnail/' + thumbnailValue
			
			resourceUrl.url += '?imageView2/2/w/' + thumbnailValue
		}
	}
	return resourceUrl.url
}

//获取文件路径后缀名类型
export function getFileExtension(filePath){
	const fileExtension = filePath.match(/\.[^.]+$/)[0];
	return fileExtension
}

//获取七牛token
export async function getQiniuToken() {
	var token = null
	var key = null
	await request(qiNiuApi.getToken({
		success: (response) => {
			token = response.data.token
			key = response.data.key
		},
		error: (response) => {
			throw new Error('获取七牛云Token失败')
		}
	}))
	return {
		token,
		key
	}
}

//文件上传七牛
export function qiNiuUpload(file,next) {
	return new Promise(async (resolve, reject) => {
		//获取七牛token
		var qiNiuKey, qiNiuToken = null
		await getQiniuToken().then((result) => {
			qiNiuKey = result.key
			qiNiuToken = result.token
		}).catch((error) => {
			reject('token_error')
			throw error
		})
		var observable = qiniu.upload(file.raw, qiNiuKey, qiNiuToken, {}, {})
		var subscription = observable.subscribe({
			next: next,
			error: (error) => {
				reject('upload_error')
				throw new Error('七牛云文件上传失败')
			},
			complete: (response) => {
				const url = getQiniuUrlPrefix() + '/' + response.key
				resolve({
					response,
					url
				})
			},
		})
	})
}

//加载路径配置文件
export function loadPath(defaultResult, route, pathConfig) {
	defaultResult = defaultResult || {
		menuActive: null,
		pathName: []
	}

	function matchConfig(item, match) {
		if (route.path.match(match)) {
			if (item.menuActive) {
				defaultResult.menuActive = item.menuActive
			}
			if (item.pathName)
				defaultResult.pathName.push(item.pathName)
			if (item.subs)
				for (var i in item.subs) {
					var result = matchConfig(item.subs[i], match + item.subs[i].match)
					if (result)
						break
				}
			return true
		}
		return false
	}
	for (var i in pathConfig) {
		var result = matchConfig(pathConfig[i], pathConfig[i].match)
		if (result)
			break
	}
	return defaultResult
}

//睡眠方法，传入ms毫秒
export function sleep(ms) {  
  return new Promise(resolve => setTimeout(resolve, ms));  
}  

export default {
	install(Vue) {
		Vue.prototype.$formatter = formatter
		Vue.prototype.$stringHelper = stringHelper
	}
}
