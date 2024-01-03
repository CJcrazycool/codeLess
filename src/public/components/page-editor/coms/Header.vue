<!-- 页面头部组件 -->
<template>
	<div class="com-header" :class="{'default':comAttrs.style.type=='default','custom':comAttrs.style.type=='custom'}">
		<div class="title">{{comAttrs.title}}</div>
	</div>
</template>

<script>
	import baseCom from './BaseCom'
	
	export default {
		mixins: [baseCom],
		data() {
			return {};
		},
		methods: {
			getDefaultComAttrs() {
				return {
					title:'页面标题',
					style:{
						type:'default'
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.com-header{
		height: 88px;
		width: 375px;
		margin: 0 auto;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		position: relative;
		
		&.default{
			background-image: url(~@public/assets/img/page-editor/top-nav.png)
		}
		
		&.custom{
			margin-bottom: -88px;
			z-index: 200;
			background-image: url(~@public/assets/img/page-editor/top-nav1.png)
		}
	}
	
	.title{
		width: 180px;
		margin: 0 auto;
		height: 34px;
		text-align: center;
		padding-top: 54px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight:$font-weight-large;
	}
</style>
