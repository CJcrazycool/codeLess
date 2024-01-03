<template>
	<div class="layout">
		<div class="header">
			<img class="logo" src="@public/assets/img/logo-dark.png">
		</div>
		<div class="center">
			<div class="card">
				<div class="left">
					<el-carousel class="carousel" arrow="never">
						<el-carousel-item v-for="url in images" :key="url">
							<img width="100%" :src="url" />
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="right">
					<div class="right-title">
						密码登录
					</div>
					<el-form @submit.native.prevent ref="form" :model="form" class="login-form">
						<el-form-item class="large-label" label="商户编码" prop="companyCode">
							<el-input placeholder="请填写商户编码" v-model="form.companyCode"></el-input>
						</el-form-item>
						<el-form-item class="large-label" label="用户名" prop="account">
							<el-input placeholder="请填写用户名" v-model="form.account"></el-input>
						</el-form-item>
						<el-form-item class="large-label" label="密码" prop="password">
							<el-input placeholder="请填写密码" v-model="form.password" type="password"></el-input>
						</el-form-item>
						<div class="error">{{error}}</div>
						<el-button :loading="loginLoading" native-type="submit"
							:disabled="!form.companyCode || !form.account || !form.password" type="primary"
							class="login-button" @click="login">{{!loginSuccess?'登录':'正在登录中...'}}</el-button>
					</el-form>
				</div>
			</div>
		</div>
		<div class="footer">技术支持 @ 捷信达</div>
	</div>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import accessAuthApi from '@shop/api/accessAuth'

	export default {
		data() {
			return {
				loginLoading: false,
				loginSuccess: false,
				error: '',
				images: [
					'http://res.gshis.net/jxd-res:3URwDllPpburmIdCsHo26Y',
					'http://res.gshis.net/jxd-res:3I_uLnvEFbHoIvDj4JW8K9'
				],
				form: {
					companyCode: '',
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
			async login() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					return
				}
				await this.$request.submit(accessAuthApi.login({
					showSuccessMessage: false,
					showErrorMessage: false,
					data: this.form,
					before: () => {
						this.error = ''
						this.loginLoading = true
					},
					success:async (response) => {
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
		width: 900px;
		height: 500px;
		border-radius: 2px;
		display: flex;
		padding: 18px;

		.left {
			width: 500px;
			height: 100%;
			margin-right: 30px;
		}

		.right {
			flex: 1;
			padding-right: 12px;
			position: relative;
		}

		.right-title {
			font-size: 24px;
			padding-top: 20px;
			padding-bottom: 40px;
		}
	}

	.error {
		color: $--color-danger;
		font-size: $--font-size-base;
		height: 20px;
	}

	::v-deep .carousel {
		height: 100%;

		.el-carousel__container {
			height: 100%;
		}
	}

	.login-button {
		width: 100%;
		margin-top: 14px;
		height: 46px;
	}
</style>
