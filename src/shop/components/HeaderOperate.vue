<template>
	<div v-if="accessAuth.user && accessAuth.tenant" class="header-operate">
		<el-tooltip effect="dark" content="消息" placement="bottom">
			<i class="button el-icon-message-solid"></i>
		</el-tooltip>
		<el-dropdown class="user-dropdown" placement="bottom" @visible-change="(value)=>{userInfoVisible=value}" @command="handleCommand">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="user">用户信息</el-dropdown-item>
				<el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
				<el-dropdown-item command="system">关于系统</el-dropdown-item>
				<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
			</el-dropdown-menu>
			<div class="user-box" :class="{active:userInfoVisible}">
				<el-avatar class="avatar" size="small">
					<i v-if="!accessAuth.tenant || !accessAuth.tenant.name" class="el-icon-user-solid"></i><template v-else>{{accessAuth.tenant.name[0]}}</template>
				</el-avatar>
				<div class="info">
					<div v-if="accessAuth.tenant" class="user-name">{{accessAuth.tenant.name}}</div>
					<div class="user-id">用户 {{accessAuth.user.account}}</div>
				</div>
				<i class="down-icon el-icon-arrow-down" :class="{expand:userInfoVisible}"></i>
			</div>
		</el-dropdown>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import accessAuthApi from '@shop/api/accessAuth'
	
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
				if(command=='system')
					this.$router.openWindow({
						path:'/curr-user/system'
					})
				else if(command=='user')
					this.$router.openWindow({
						path:'/curr-user/user'
					})
				else if(command=='editPwd')
					this.$router.openWindow({
						path:'/curr-user/edit-password'
					})
				else if(command=='logout')
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
		
		.user-name{
			max-width: 110px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	
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