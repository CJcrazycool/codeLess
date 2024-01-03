<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small">
		<div class="form-body">
			<div v-if="!success" class="form-area">
				<qrCode :url="url" :loading="loading" :check-api="wxBindApi.checkBindResult" @scan-success="success = true;$emit('auth-success')">
					<template slot="title">请在有效时间内扫码绑定</template>
					<template slot="desc">请使用微信扫一扫功能完成账户绑定</template>
					<el-button slot="operate" icon="el-icon-refresh-right" type="text" size="small" @click="loadQrCode">刷新二维码</el-button>
				</qrCode>
			</div>
			<el-result v-else icon="success" title="绑定成功" subTitle="已完成微信绑定"></el-result>
		</div>
		<div class="form-footer">
			<el-button size="small" @click="$emit('cancel')">{{success?'完成':'取消'}}</el-button>
		</div>
	</el-form>
</template>

<script>
	import wxBindApi from '@shop/api/wxBind'
	
	export default {
		props: {
			data:{}
		},
		components: {},
		data() {
			return {
				wxBindApi,
				loading:0,
				url:null,
				success:false
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
			loadQrCode(){
				this.$request.load(wxBindApi.getBindUrl({
					params: {
					},
					before: () => {
						this.loading = true
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.url = wxBindApi.getWxUserAuthUrl(response.data.result)
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
