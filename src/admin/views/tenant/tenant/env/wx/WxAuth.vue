<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small">
		<div class="form-body">
			<div v-if="!success" class="form-area">
				<qrCode :url="url" :loading="loading">
					<template slot="title">请在有效时间内扫码授权</template>
					<template slot="desc">请将二维码提供给小程序管理员进行扫码授权</template>
				</qrCode>
			</div>
			<el-result v-else icon="success" title="授权成功" subTitle="已完成公众号授权"></el-result>
		</div>
		<div class="form-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import tenantApi from '@admin/api/tenant'

	export default {
		props: {
			companyId:{},
			appId:{},
			mpAppId:{}
		},
		components: {},
		data() {
			return {
				url:null,
				loading:false,
				success:false,
				checkTime : 3*1000,
				clearAutoCheckResult:false
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadQrCode()
		},
		beforeDestroy(){
			this.clearAutoCheckResult = true
		},
		methods: {
			autoCheckResult(){
				if(this.clearAutoCheckResult)
					return
				this.$request.load(tenantApi.checkAuthResult({
					params: {
						appId:this.appId?this.appId:this.mpAppId
					},
					success: (response) => {
						if(response.data.success){
							this.success = true
							this.$emit('auth-success')
						}else{
							setTimeout(()=>{
								this.autoCheckResult()
							},this.checkTime)
						}
					}
				}))
			},
			loadQrCode(){
				this.$request.load(tenantApi.getAuthUrl({
					params: {
						appId:this.appId,
						mpAppId:this.mpAppId
					},
					before: () => {
						this.loading = true
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.url = response.data.result
						setTimeout(()=>{
							this.autoCheckResult()
						},this.checkTime)
					},
					complete: (response) => {
						this.loading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-body{
		min-height: 280px;
	}
</style>
