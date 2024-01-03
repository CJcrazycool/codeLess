<template>
	<pagePanelNavLayout>
		<leftMenu slot="leftNav" value="wxapp"></leftMenu>
		<el-form @submit.native.prevent ref="form" size="small" label-position="left" label-width="150px">
			<div class="steps">
				<el-steps :active="currStep" finish-status="success" process-status="process">
					<el-step title="扫码授权小程序" description="使用微信小程序管理员账号完成扫码授权" ></el-step>
					<el-step title="提交版本审核" description="将小程序发布至体验版，并提交微信官方等待审核">
					</el-step>
					<el-step title="发布至正式版" description="审核通过后，发布至正式版本即可完成上线"></el-step>
					<el-step title="完成小程序上线" description="恭喜您！小程序已搭建完成"></el-step>
				</el-steps>
			</div>
			<div v-if="!info && infoLoading==1" class="loading" v-loading="true"></div>
			<template v-else-if="info || infoLoading == 2">
				<template v-if="!info.authorization">
					<el-alert :closable="false" title="提示" type="info">
						使用微信小程序管理员账号扫码进行授权，授权过程中请勾选所有权限以确保小程序功能完整性。如未注册小程序，可以从公众号后台免微信认证创建小程序或直接前往 <span class="link">微信公众平台</span> 注册企业主体的小程序账号
					</el-alert>
					<wxAuth class="wxauth-content" :type="2">
						<template slot="success">
							<el-button type="primary" size="small" @click="authSuccess">继续</el-button>
						</template>
					</wxAuth>
				</template>
				<div v-else class="form-body">
					<div class="form-area-title top">基本信息</div>
					<div v-loading="infoLoading == 1" class="form-area">
						<el-row>
							<el-form-item label="小程序名称">
								<div class="form-item-text">
									<textContent :text="info.appletName"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="小程序头像">
								<div class="form-item-text">
									<textContent>
										<thumbInfo class="text-content-thumb" :image-url="info.headImg" :circle="true"></thumbInfo>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="介绍">
								<div class="form-item-text">
									<textContent :text="info.signature"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="服务类目">
								<div class="form-item-text">
									<textContent>
										<template v-for="categorie in info.categories">
											{{categorie.first}} > {{categorie.second}}<br />
										</template>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="主体信息">
								<div class="form-item-text">
									<textContent :text="info.principalName"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="认证方式">
								<div class="form-item-text">
									<textContent :text="info.verifyType_EnumText"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button v-if="!info.authorization" type="primary" size="small"
									@click="wxAppAuthVisible=true">扫码授权</el-button>
								<el-button v-else type="danger" size="small" @click="unAuthVisible = true">解除授权</el-button>
								<el-button v-if="info.authorization" type="primary" size="small" :loading="updateLoading"
									@click="updateInfo">更新资料</el-button>
								<!-- <div class="form-item-tip">使用微信小程序管理员账号扫码进行授权，授权过程中请勾选所有权限以确保小程序功能完整性。如未注册小程序，可以前往 <span
										class="link">微信公众平台</span> 注册企业主体的小程序账号</div> -->
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">版本信息</div>
					<div v-loading="versionLoading == 1" class="form-area">
						<template v-if="examineInfo">
							<el-alert v-if="isExaminePending" class="version-alert" :closable="false" title="审核中" type="warning" show-icon>
								<div>
									<div>版本号：{{examineInfo.appletVersion}} 审核中，审核通过即可发布至小程序正式版</div>
									<div class="operate">
										<el-popconfirm @confirm="cancelExamine(examineInfo.auditId)" title="确认撤回审核？"
											placement="bottom-end">
											<el-button type="primary" size="mini" :loading="cancelExamineLoading" slot="reference">撤回审核</el-button>
										</el-popconfirm>
									</div>
								</div>
							</el-alert>
							<el-alert v-else-if="examineInfo.auditState =='SUCCESS'" class="version-alert" :closable="false" title="审核通过" type="success" show-icon>
								<div>
									<div>版本号：{{examineInfo.appletVersion}} 已审核通过</div>
									<div class="operate">
										<el-popconfirm @confirm="commitRelease(examineInfo.auditId)" title="确认发布至正式版？"
											placement="bottom-end">
											<countDownButton slot="reference" size="mini" task-key="wxappCommitRelease" type="primary" :loading="commitReleaseLoading" ref="commitReleaseButton" :time="30">发布至正式版</countDownButton>
										</el-popconfirm>
									</div>
								</div>
							</el-alert>
							<el-alert v-else-if="examineInfo.auditState =='FAILURE'" class="version-alert" :closable="false" title="审核失败" type="error" show-icon>
								<div>
									版本号：{{examineInfo.appletVersion}} 审核失败{{examineInfo.reason?'：'+examineInfo.reason:''}}
								</div>
							</el-alert>
							<el-alert v-else-if="examineInfo.auditState =='PUBLISH'" class="version-alert" :closable="false" title="发布成功" type="success" show-icon>
								<div>
									<div>版本号：{{examineInfo.appletVersion}} 已发布正式版</div>
								</div>
							</el-alert>
						</template>
						<el-row>
							<el-form-item label="最新版本号">
								<div class="form-item-text">
									<textContent empty-text="暂无新版" :text="versionInfo && versionInfo.template?versionInfo.template.appletVersion:''">
										<el-tag v-if="hasNewVersion" class="span_left" size="mini">可更新</el-tag>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="体验版版本号">
								<div class="form-item-text">
									<textContent empty-text="未发布" :text="versionInfo && versionInfo.expInfo?versionInfo.expInfo.expVersion:''">
										<i title="小程序体验码" slot="operate" class="ext-iconfont ext-icon-qrcode link version-qrcode" @click="experienceQrcodeVisible=true"></i>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="正式版版本号">
								<div class="form-item-text">
									<textContent empty-text="未发布" :text="versionInfo && versionInfo.releaseInfo?versionInfo.releaseInfo.releaseVersion:''">
										<i title="小程序码" slot="operate" class="ext-iconfont ext-icon-qrcode link version-qrcode" @click="releaseQrcodeVisible=true"></i>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="更新时间">
								<div class="form-item-text">
									<textContent empty-text="未发布" :text="versionInfo && versionInfo.releaseInfo?versionInfo.releaseInfo.releaseTime:''"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item>
								<countDownButton task-key="wxappCommitExperience" type="primary" size="small" :loading="uploadExperienceLoading" @click="commitExperience" ref="commitExperienceButton" :time="30">{{hasNewVersion?'更新至体验版':'发布至体验版'}}</countDownButton>
								<!-- <el-button type="text" size="small" @click="releaseRecordVisible=true">审核记录</el-button> -->
								<div class="form-item-tip">发布至正式版之前，需要先发布至体验版提交审核</div>
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">配置信息</div>
					<div v-loading="infoLoading == 1" class="form-area">
						<el-row>
							<el-form-item label="小程序APPID">
								<div class="form-item-text">
									<textContent :text="info.appId"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="原始ID">
								<div class="form-item-text">
									<textContent :text="info.userName"></textContent>
								</div>
							</el-form-item>
						</el-row>
					</div>
				</div>
			</template>
		</el-form>
		<el-dialog :append-to-body="true" title="发布小程序" :visible.sync="releaseVisible" width="560px"
			@open="releaseAlive=true" @closed="releaseAlive=false">
			<experienceCode v-if="releaseAlive" @cancel="releaseVisible=false">
				<template slot="alert">
					<el-alert v-if="isExaminePending" class="release-dialog-alert" :show-icon="true" :closable="false" title="小程序审核中，如需重新提交审核，请先撤回审核或等待微信完成审核" type="warning"></el-alert>
					<el-alert v-if="isVersionSame" class="release-dialog-alert" :show-icon="true" :closable="false" title="小程序正式版已为最新版，无需重复提交审核" type="success"></el-alert>
				</template>
				<template slot="title">
					已发布至小程序体验版
				</template>
				<template slot="desc">
					如需发布至小程序正式版，请提交微信审核并等待审核通过
				</template>
				<template slot="operate">
					<el-popconfirm @confirm="commitExamine" title="确认提交微信审核？"
						placement="bottom-end">
						<el-button :disabled="examineLoading != 2 || isExaminePending || isVersionSame" type="primary" size="small" :loading="commitExamineLoading" slot="reference">提交审核</el-button>
					</el-popconfirm>
				</template>
			</experienceCode>
		</el-dialog>
		<el-dialog :append-to-body="true" title="小程序体验码" :visible.sync="experienceQrcodeVisible" width="400px"
			@open="experienceQrcodeAlive=true" @closed="experienceQrcodeAlive=false">
			<experienceCode v-if="experienceQrcodeAlive" @cancel="experienceQrcodeVisible=false"></experienceCode>
		</el-dialog>
		<el-dialog :append-to-body="true" title="小程序码" :visible.sync="releaseQrcodeVisible" width="400px"
			@open="releaseQrcodeAlive=true" @closed="releaseQrcodeAlive=false">
			<appCode v-if="releaseQrcodeAlive" @cancel="releaseQrcodeVisible=false"></appCode>
		</el-dialog>
		<el-drawer :append-to-body="true" title="审核记录" :visible.sync="releaseRecordVisible" size="1000px"
			@open="releaseRecordAlive=true" @closed="releaseRecordAlive=false">
			<ReleaseRecord v-if="releaseRecordAlive" @cancel="releaseRecordVisible=false"></ReleaseRecord>
		</el-drawer>
		<el-dialog :append-to-body="true" title="小程序授权" :visible.sync="wxAppAuthVisible" width="560px"
			@open="wxAppAuthAlive=true" @closed="wxAppAuthAlive=false;">
			<wxAuthDialogContent v-if="wxAppAuthAlive" :type="2" @cancel="wxAppAuthVisible=false" @auth-success="authSuccess">
			</wxAuthDialogContent>
		</el-dialog>
		<el-dialog top="10vh" :append-to-body="true" title="解除授权" :visible.sync="unAuthVisible" width="800px">
			<unWxAppAuth @cancel="unAuthVisible = false"></unWxAppAuth>
		</el-dialog>
	</pagePanelNavLayout>
</template>

<script>
	import wxAppApi from '@shop/api/wxApp'
	import leftMenu from '../LeftMenu'
	import experienceCode from './ExperienceCode'
	import appCode from './AppCode'
	import releaseRecord from './ReleaseRecord'
	import wxAuth from '../WxAuth'
	import wxAuthDialogContent from '../WxAuthDialogContent'
	import unWxAppAuth from '../UnWxAppAuth'

	export default {
		components: {
			experienceCode,
			appCode,
			releaseRecord,
			leftMenu,
			wxAuth,
			wxAuthDialogContent,
			unWxAppAuth
		},
		data() {
			return {
				//小程序信息
				infoLoading: 0,
				info: null,
				//小程序审核记录
				examineLoading: 0,
				examineInfo:null,
				//小程序版本
				versionLoading: 0,
				versionInfo:null,
				//提交loading
				updateLoading: false,
				uploadExperienceLoading:false,
				commitExamineLoading:false,
				cancelExamineLoading:false,
				commitReleaseLoading:false,
				//发布小程序窗口
				releaseVisible: false,
				releaseAlive: false,
				//小程序码窗口
				releaseQrcodeVisible: false,
				releaseQrcodeAlive: false,
				//小程序体验码窗口
				experienceQrcodeVisible: false,
				experienceQrcodeAlive: false,
				//发布记录窗口
				releaseRecordVisible: false,
				releaseRecordAlive: false,
				//微信小程序授权绑定认证窗口
				wxAppAuthVisible: false,
				wxAppAuthAlive: false,
				//微信小程序取消授权窗口
				unAuthVisible: false
			}
		},
		computed: {
			//判断是否小程序审核中
			isExaminePending(){
				return this.examineInfo && (this.examineInfo.auditState =='PENDING' || this.examineInfo.auditState =='DEFERRED')
			},
			//判断是否有新版本
			hasNewVersion(){
				if((this.versionInfo && this.versionInfo.releaseInfo && this.versionInfo.template ) 
					&& this.versionInfo.releaseInfo.releaseVersion != this.versionInfo.template.appletVersion){
					return true
				}
				return false
			},
			//判断线上版本和体验版本是否版本一致
			isVersionSame(){
				if((this.versionInfo && this.versionInfo.releaseInfo && this.versionInfo.expInfo )
					&& this.versionInfo.releaseInfo.releaseVersion == this.versionInfo.expInfo.expVersion){
					return true
				}
				return false
			},
			//当前进度条
			currStep() {
				//如果小程序信息未加载成功，则不显示任何进度
				if (this.infoLoading != 2 && !this.info)
					return -1
				//如果有正式版本，则显示开店完成
				if(this.versionInfo && this.versionInfo.releaseInfo)
					return 4
				//如果存在审核记录，并且最近一次记录状态为审核成功，则显示发布小程序
				if(this.examineInfo && this.examineInfo.auditState == 'SUCCESS')
					return 2
				//如果小程序认证成功，则显示提交版本审核
				if (this.info.authorization)
					return 1
				//如果小程序未认证，则显示扫码授权小程序
				if (!this.info.authorization)
					return 0
			}
		},
		async created() {
			await this.loadInfo()
			this.loadExamineInfo()
			this.loadVersionInfo()
		},
		methods: {
			//加载小程序信息
			async loadInfo(success) {
				await this.$request.load(wxAppApi.queryAppInfo({
					before: () => {
						this.infoLoading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.info = response.data.result
						this.info.categories = JSON.parse(this.info.categories)
						this.infoLoading = 2
					},
					error: (response) => {
						this.infoLoading = 0
					}
				}))
			},
			//加载审核信息
			async loadExamineInfo(){
				await this.$request.load(wxAppApi.queryExamineInfo({
					before: () => {
						this.examineLoading = 1
					},
					success: (response) => {
						if(response.data.success && response.data.result)
							this.examineInfo = response.data.result
						// this.examineInfo.auditState = 'PUBLISH'
						this.examineLoading = 2
					},
					error: (response) => {
						this.examineLoading = 0
					}
				}))
			},
			//加载小程序版本信息
			async loadVersionInfo() {
				await this.$request.load(wxAppApi.queryAppVersion({
					before: () => {
						this.versionLoading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.versionInfo = response.data.result
						// this.versionInfo.releaseInfo = {
						// 	releaseVersion:'jkd_1.0.2023.11.28.1606'
						// }
						this.versionLoading = 2
					},
					error: (response) => {
						this.versionLoading = 0
					}
				}))
			},
			//更新小程序信息
			updateInfo() {
				this.$request.submit(wxAppApi.updateAppInfo({
					before: () => {
						this.updateLoading = true
					},
					success: (response) => {
						if (response.data.success) {
							this.loadInfo()
						}
					},
					successText: () => {
						return '更新成功'
					},
					complete: (response) => {
						this.updateLoading = false
					}
				}))
			},
			//发布到体验版
			commitExperience(){
				this.$request.submit(wxAppApi.commitExperience({
					showSuccessMessage:false,
					before: () => {
						this.uploadExperienceLoading = true
					},
					success: async (response) => {
						if (response.data.success) {
							await this.loadVersionInfo()
							this.releaseVisible = true
						}
						this.$refs.commitExperienceButton.beginCountDown()
						this.uploadExperienceLoading = false
					},
					error: (response) => {
						this.uploadExperienceLoading = false
					}
				}))
			},
			//体验版提交审核
			commitExamine(){
				this.$request.submit(wxAppApi.commitExamine({
					before: () => {
						this.commitExamineLoading = true
					},
					success: (response) => {
						if (response.data.success) {
							this.releaseVisible = false
							this.loadExamineInfo()
							this.loadVersionInfo()
						}
					},
					successText:()=>{
						return '提交成功，请等待微信官方审核'
					},
					complete: (response) => {
						this.commitExamineLoading = false
					}
				}))
			},
			//撤回审核
			cancelExamine(auditId){
				this.$request.submit(wxAppApi.cancelExamine({
					params:{
						auditId
					},
					before: () => {
						this.cancelExamineLoading = true
					},
					success: (response) => {
						if (response.data.success) {
							this.loadExamineInfo()
						}
					},
					successText:()=>{
						return '已撤回审核'
					},
					complete: (response) => {
						this.cancelExamineLoading = false
					}
				}))
			},
			//发布正式版本小程序
			commitRelease(auditId){
				this.$request.submit(wxAppApi.commitRelease({
					params:{
						auditId
					},
					before: () => {
						this.commitReleaseLoading = true
					},
					success: (response) => {
						if (response.data.success) {
							this.loadExamineInfo()
							this.loadVersionInfo()
						}
						this.$refs.commitReleaseButton.beginCountDown()
					},
					successText:()=>{
						return '已发布至小程序正式版'
					},
					complete: (response) => {
						this.commitReleaseLoading = false
					}
				}))
			},
			authSuccess() {
				this.loadInfo()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.version-qrcode{
		font-size: 22px;
	}
	
	.steps {
		padding: 20px 20px;
		margin-bottom: 35px;
	}
	
	.wxauth-content{
		margin-top: 60px;
	}
	
	.release-dialog-alert{
		margin-bottom: 40px;
	}

	::v-deep .version-alert {
		margin-bottom: 30px;

		.el-alert__content {
			width: 100%;
			position: relative;
		}

		.operate {
			position: absolute;
			top: 6px;
			right: 0px;
		}
	}
</style>
