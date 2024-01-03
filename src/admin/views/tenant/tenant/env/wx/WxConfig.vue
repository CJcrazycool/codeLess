<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row>
					<el-form-item label="原始ID" prop="developerCode">
						<el-input v-model="form.developerCode" placeholder="请填写原始ID">
						</el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="公众号 APPID" prop="appId">
						<el-input v-model="form.appId" placeholder="请填写公众号 APPID">
						</el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="公众号密钥" prop="appSecret">
						<el-input v-model="form.appSecret" placeholder="请填写公众号密钥" type="password" :show-password="true">
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
					'appId': [
						{
							required: true,
							message: '请填写公众号 APPID'
						}
					],'developerCode': [
						{
							required: true,
							message: '请填写原始ID'
						}
					],
					'appSecret': [
						{
							required: true,
							message: '请填写公众号密钥'
						}
					],
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			this.form = {
				id:this.data.id,
				companyId:this.data.companyId,
				developerCode:this.data.developerCode,
				appId:this.data.appId,
				appSecret:this.data.appSecret
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
