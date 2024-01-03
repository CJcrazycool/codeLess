<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="公众号账号" prop="account">
							<el-input v-model="form.account" placeholder="请填写公众号账号">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公众号密码" prop="password">
							<el-input v-model="form.password" type="password" placeholder="请填写公众号密码" :show-password="true">
							</el-input>
					 </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="小程序账号" prop="mpAccount">
							<el-input v-model="form.mpAccount" placeholder="请填写小程序账号">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="小程序密码" prop="mpPassword">
							<el-input v-model="form.mpPassword" type="password" placeholder="请填写小程序密码" :show-password="true">
							</el-input>
					 </el-form-item>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary"
				@click="save">保存</el-button>
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
				loading: 2,
				saveLoading: false,
				form: null,
				rules: {
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			this.form = {
				id:this.data.id,
				companyId:this.data.companyId,
				account:this.data.account,
				password:this.data.password,
				mpAccount:this.data.mpAccount,
				mpPassword:this.data.mpPassword
			}
		},
		methods: {
			save() {
				var vaild = validateForm(this.$refs.form,true)
				if (!vaild) {
					this.$message.error({
						message: '请完善资料信息'
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
