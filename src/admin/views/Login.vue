<template>
	<div class="layout">
		<div class="header">
			<img class="logo" src="@public/assets/img/logo-dark.png">
		</div>
		<div class="center">
			<div class="card">
				<div class="title">
					Saas管理后台
				</div>
				<el-form @submit.native.prevent ref="form" :model="form" class="login-form">
					<el-form-item class="large-label" label="用户名" prop="account">
						<el-input placeholder="请填写用户名" v-model="form.account"></el-input>
					</el-form-item>
					<el-form-item class="large-label" label="密码" prop="password">
						<el-input placeholder="请填写密码" v-model="form.password" type="password"></el-input>
					</el-form-item>
					<div class="error">{{error}}</div>
					<el-button :loading="loginLoading" native-type="submit"
						:disabled="!form.account || !form.password" type="primary"
						class="login-button" @click="login">{{!loginSuccess?'登录':'正在登录中...'}}</el-button>
				</el-form>
			</div>
		</div>
		<div class="footer">技术支持 @ 捷信达</div>
	</div>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import accessAuthApi from '@admin/api/accessAuth'

	export default {
		data() {
			return {
				loginLoading: false,
				loginSuccess: false,
				error: '',
				form: {
					account: '',
					password: ''
				}
			}
		},
		watch: {},
		computed: {},
		mounted() {
		},
		methods: {
			login() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					return
				}
				this.$request.submit(accessAuthApi.login({
					showSuccessMessage: false,
					showErrorMessage: false,
					data: this.form,
					before: () => {
						this.error = ''
						this.loginLoading = true
					},
					success: (response) => {
						if (!response.data.success) {
							this.error = response.data.message
							this.loginLoading = false
						} else {
							this.$accessAuth.setLoginSession(response.data.result)
							this.loginSuccess = true
							setTimeout(() => {
								this.$router.replace('/home')
							}, 600)
						}
					},
					error: () => {
						this.loginLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 120px;
		margin: 22px 28px;
	}

	.header {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		line-height: 50px;
	}

	.footer {
		left: 0px;
		right: 0px;
		bottom: 30px;
		text-align: center;
		position: absolute;
		color: $--color-info;
		font-size: $--font-size-base;
	}

	.center {
		position: absolute;
		display: flex;
		left: 0px;
		right: 0px;
		top: 50px;
		bottom: 50px;
		align-items: center;
		justify-content: center;
	}

	.card {
		background-color: #fff;
		width: 400px;
		height: 380px;
		border-radius: 2px;
		padding: 20px 40px;

		.title {
			font-size: 24px;
			padding-top: 15px;
			padding-bottom: 35px;
		}
	}

	.error {
		color: $--color-danger;
		font-size: $--font-size-base;
		height: 20px;
	}

	.login-button {
		width: 100%;
		margin-top: 14px;
		height: 46px;
	}
</style>
