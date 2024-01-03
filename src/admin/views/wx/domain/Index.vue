<template>
	<div class="page-panel" v-loading="loading==1">
		<el-form class="page-panel-form" :rules="rules" :model="form" ref="form" size="small" label-position="left"
			label-width="130px">
			<div class="form-body setting-form-body">
				<div v-loading="loading == 1">
					<div class="form-area-title top">域名白名单配置</div>
					<div class="form-area limit-width">
						<el-form-item label="服务器域名">
							<el-input class="textarea-large" type="textarea" placeholder="请填写服务器域名" v-model="form.serverDomain"/>
							<div class="form-item-tip">多个域名请使用英文,号间隔开</div>
						</el-form-item>
						<el-form-item label="Webview域名">
							<el-input class="textarea-large" type="textarea" placeholder="请填写Webview域名" v-model="form.webViewDomain"/>
							<div class="form-item-tip">多个域名请使用英文,号间隔开</div>
						</el-form-item>
					</div>
				</div>
			</div>
			<div class="form-footer">
				<el-button type="primary" :disabled="loading!=2" :loading="saveLoading" size="small" @click="save">保存
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import wxDomainApi from '@admin/api/wxDomain'

	export default {
		data() {
			return {
				rules: {},
				form: {
					webViewDomain:'',
					serverDomain: ''
				},
				loading: 2,
				saveLoading: false
			}
		},
		computed: {},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(wxDomainApi.queryDomainConfig({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result;
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善配置信息'
					})
					return
				}
				this.$request.submit(wxDomainApi.updateDomainConfig({
					data:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage: 'alert',
					success: (response) => {
	
					},
					successText: (response) => {
						return '保存成功'
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
