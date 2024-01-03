<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-form-item label="登录账号" prop="account">
					<el-input v-model="form.account" :disabled="id" placeholder="请填写登录账号" maxlength="20"></el-input>
				</el-form-item>
				<el-row :gutter="20" v-if="!id">
					<el-col :span="12">
						<el-form-item label="登录密码" prop="password">
							<el-input v-model="form.password" placeholder="请填写登录密码" type="password" maxlength="20"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="确认密码" prop="confirm_password">
							<el-input v-model="form.confirm_password" placeholder="请填写确认密码" type="password" maxlength="20"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="帐号角色" prop="roleIds">
							<el-select v-model="form.roleIds" multiple placeholder="请选择帐号角色" class="fill-width">
								<el-option v-for="role in roleList" :key="role.id" :label="role.roleName"
									:value="role.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="状态" prop="userState">
							<dictSelect class="fill-width" dict-key="system_user_state" v-model="form.userState"></dictSelect>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="form-area-title">员工信息</div>
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="员工姓名" prop="realname">
							<el-input v-model="form.realname" placeholder="请填写员工姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="员工手机号" prop="mobile">
							<el-input v-model="form.mobile" placeholder="请填写员工手机号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="form.remark" type="textarea" placeholder="请填写备注"></el-input>
				</el-form-item>
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
	import systemUserApi from '@shop/api/systemUser'
	import systemRoleApi from '@shop/api/systemRole'

	export default {
		props: {
			id: null
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				rules: {
					'account': [{
						required: true,
						message: '请填写登录账号'
					}],
					'password': [{
						required: true,
						message: '请填写登录密码'
					}],
					'confirm_password': [{
							required: true,
							message: '请填写确认密码'
						},
						{
							validator: (rule, value, callback) => {
								value !== this.form['password'] ? callback(new Error()) : callback();
							},
							message: '确认密码不一致'
						}
					],
					'realname': [{
						required: true,
						message: '请填写员工姓名'
					}],
					'mobile': [{
						required: true,
						message: '请填写员工手机号'
					}],
				},
				form: {
					account: '',
					password: '',
					confirm_password: '',
					roleIds: [],
					userState: 'NORMAL',
					name: '',
					mobile: '',
					remark: ''
				},
				roleList: [],
			}
		},
		computed: {},
		watch: {},
		created() {
			if (this.id)
				this.loadUser(this.id)
			this.loadRole()
		},
		methods: {
			loadUser(id) {
				this.$request.load(systemUserApi.queryById({
					params: {
						id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result
						this.form.password = null
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			loadRole() {
				this.$request.load(systemRoleApi.querySysRoleList({
					data: {},
					success: (response) => {
						this.roleList = response.data.result
					}
				}))
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善用户信息'
					})
					return
				}
				const api = !this.id ? systemUserApi.add : systemUserApi.edit
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('success')
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
