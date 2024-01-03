/**
 * 组件环境
 * 有些组件需要环境依赖，需要先设置环境变量
 */

export var envConfig = {
	//文件资源
	resource:{
		//图库
		image:{
			movePath:null,
			//批量传图api
			batchAddApi:null,
			//图库分类列表api
			categoryListApi:null,
			//图库列表api
			listApi:null,
		}
	},
	//页面编辑器
	pageEditor:{
		//设置跳转链接可选项
		setLinkOptions:[
			
		],
		//默认主题色
		theme:{
			colorPrimary:null,
			colorSecondary:null,
			colorThrice:null
		}
	}
}