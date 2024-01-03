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
					<el-submenu v-permission="'system'" index="/system">
						<template slot="title">
							<i class="el-icon-s-tools"></i>
							<span>系统管理</span>
						</template>
						<el-menu-item v-permission="'system:user'" index="/system/user/list">用户管理</el-menu-item>
						<el-menu-item v-permission="'system:role'" index="/system/role/list">角色管理</el-menu-item>
						<el-menu-item v-permission="'system:direct'" index="/system/data-syn/update">系统直连</el-menu-item>
						<el-menu-item v-permission="'system:log'" index="/system/logs/operate">系统日志</el-menu-item>
					</el-submenu>
					<el-submenu v-permission="'shop'" index="/shop">
						<template slot="title">
							<i class="el-icon-s-home"></i>
							<span>店铺管理</span>
						</template>
						<el-menu-item v-permission="'shop:helper'" index="/shop/helper/wxapp">开店助手</el-menu-item>
						<el-menu-item v-permission="'shop:news'" index="/shop/news/list">文章资讯</el-menu-item>
						<el-menu-item v-permission="'shop:resource'" index="/shop/resource/image/list">素材空间</el-menu-item>
						<el-menu-item v-permission="'shop:setting'" index="/shop/setting/room">经营设置</el-menu-item>
					</el-submenu>
					<el-submenu v-permission="'pageEditor'" index="/page-editor">
						<template slot="title">
							<i class="el-icon-edit-outline"></i>
							<span>页面装修</span>
						</template>
						<el-menu-item v-permission="'pageEditor:wpage'" index="/page-editor/page/list">微页面</el-menu-item>
						<el-menu-item v-permission="'pageEditor:tabbar'" index="/page-editor/tabbar/set">导航菜单</el-menu-item>
						<el-menu-item v-permission="'pageEditor:style'" index="/page-editor/style/set">主题风格</el-menu-item>
					</el-submenu>
					<el-submenu v-permission="'hotel'" index="/hotel">
						<template slot="title">
							<i class="el-icon-office-building"></i>
							<span>酒店管理</span>
						</template>
						<el-menu-item v-permission="'hotel:hotel'" index="/hotel/hotel/list">酒店信息</el-menu-item>
						<el-menu-item v-permission="'hotel:salesman'" index="/hotel/salesman/list">业务员信息</el-menu-item>
					</el-submenu>
					<el-submenu v-permission="'customer'" index="/custom">
						<template slot="title">
							<i class="el-icon-user-solid"></i>
							<span>客户管理</span>
						</template>
						<el-menu-item v-permission="'customer:customer'" index="/custom/customer/list">客户查询</el-menu-item>
						<el-menu-item v-permission="'customer:rechargeRecord'" index="/custom/recharge-record/list">充值查询</el-menu-item>
						
						<el-menu-item-group v-permission="'customer:policy'">
						  <template slot="title">会员政策</template>
							<el-menu-item v-permission="'customer:memberCard'" index="/custom/member-card/list">会员卡</el-menu-item>
							<el-menu-item v-permission="'customer:coupon'" index="/custom/coupon/list">优惠券</el-menu-item>
							<el-menu-item v-permission="'customer:rechargeChannel'" index="/custom/recharge-channel/list">充值渠道</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu v-permission="'order'" index="/order">
						<template slot="title">
							<i class="el-icon-s-order"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item-group v-permission="'order:hotelOrder'">
						  <template slot="title">客房订单</template>
						  <el-menu-item v-permission="'order:hotelOrder:query'" index="/order/room-order/list">订房查询</el-menu-item>
						  <el-menu-item v-permission="'order:hotelOrderRefund'" index="/order/room-refund/list">退款查询</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu v-permission="'trade'" index="/trade">
						<template slot="title">
							<i class="el-icon-bank-card"></i>
							<span>交易账单</span>
						</template>
						<el-menu-item v-permission="'trade:payRecord'" index="/trade/pay-record/list">支付明细</el-menu-item>
						<el-menu-item v-permission="'trade:tradeRecord'" index="/trade/trade-record/list">对账中心</el-menu-item>
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
	import pathConfig from '@shop/router/pathConfig'
	import headerOperate from '@shop/components/HeaderOperate'

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
					pathName:['商家后台']
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