import {
	request
} from './request'
import dictApi from '../api/dict'

/**
 * 数据字典
 */
export var dictData = {
	//列表
	data: {},
	//键值映射
	dataMap: {},
	//转换数据类型
	parseValue(value, type) {
		if (type == 'boolean') {
			return value=='true' ? true : false
		} else if (type == 'int') {
			return parseInt(value)
		} else if (type == 'float') {
			return parseFloat(value)
		}
		return value
	},
	//取值翻译
	value(dictKey, itemKey,parseValue) {
		if (this.dataMap[dictKey] && this.dataMap[dictKey][itemKey])
			return this.parseValue(this.dataMap[dictKey][itemKey].text,parseValue)
		return ''
	},
	//获取字典数据项列表
	list(dictKey) {
		return this.data[dictKey]
	},
	//将字典数据项列表转换为选项数组
	options(dictKey, filter,parseValue) {
		var options = []
		if (this.data[dictKey]) {
			var pushValues = [] 
			this.data[dictKey].forEach((item) => {
				if (filter) {
					//黑名单
					if(filter.black && filter.black.includes(item.value)){
						return
					}
					//白名单
					if(filter.white && !filter.white.includes(item.value)){
						return
					}
				} 
				options.push({
					value: this.parseValue(item.value,parseValue),
					label: item.text
				})
			})
		}
		return options
	},
	//加载数据字典
	load: async function() {
		await request(dictApi.queryAll({
			success: (response) => {
				var dataMap = {}
				var data = response.data.result
				for (var key in data) {
					var itemsMap = {}
					data[key].forEach((item) => {
						itemsMap[item.value] = item
					})
					dataMap[key] = itemsMap
				}
				this.data = data
				this.dataMap = dataMap
			}
		}))
	}
}


export default dictData
