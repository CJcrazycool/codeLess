/**
 * 封装请求
 */
import axios from 'axios'
import Qs from 'qs'
import lodashCore from 'lodash/core'


//发送请求
export async function request(options) {
	options = options || {}
	var next = true
	if (options.next)
		next = options.next()
	if(!next)
		return
	if (options.before)
		options.before()
	await axios.create({
		...options
		//withCredentials: true
	}).request(options).then((response) => {
		if (options.success)
			options.success(response)
		if (options.complete)
			options.complete(response)
	}).catch((error) => {
		if (options.error)
			options.error(error.response,error)
		if (options.complete)
			options.complete(error.response,error)
		throw error
	});
}

//为组件注入request对象
function createComRequest(com) {
	return {
		cancelTokenIdPrefix: 'requestCancelToken_',
		cancelTokens: [],
		//创建cancelToken
		createCancelTokens() {
			const cancelTokenId = lodashCore.uniqueId(this.cancelTokenIdPrefix)
			const source = axios.CancelToken.source()
			var create = {
				id: cancelTokenId,
				source
			}
			this.cancelTokens.push(create)
			return create
		},
		//清空cancelToken
		clearCancelTokens(message) {
			for (let i in this.cancelTokens) {
				this.cancelTokens[i].source.cancel(message)
			}
			this.cancelTokens = []
		},
		//移除cancelToken
		removeCancelToken(id) {
			const i = this.cancelTokens.findIndex((item) => {
				return item.id == id
			})
			if (i >= 0)
				this.cancelTokens.splice(i, 1)
		},
		//发送请求
		async send(options) {
			options = options || {}
			const cancelToken = this.createCancelTokens()
			if(options.params && typeof(options.params)=='function'){
				options.params = options.params()
			}
			if(options.data && typeof(options.data)=='function'){
				options.data = options.data()
			}
			await request({
				cancelToken: cancelToken.source.token,
				...options,
				success:(response)=>{
					this.removeCancelToken(cancelToken.id)
					 if (response.data.code == '401') {
					 	com.$message({
					 		type:'error',
					 		message: '登录过期，请刷新页面重新登录'
					 	})
						throw new Error()
					 } else if (options.success){
						options.success(response)
					 }
				},
				error:(response,error)=>{
					this.removeCancelToken(cancelToken.id)
					if (axios.isCancel(error))
						return
					if (options.error)
						options.error(response,error)
				}
			})
		},
		//合并发送请求
		async mergeSend(options) {
			options = options || {}
			if(options.before)
				options.before()
			var allTask = []
			var success = true
			for(var i in options.list)
			{
				//请求按顺序同步执行
				if(options.sync){
					await this.send(options.list[i]).catch((error) => {
						success = false	
					})
				}else{
					allTask.push(this.send(options.list[i]).catch((error) => {
						success = false	
					}))
				}
			}
			if(allTask.length>0)
				await Promise.all(allTask)
			if(success && options.success)
				options.success()
			if(!success && options.error)
				options.error()
			if(options.complete)
				options.complete()
		},
		createLoadOptions(options){
			options = options || {}
			options.showErrorMessage = options.showErrorMessage == null ? true : options.showErrorMessage
			return options
		},
		loadError(options,response){
			if (options.showErrorMessage) {
				com.$message({
					type:'error',
					message: '加载失败，请稍后再试'
				})
			}
			if (options.error)
				options.error(response)
		},
		//加载数据
		async load(options) {
			options = this.createLoadOptions(options)
			await this.send({
				...options,
				error: (response) => {
					this.loadError(options,response)
				}
			})
		},
		//合并加载数据
		async mergeLoad(options) {
			options = this.createLoadOptions(options)
			await this.mergeSend({
				...options,
				error: () => {
					this.loadError(options)
				}
			})
		},
		createSubmitOptions(options){
			options = options || {}
			options.showSuccessMessage = options.showSuccessMessage == null ? true : options
				.showSuccessMessage
			options.showErrorMessage = options.showErrorMessage == null ? true : options
				.showErrorMessage
			return options
		},
		submitSuccess(options,response){
			if(response){
				var message = response?response.data.message:null
				if (response.data.success && options.showSuccessMessage) {
					if (options.successText)
						message = options.successText(response)
					if (options.showSuccessMessage == 'alert')
						com.$alert(message, '提示', {
							type: 'success',
							confirmButtonText: '确定',
						});
					else
						com.$message({
							type: 'success',
							message: message
						})
				} else if (!response.data.success && options
					.showErrorMessage) {
					com.$message({
						type: 'error',
						message: message
					})
				}
			}
			if (options.success)
				options.success(response)
		},
		submitError(options,response){
			if (options.showErrorMessage)
				com.$message({
					type: 'error',
					message: '提交失败，请稍后再试'
				})
			if (options.error)
				options.error(response)
		},
		//提交数据
		async submit(options) {
			options = this.createSubmitOptions(options)
			await this.send({
				...options,
				success: (response) => {
					this.submitSuccess(options,response)
				},
				error: (response) => {
					this.submitError(options,response)
				}
			})
		},
		//合并提交数据
		async mergeSubmit(options) {
			options = this.createSubmitOptions(options)
			await this.mergeSend({
				...options,
				error: () => {
					this.submitError(options)
				}
			})
		}
	}
}


export default {
	install(Vue) {
		Vue.mixin({
			beforeCreate() {
				this.$request = createComRequest(this)
			},
			destroyed() {
				//组件被销毁时将进行中的请求做中断处理，避免资源浪费
				this.$request.clearCancelTokens()
			}
		})
	}
}
