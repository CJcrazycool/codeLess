<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<tabHeader value="editPwd"></tabHeader>
			<div class="tab-content">
				<el-form class="form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
					<div class="form-body">
						<el-form-item label="新密码" prop="password">
							<el-input v-model="form.password" placeholder="请填写新密码" type="password"
								maxlength="20"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="confirm_password">
							<el-input v-model="form.confirm_password" placeholder="请填写新密码" type="password"
								maxlength="20"></el-input>
						</el-form-item>
						<el-form-item class="form-item-operate">
							<el-button native-type="submit" :loading="saveLoading" size="small" type="primary"
								@click="save">确认修改</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import accessAuthApi from '@shop/api/accessAuth'
	import tabHeader from './Tab'
	import {
		validateForm
	} from '@public/js/util'

	export default {
		components: {
			innerPageLayout,
			tabHeader
		},
		data() {
			return {
				saveLoading: false,
				rules: {
					'password': [{
						required: true,
						message: '请输入新密码'
					}],
					'confirm_password': [{
							required: true,
							message: '请输入确认密码'
						},
						{
							validator: (rule, value, callback) => {
								value !== this.form['password'] ? callback(new Error()) : callback();
							},
							message: '确认密码不一致'
						}
					]
				},
				form: {
					password: '',
					confirm_password: ''
				}
			}
		},
		watch: {},
		computed: {},
		created() {},
		methods: {
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					if (!vaild) {
						this.$message.error({
							message: '请完善登录密码'
						})
						return
					}
					return
				}
				this.$request.submit(accessAuthApi.updateLoginUserPassword({
					params: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.form.resetFields()
					},
					successText: () => {
						return '密码修改成功'
					},
					complete: (response) => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		width: 460px;
	}
</style>