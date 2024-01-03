<template>
	<div class="layout">
		<div class="nav">
			<div class="logo">
				<img src="@public/assets/img/logo_light.png">
			</div>
			<div class="menu">
				<el-menu :default-active="defaultMenuActive" :router="true">
					<el-menu-item index="/home">
						<i class="el-icon-menu"></i>
						<span slot="title">主页</span>
					</el-menu-item>
					<el-submenu index="/dev">
						<template slot="title">
							<i class="el-icon-s-custom"></i>
							<span>开发者</span>
						</template>
						<el-menu-item index="/dev/dict/list">数据字典</el-menu-item>
						<!-- <el-menu-item index="1">消息模版</el-menu-item> -->
						<el-menu-item index="/dev/tenant-auth/list">商户权限集</el-menu-item>
					</el-submenu>
					<!-- <el-submenu index="/system">
						<template slot="title">
							<i class="el-icon-s-tools"></i>
							<span>系统管理</span>
						</template>
						<el-menu-item index="/custom/recharge-channel/list">用户管理</el-menu-item>
					</el-submenu> -->
					<el-submenu index="/tenant">
						<template slot="title">
							<i class="el-icon-user-solid"></i>
							<span>商户管理</span>
						</template>
						<el-menu-item index="/tenant/tenant/list">商户查询</el-menu-item>
						<!-- <el-menu-item index="4">站内公告</el-menu-item>
						<el-menu-item index="5">公共素材</el-menu-item> -->
					</el-submenu>
					<el-submenu index="/tenant1">
						<template slot="title">
							<i class="el-icon-s-platform"></i>
							<span>平台管理</span>
						</template>
						<el-menu-item index="/platform/style/list">预设主题</el-menu-item>
						<!-- <el-menu-item index="2">广告管理</el-menu-item> -->
						<!-- <el-menu-item index="3">素材空间</el-menu-item> -->
					</el-submenu>
					<el-submenu index="/wx">
						<template slot="title">
							<i class="el-icon-s-promotion"></i>
							<span>微信服务商</span>
						</template>
						  <el-menu-item index="/wx/domain">域名白名单</el-menu-item>
						<el-menu-item-group>
						  <template slot="title">微信小程序</template>
						 <el-menu-item index="/wx/wxapp/template/list">模板管理</el-menu-item>
						  <el-menu-item index="/wx/wxapp/examine-record/list">审核记录</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</div>
		</div>
		<div class="header">
			<div class="page-path">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-for="(name,index) in pathName" :key="index">{{name}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<headerOperate></headerOperate>
		</div>
		<div class="main">
			<router-view></router-view>
			<pageFooter></pageFooter>
		</div>
	</div>
</template>

<script>
	import {loadPath} from '@public/js/util'
	import pathConfig from '@admin/router/pathConfig'
	import headerOperate from '@admin/components/HeaderOperate'

	export default {
		components:{
			headerOperate
		},
		data() {
			return {
				defaultMenuActive: null,
				pathName: []
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.loadPath(route)
				},
				immediate: true
			}
		},
		computed: {},
		mounted() {},
		methods: {
			//设置菜单默认选中，生成页面面包屑
			loadPath(route){
				var path = loadPath({
					menuActive:'/home',
					pathName:['运营后台']
				},route,pathConfig)
				this.defaultMenuActive = path.menuActive
				this.pathName = path.pathName
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		width: 190px;
		background-color: $nav-menu-background-color;
		display: flex;
		flex-direction: column;
	
		.logo {
			padding-top: 15px;
			display: flex;
			height: 130px;
			align-items: center;
			justify-content: center;
			flex-direction: column;
	
			img{
				width: 85px;
			}
		}
		
		.menu{
			flex: 1;
			overflow: auto;
			&::-webkit-scrollbar {
			  width: 0;
			}
		}
	
		::v-deep .el-menu {
			border: none;
			background-color: $nav-menu-background-color;
	
			@mixin menu-item-style {
				height: 52px;
				line-height: 52px;
			}
	
			@mixin menu-item-icon {
				margin-right: 8px;
				font-size: 16px;
			}
	
			.el-menu-item {
				@include menu-item-style;
				color: $nav-menu-font-color;
	
				&:focus,
				&:hover {
					background-color: $nav-menu-background-color_focus;
					color: $--color-white;
				}
	
				&.is-active {
					background-color: $nav-menu-background-color_active;
					color: $nav-menu-font-color_active;
	
					i {
						color: $nav-menu-font-color_active;
					}
				}
	
				i {
					color: $nav-menu-font-color;
				}
	
				[class^=el-icon-] {
					@include menu-item-icon;
				}
			}
	
			.el-submenu {
				.el-menu-item {
					@include menu-item-style;
					min-width: auto;
				}
	
				.el-submenu__title {
					@include menu-item-style;
					color: $nav-menu-font-color;
	
					&:focus,
					&:hover {
						background-color: $nav-menu-background-color_focus;
					}
				}
	
				i {
					color: $nav-menu-font-color;
				}
	
				[class^=el-icon-] {
					@include menu-item-icon;
				}
			}
			
			.el-menu-item-group__title{
				padding: 12px 0 12px 20px;
			}
		}
	}
	
	.header {
		padding: 12px 20px;
		font-size: $--font-size-base;
		position: absolute;
		left: 190px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
		.page-path {
			font-size: $--font-size-medium;
			::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner{
				font-weight: $font-weight-large;
			}
		}
	}
	
	.main {
		position: absolute;
		left: 190px;
		right: 0px;
		top: 59px;
		bottom:0px;
		padding: 0px 20px;
		padding-top: 0px;
		display: flex;
		flex-direction: column;
	}
</style>