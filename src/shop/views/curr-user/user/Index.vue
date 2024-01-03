<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<tabHeader value="user"></tabHeader>
			<div v-if="loading == 1" class="loading" v-loading="true"></div>
			<div v-else>
				<el-descriptions title="用户信息" class="desc-view card" :colon="false" :column="2">
					<el-descriptions-item label="登录账号">{{data.account}}</el-descriptions-item>
					<el-descriptions-item label="登录密码"><span class="link" @click="$router.push('edit-password')">修改密码</span></el-descriptions-item>
					<el-descriptions-item label="账户角色">{{data.set?data.set.join(' '):''}}</el-descriptions-item>
					<el-descriptions-item label="最近登录时间">{{data.lastLoginTime}}</el-descriptions-item>
				</el-descriptions>
				<el-descriptions title="个人资料" class="desc-view card" :colon="false" :column="2">
					<el-descriptions-item label="真实姓名">{{data.realname}}</el-descriptions-item>
					<el-descriptions-item label="手机号">{{data.mobile}}</el-descriptions-item>
					<el-descriptions-item label-class-name="wx-label" label="绑定微信">
						<template v-if="!data.weixinId">未绑定</template>
						<thumbInfo class="desc-thumb" v-if="data.weixinId && wxUser" :image-url="wxUser.profilePhoto" :circle="true">
							<template slot="title">
								{{wxUser.name}}
							</template>
						</thumbInfo>
					</el-descriptions-item>
				</el-descriptions>
				<div>
					<el-button type="primary" size="small" @click="updateInfoVisible=true">修改资料</el-button>
					<el-button v-if="!data.weixinId" type="success" size="small" @click="wxAuthVisible=true">绑定微信</el-button>
					<el-popconfirm v-else class="span_btn" title="确认解绑微信？" placement="bottom-start" @confirm="unbind">
						<el-button slot="reference" type="danger" size="small" :loading="unbindLoading">解绑微信</el-button>
					</el-popconfirm>
				</div>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="绑定微信" :visible.sync="wxAuthVisible" width="560px"
		 @open="wxAuthAlive=true" @closed="wxAuthAlive=false;authClosed()">
			<wxAuth v-if="wxAuthAlive" :data="data" @cancel="wxAuthVisible=false" @auth-success="authSuccess"></wxAuth>
		</el-dialog>
		<el-dialog :append-to-body="true" title="修改资料" :visible.sync="updateInfoVisible" width="640px"
		 @open="updateInfoAlive=true" @closed="updateInfoAlive=false">
			<updateInfo v-if="updateInfoAlive" :data="data" @cancel="updateInfoVisible=false" @save="updateSuccess"></updateInfo>
		</el-dialog>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import updateInfo from './UpdateInfo'
	import wxAuth from './WxAuth'
	import tabHeader from '../Tab'
	import accessAuthApi from '@shop/api/accessAuth'
	import wxBindApi from '@shop/api/wxBind'
	
	export default {
		components:{
			innerPageLayout,
			tabHeader,
			updateInfo,
			wxAuth
		},
		data() {
			return {
				loading:0,
				data:{},
				wxUser:null,
				updateInfoVisible:false,
				updateInfoAlive:false,
				wxAuthVisible:false,
				wxAuthAlive:false,
				unbindLoading:false,
				isAuthSuccess:false
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.mergeLoad({
					before:()=>{
						this.loading = 1
					},
					success:()=>{
						this.loading = 2
					},
					error: () => {
						this.loading = 0
					},
					sync:true,
					list:[
						accessAuthApi.getLoginUserInfo({
							success: (response) => {
								if (!response.data.result) {
									throw new Error()
								}
								this.data = response.data.result
							}
						}),
						wxBindApi.getWxUserInfo({
							next:()=>{
								return this.data.weixinId?true:false
							},
							params: ()=>{
								return {
									openid:this.data.weixinId
								}
							},
							success: (response) => {
								if (!response.data.result) {
									throw new Error()
								}
								this.wxUser = {
									profilePhoto:response.data.result.profilePhoto,
									name:response.data.result.name
								}
							}
						})
					]
				})
			},
			unbind(){
				this.$request.submit(wxBindApi.unbind({
					data: this.form,
					before: () => {
						this.unbindLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.load()
					},
					successText: () => {
						return '解绑成功'
					},
					complete: () => {
						this.unbindLoading = false
					}
				}))
			},
			authSuccess(){
				this.isAuthSuccess = true
			},
			authClosed(){
				if(this.isAuthSuccess)
					this.load()
				this.isAuthSuccess = false
			},
			updateSuccess(){
				this.load()
				this.updateInfoVisible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>