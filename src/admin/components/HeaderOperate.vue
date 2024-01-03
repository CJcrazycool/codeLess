<template>
	<div v-if="accessAuth.user" class="header-operate">
		<el-dropdown class="user-dropdown" placement="bottom" @visible-change="(value)=>{userInfoVisible=value}" @command="handleCommand">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>修改密码</el-dropdown-item>
				<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
			</el-dropdown-menu>
			<div class="user-box" :class="{active:userInfoVisible}">
				<el-avatar class="avatar" size="small">
					<i v-if="!accessAuth.tenant || !accessAuth.tenant.name" class="el-icon-user-solid"></i><template v-else>{{accessAuth.tenant.name[0]}}</template>
				</el-avatar>
				<div class="info">
					<div class="user-name">用户 {{accessAuth.user.account}}</div>
				</div>
				<i class="down-icon el-icon-arrow-down" :class="{expand:userInfoVisible}"></i>
			</div>
		</el-dropdown>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import accessAuthApi from '@admin/api/accessAuth'
	
	export default {
		data() {
			return {
				userInfoVisible:false
			}
		},
		watch: {
		},
		computed: {
			...mapState('public',['accessAuth'])
		},
		mounted() {
		},
		methods: {
			handleCommand(command){
				if(command=='logout')
					this.logout()
			},
			logout(){
				var errorMessage = ()=>{
					this.$message({
						type: 'error',
						message: '注销失败，请重试'
					})
				}
				this.$request.send(accessAuthApi.logout({
					success: (response) => {
						if(response.data.success){
							this.$router.goLogin()
							this.$accessAuth.clear()
						}
						else
							errorMessage()
					},
					error: () => {
						errorMessage()
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-operate {
		display: flex;
		align-items: center;
		height: 35px;
	
		.button {
			margin-right: 10px;
			cursor: pointer;
			transition: $--all-transition;
			font-size: $--font-size-extra-large;
			color: $--color-text-placeholder;
			padding: 10px;
	
			&:hover {
				border-radius: $--border-radius-base;
				color: $--color-primary-light-2;
				background-color: $--color-primary-light-8;
			}
		}
		
		.user-dropdown{
			height: 100%;
		}
	
		.user-box {
			height: 100%;
			padding-left: 15px;
			cursor: pointer;
			display: flex;
			align-items: center;
	
			&.active {
				.avatar {
					background-color: $--color-primary-light-2;
				}
			}
			
			.info {
				display: inline-block;
			}
			
			.avatar {
				margin-right: 10px;
				transition: $--all-transition;
				background-color: $--color-primary;
			}
			
			.user-id {
				font-size: $--font-size-extra-small;
				color: $--color-info;
			}
			
			.down-icon {
				margin-left: 10px;
				display: inline-block;
			}
		}
	}
</style>