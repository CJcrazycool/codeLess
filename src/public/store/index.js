import Vue from 'vue'
import Vuex from 'vuex'
import {envConfig} from '@public/components/env'

const store = {
	namespaced: true,
	state: {
		appViewKey:0,
		accessAuth:null,
		//数据字典
		dataDict:{},
		//页面错误状态，error页面加载错误，deny无权限访问
		pageError:null,
		//页面载入状态，0未加载完成，1加载中，2加载完成
		pageLoading:0,
		//组件环境配置
		componentsEnvConfig:envConfig
	},
	mutations: {
		updateAppViewKey(state){
			state.appViewKey++
		},
		updateAccessAuth(state,value){
			state.accessAuth = value
		},
		setDataDict(state,value){
			state.dataDict = value
		},
		setPageError(state,value){
			state.pageError = value
		},
		setPageLoading(state,value){
			state.pageLoading = value
		},
		setComponentsEnv(state,value){
			state.envConfig = value
		}
	}
}

export default store
