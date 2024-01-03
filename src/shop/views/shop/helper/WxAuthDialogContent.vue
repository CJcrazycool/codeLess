<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small">
		<div class="form-body">
			<div v-if="!success" class="form-area">
				<qrCode :url="url" :check-api="wxAppApi.getAuthResult" :loading="loading" @scan-success="success = true;$emit('auth-success')">
					<template slot="title">请在有效时间内扫码授权</template>
					<template slot="desc">请将二维码提供给{{typeName}}管理员进行扫码授权</template>
				</qrCode>
			</div>
			<el-result v-else icon="success" title="授权成功" :subTitle="'已完成'+typeName+'授权'"></el-result>
		</div>
		<div class="form-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import wxAppApi from '@shop/api/wxApp'

	export default {
		props: {
			//type=1公众号，2小程序
			type:{}
		},
		components: {},
		data() {
			return {
				wxAppApi,
				url:null,
				loading:false,
				success:false
			}
		},
		computed: {
			typeName(){
				return this.type==1?'公众号':'小程序'
			}
		},
		watch: {},
		created() {
			this.loadQrCode()
		},
		methods: {
			loadQrCode(){
				this.$request.load(wxAppApi.getAuthUrl({
					params: {
						type:this.type,
					},
					before: () => {
						this.loading = true
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.url = response.data.result
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
