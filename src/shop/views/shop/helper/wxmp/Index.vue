<template>
	<pagePanelNavLayout>
		<leftMenu slot="leftNav" value="wxmp"></leftMenu>
		<el-form @submit.native.prevent ref="form" size="small" label-position="left" label-width="150px">
			<div v-if="!info && infoLoading==1" class="loading" v-loading="true"></div>
			<template v-else-if="info || infoLoading == 2">
				<template v-if="!info.authorization">
					<el-alert :closable="false" title="提示" type="info">
						使用微信公众号管理员账号扫码进行授权，授权过程中请勾选所有权限以确保公众号功能完整性。如未注册公众号，可以直接前往 <span class="link">微信公众平台</span> 注册企业主体的公众号账号
					</el-alert>
					<wxAuth class="wxauth-content" :type="1">
						<template slot="success">
							<el-button type="primary" size="small" @click="authSuccess">继续</el-button>
						</template>
					</wxAuth>
				</template>
				<div v-else class="form-body">
					<div class="form-area-title top">基本信息</div>
					<div v-loading="infoLoading == 1" class="form-area">
						<el-row>
							<el-form-item label="公众号名称">
								<div class="form-item-text">
									<textContent :text="info.appletName"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="公众号头像">
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
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">配置信息</div>
					<div v-loading="infoLoading == 1" class="form-area">
						<el-row>
							<el-form-item label="公众号APPID">
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
		<el-dialog :append-to-body="true" title="公众号授权" :visible.sync="wxAppAuthVisible" width="560px"
			@open="wxAppAuthAlive=true" @closed="wxAppAuthAlive=false;">
			<wxAuthDialogContent v-if="wxAppAuthAlive" :type="1" @cancel="wxAppAuthVisible=false" @auth-success="authSuccess">
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
	import wxAuth from '../WxAuth'
	import wxAuthDialogContent from '../WxAuthDialogContent'
	import unWxAppAuth from '../UnWxAppAuth'

	export default {
		components: {
			leftMenu,
			wxAuth,
			wxAuthDialogContent,
			unWxAppAuth
		},
		data() {
			return {
				info: null,
				infoLoading: 0,
				updateLoading: false,
				uploadExperienceLoading:false,
				releaseVisible: false,
				releaseAlive: false,
				experienceVisible: false,
				experienceAlive: false,
				releaseRecordVisible: false,
				releaseRecordAlive: false,
				wxAppAuthVisible: false,
				wxAppAuthAlive: false,
				unAuthVisible: false
			}
		},
		computed: {
		},
		created() {
			this.loadInfo()
		},
		methods: {
			loadInfo() {
				this.$request.load(wxAppApi.queryMpInfo({
					before: () => {
						this.infoLoading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.info = response.data.result
						this.infoLoading = 2
					},
					error: (response) => {
						this.infoLoading = 0
					}
				}))
			},
			updateInfo() {
				this.$request.submit(wxAppApi.updateMpInfo({
					before: () => {
						this.updateLoading = true
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.loadInfo()
					},
					successText: () => {
						return '更新成功'
					},
					complete: (response) => {
						this.updateLoading = false
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
	
	.wxauth-content{
		margin-top: 60px;
	}
	
</style>
