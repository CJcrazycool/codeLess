<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small">
		<div class="form-body">
			<div class="form-area">
				<qrCode :loading="loading" :src="url"></qrCode>
			</div>
		</div>
		<div class="form-footer">
			<el-button class="span_btn" size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import wxAppApi from '@shop/api/wxApp'
	
	export default {
		props:{
		},
		components: {
		},
		data() {
			return {
				loading:false,
				url:null
			}
		},
		computed: {},
		created() {
			this.loadQrCode()
		},
		methods: {
			loadQrCode(){
				this.$request.load(wxAppApi.getAppQrcode({
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
</style>
