import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { MessageBox } from 'element-ui';
import dataDict from '../js/dataDict'
import {recursionEach} from './util'

Vue.use(VueRouter)

//路由
export default class Router {
	//router对象
	instance=null
	//vue仓库实例
	store=null
	//用于判断路由是否完成第一次数据加载
	initLoaded = false
	//登录页面路径
	loginPath=null
	//登录令牌对象
	accessAuth=null
	//权限对象
	permission=null
	
	constructor(options){
		
		var router = new VueRouter({
			//默认跳转页面坐标设置在最顶部
			scrollBehavior(to, from, savedPosition) {
				if (savedPosition) {
					return savedPosition
				} else {
					return {
						x: 0,
						y: 0
					}
				}
			},
			...options
		})
		
		router.beforeEach(async (to, from, next) => {
			NProgress.start()
			//路由首次加载事件，一般用于全局加载必要的远程数据
			if(!this.initLoaded){
				this.store.commit('public/setPageLoading',1)
				try{
					await this.initLoad()
					this.initLoaded = true
				}catch(e){
					this.store.commit('public/setPageError','error')
					next()
					NProgress.done()
					throw e
				}finally{
					this.store.commit('public/setPageLoading',2)
				}
			}
			//每次页面跳转前都检查权限
			try{
				await this.accessControl(to,from,next,{
					//验证成功
					success:()=>{
						this.store.commit('public/setPageError',null)
						next()
						NProgress.done()
					},
					//token无效	
					tokenInvalid:()=>{
						this.store.commit('public/setPageError',null)
						this.accessAuth.clear()
						next({ path: this.loginPath });  
						NProgress.done()
					},
					//无权访问
					accessDeny:()=>{
						this.store.commit('public/setPageError','deny')
						next()
						NProgress.done()
					}
				})
			}catch(e){
				this.store.commit('public/setPageError','error')
				next()
				NProgress.done()
				throw e
			}
		});
		
		//跳转登录页面
		router.goLogin = ()=>{
			if(!this.loginPath)
				return
			router.replace({
				path:this.loginPath
			})
		}
		
		//在新窗口中打开链接
		router.openWindow = (option) => {
			window.open(router.resolve(option).href, '_blank');
		}
		
		this.instance = router
	}
	
	//路由首次加载时，远程加载页面必要数据
	async initLoad(){
		//加载数据字典
		await dataDict.load()
		Vue.prototype.$dataDict = dataDict
	}
	
	//检查当前path是否为有效path
	isValidPath(path){
		var isValid = false
		recursionEach(this.instance.options.routes,(item)=>{
			if(item.path == path){
				isValid = true
			}
		})
		return isValid
	}
	
	//登录、权限控制
	async accessControl(to, from, next,callback){
		//每次检查登录状态之前，都重新载入本地登录信息
		this.accessAuth.loadStorege()
		//判断当前路由是否需要跳过登录检查，或者是否为无效路由
		if(to.meta.skipCheckAuthToken || !this.isValidPath(to.path)){
			if(callback.success)
				callback.success()
			return
		}
		//验证token
		var tokenValid = null
		tokenValid = await this.accessAuth.checkToken()
		if(!tokenValid){
			//token失效
			if(callback.tokenInvalid)
				callback.tokenInvalid()
			return
		}
		//如果token有效，则检查是否有权限可访问该页面
		var validDeny = true
		if(this.permission){
			//每次跳转页面都要刷新权限集，确保权限集都是最新
			await this.permission.load()
			Vue.prototype.$permission = this.permission
			//白名单内的页面不做验证
			var inWhiteListList = this.permission.isPathInWhiteListList(to.path)
			if(!inWhiteListList){
				//检查当前route是否有权限访问
				var validDeny = this.permission.checkByPath(to.path)
			}
		}
		if(!validDeny){
			if(callback.accessDeny)
				callback.accessDeny()
		}else{
			if(callback.success)
				callback.success()
		}
	}
	
}