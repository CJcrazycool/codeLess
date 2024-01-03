import accessAuthApi from '@shop/api/accessAuth'
import {request} from '@public/js/request'

export class Permission {
	
	queryPermissionKeyApi = null
	
	//权限集
	permissionMap = {}
	
	//路由权限配置
	routeConfig = {}
	
	async load() {
		var permissionMap = {}
		if(this.queryPermissionKeyApi)
			await request(this.queryPermissionKeyApi({
				success(response){
					permissionMap = response.data.result
				}
			}))
		this.permissionMap = permissionMap
	}
	clear(){
		this.permissionMap = {}
	}
	
	//检查权限
	check(code){
		if(this.permissionMap[code])
			return true
		return false
	}
	
	//传入路由path，检查权限
	checkByPath(path){
		var validDeny = false
		for(var key in this.routeConfig.verifyList){
			if(path.match(key)){
				if(this.check(this.routeConfig.verifyList[key])){
					validDeny = true
				}
				break
			}
		}
		return validDeny
	}
	
	//检查路由path，是否在权限白名单内，用于判断如果在白名单内则不做验证
	isPathInWhiteListList(path){
		var inWhiteListList = false
		for(var i in this.routeConfig.whiteList){
			if(path.match(this.routeConfig.whiteList[i])){
				inWhiteListList = true
				break
			}
		}
		return inWhiteListList
	}
}