<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="真实姓名" prop="name">
							<el-input v-model="form.name" placeholder="请填写真实姓名">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="form.mobile" placeholder="请填写手机号">
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
	import accessAuthApi from '@shop/api/accessAuth'

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
					'name': [{
						required: true,
						message: '请填写真实姓名'
					}],
					'mobile': [{
						required: true,
						message: '请填写员工手机号'
					}],
				},
			}
		},
		computed: {},
		watch: {},
		created() {
			this.form = {
				name:this.data.realname,
				mobile:this.data.mobile
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
				this.$request.submit(accessAuthApi.updateLoginUserInfo({
					params: this.form,
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
