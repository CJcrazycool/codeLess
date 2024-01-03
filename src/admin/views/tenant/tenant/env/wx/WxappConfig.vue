<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row>
					<el-form-item label="小程序 APPID" prop="mpAppId">
						<el-input v-model="form.mpAppId" placeholder="请填写小程序 APPID">
						</el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="小程序密钥" prop="mpAppSecret">
						<el-input v-model="form.mpAppSecret" placeholder="请填写小程序密钥" type="password" :show-password="true">
						</el-input>
					</el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" size="small" type="primary" @click="save" :loading="saveLoading">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import tenantApi from '@admin/api/tenant'

	export default {
		props: {
			data:{}
		},
		components: {},
		data() {
			return {
				step:0,
				saveLoading: false,
				form:null,
				rules: {
					'mpAppId': [
						{
							required: true,
							message: '请填写小程序 APPID'
						}
					],'mpAppSecret': [
						{
							required: true,
							message: '请填写小程序密钥'
						}
					]
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			this.form = {
				id:this.data.id,
				companyId:this.data.companyId,
				mpAppId:this.data.mpAppId,
				mpAppSecret:this.data.mpAppSecret
			}
		},
		methods: {
			save() {
				var vaild = validateForm(this.$refs.form,true)
				if (!vaild) {
					this.$message.error({
						message: '请完善配置信息'
					})
					return
				}
				this.$request.submit(tenantApi.saveWxInfo({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('save')
					},
					successText: () => {
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
