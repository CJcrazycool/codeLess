<template>
	<innerPageLayout>
		<el-form class="inner-page-form" @submit.native.prevent ref="form" size="small">
			<div class="inner-page-center">
				<tabHeader value="wx"></tabHeader>
				<div v-if="loading==1" class="loading" v-loading="true"></div>
				<div v-else-if="loading==2" class="form-body">
					<div class="form-area-title">公众号配置</div>
					<div class="form-area">
						<el-row>
							<el-form-item label="原始ID">
								<div class="form-item-text">
									<textContent emptyText="未配置" :text="data.developerCode"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="公众号 APPID">
								<div class="form-item-text">
									<textContent emptyText="未配置" :text="data.appId">
										<el-tag class="span_left" :type="data.isAuthorization?'success':'danger'" size="small">{{data.isAuthorization?'已授权':'未授权'}}</el-tag>
										<template v-if="data.appId" slot="operate">
											<el-button v-if="data.isAuthorization" type="success" size="mini" @click="wxAuthVisible=true">重新授权</el-button>
											<el-button v-else type="danger" size="mini" @click="wxAuthVisible=true">扫码授权</el-button>
										</template>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="公众号密钥">
								<div class="form-item-text">
									<textContent emptyText="未配置" :text="data.appSecret" :hide="true"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button @click="wxConfigVisible=true" type="primary" size="small">修改配置</el-button>
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">小程序配置</div>
					<div class="form-area">
						<el-row>
							<el-form-item label="小程序 APPID">
								<div class="form-item-text">
									<textContent emptyText="未配置" :text="data.mpAppId"><el-tag class="span_left" :type="data.isMpAuthorization?'success':'danger'" size="small">{{data.isMpAuthorization?'已授权':'未授权'}}</el-tag>
										<template v-if="data.mpAppId" slot="operate">
											<el-button v-if="data.isMpAuthorization" type="success" size="mini" @click="wxMpAuthVisible=true">重新授权</el-button>
											<el-button v-else type="danger" size="mini" @click="wxMpAuthVisible=true">扫码授权</el-button>
										</template>
									</textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="小程序密钥">
								<div class="form-item-text">
									<textContent emptyText="未配置" :text="data.mpAppSecret" :hide="true"></textContent>
								</div>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button @click="wxAppConfigVisible=true" type="primary" size="small">修改配置</el-button>
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">资料存档</div>
					<div class="form-area">
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="公众号帐号">
									<div class="form-item-text">
										<textContent :text="data.account"></textContent>
									</div>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="公众号密码">
									<div class="form-item-text">
										<textContent :text="data.password" :hide="true"></textContent>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="小程序帐号">
									<div class="form-item-text">
										<textContent :text="data.mpAccount"></textContent>
									</div>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="小程序密码">
									<div class="form-item-text">
										<textContent :text="data.mpPassword" :hide="true"></textContent>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button @click="updateInfoVisible=true" type="primary" size="small">修改资料</el-button>
							</el-form-item>
						</el-row>
					</div>
				</div>
			</div>
		</el-form>
		<el-dialog :append-to-body="true" title="公众号配置" :visible.sync="wxConfigVisible" width="560px"
		 @open="wxConfigAlive=true" @closed="wxConfigAlive=false">
			<wxConfig v-if="wxConfigAlive" :data="data" @cancel="wxConfigVisible=false" @save="updateSuccess"></wxConfig>
		</el-dialog>
		<el-dialog :append-to-body="true" title="小程序配置" :visible.sync="wxAppConfigVisible" width="560px"
		 @open="wxAppConfigAlive=true" @closed="wxAppConfigAlive=false">
			<wxappConfig v-if="wxAppConfigAlive" :data="data" @cancel="wxAppConfigVisible=false" @save="updateSuccess"></wxappConfig>
		</el-dialog>
		<el-dialog :append-to-body="true" title="公众号授权" :visible.sync="wxAuthVisible" width="560px"
		 @open="wxAuthAlive=true" @closed="wxAuthAlive=false;authClosed()">
			<wxAuth v-if="wxAuthAlive" :company-id="data.companyId" :app-id="data.appId"  @cancel="wxAuthVisible=false" @auth-success="authSuccess"></wxAuth>
		</el-dialog>
		<el-dialog :append-to-body="true" title="小程序授权" :visible.sync="wxMpAuthVisible" width="560px"
		 @open="wxMpAuthAlive=true" @closed="wxMpAuthAlive=false;authClosed()">
			<wxAuth v-if="wxMpAuthAlive" :company-id="data.companyId" :mp-app-id="data.mpAppId"  @cancel="wxMpAuthVisible=false" @auth-success="authSuccess"></wxAuth>
		</el-dialog>
		<el-dialog :append-to-body="true" title="修改资料" :visible.sync="updateInfoVisible" width="640px"
		 @open="updateInfoAlive=true" @closed="updateInfoAlive=false">
			<updateInfo v-if="updateInfoAlive" :data="data" @cancel="updateInfoVisible=false" @save="updateSuccess"></updateInfo>
		</el-dialog>
	</innerPageLayout>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import tabHeader from '../Tab'
	import innerPageLayout from '@admin/components/InnerPageLayout'
	import tenantApi from '@admin/api/tenant'
	import wxappConfig from './WxappConfig'
	import wxConfig from './WxConfig'
	import wxAuth from './WxAuth'
	import updateInfo from './UpdateInfo'
	
	export default {
		components:{
			innerPageLayout,
			tabHeader,
			wxappConfig,
			wxConfig,
			wxAuth,
			updateInfo
		},
		data() {
			return {
				tenantApi,
				loading:2,
				data: {},
				wxAppConfigVisible:false,
				wxAppConfigAlive:false,
				wxConfigVisible:false,
				wxConfigAlive:false,
				wxAuthVisible:false,
				wxAuthAlive:false,
				wxMpAuthVisible:false,
				wxMpAuthAlive:false,
				updateInfoVisible:false,
				updateInfoAlive:false,
				isAuthSuccess:false
			}
		},
		watch: {
		},
		computed: {},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.loadWxInfo(this.$route.query.id)
			},
			loadWxInfo(id){
				this.$request.load(tenantApi.queryWxInfo({
					params: {
						companyId:id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.loading = 2
						this.data = response.data.result
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			updateSuccess(){
				this.wxAppConfigVisible=false
				this.wxConfigVisible=false
				this.wxAuthVisible = false
				this.wxMpAuthVisible = false
				this.updateInfoVisible = false
				this.load()
			},
			authSuccess(){
				this.isAuthSuccess = true
			},
			authClosed(){
				if(this.isAuthSuccess)
					this.load()
				this.isAuthSuccess = false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>