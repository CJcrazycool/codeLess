import {get,post,put,del} from '@public/js/api'
import {baseURL} from '@public/js/api'

/**
 *  微信小程序
 */
export default {
	//获取授权地址
	getAuthUrl: (params) => get('/appletInfo/getPreAuthCodes', params),
	//获取授权结果
	getAuthResult: (params) => get('/appletInfo/authorizationPublicNo', params),
	//获取小程序体验码url
	getExperienceAppUrl: (params) => get('/appletInfo/getAppletExperienceQrCode', params),
	//获取小程序码
	getAppQrcode: (params) => get('/appletInfo/qrCodeAppletUrl', params),
	//查询小程序信息
	queryAppInfo: (params) => get('/appletInfo/appletInfo', params),
	//更新小程序信息
	updateAppInfo: (params) => get('/appletInfo/synAppletInfo', params),
	//提交小程序体验版
	commitExperience: (params) => get('/appletInfo/commitAppletExperience', params),
	//提交审核
	commitExamine: (params) => get('/appletInfo/commitAppletAudit', params),
	//审核状态查询
	queryExamineInfo: (params) => get('/appletInfo/getLastAppletAudit', params),
	//添加体验权限
	addExperiencer: (params) => get('/appletInfo/bindExperience', params),
	//小程序版本信息
	queryAppVersion: (params) => get('/appletInfo/appletVersionInfo', params),
	
	
	//撤销小程序审核
	cancelExamine: (params) => get('/appletInfo/undoAppletAudit', params),
	//发布小程序
	commitRelease: (params) => get('/appletInfo/releaseApplet', params),
	
	//查询公众号信息
	queryMpInfo: (params) => get('/publicInfo/publicNoInfo', params),
	//更新公众号信息
	updateMpInfo: (params) => get('/publicInfo/synPublicNoInfo', params),
}
