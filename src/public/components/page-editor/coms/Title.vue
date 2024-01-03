<!-- 文章列表组件 -->
<template>
	<div class="com-title" :class="{'title-weight':comAttrs.style.titleWeight,
	'title-size-small':comAttrs.style.titleSize=='small',
	'title-size-medium':comAttrs.style.titleSize=='medium',
	'title-size-large':comAttrs.style.titleSize=='large'}" :style="{
				'padding-left':comAttrs.style.padding.left+'px',
				'padding-right':comAttrs.style.padding.right+'px',
				'padding-top':comAttrs.style.padding.top+'px',
				'padding-bottom':comAttrs.style.padding.bottom+'px'}">
		<div class="content">
			<div v-if="comAttrs.showMore" class="more"><span class="more-text">查看更多</span><i class="el-icon-arrow-right"></i></div>
			<div class="title">	
				<span v-if="comAttrs.style.titleDecoration" class="decoration" :style="{'border-color':themeColor}"></span>
				<span class="text">{{comAttrs.title}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import baseCom from './BaseCom'
	import {mapState} from 'vuex'
	
	export default {
		mixins: [baseCom],
		data() {
			return {
			};
		},
		computed: {
			...mapState('public',['componentsEnvConfig']),
			themeColor(){
				return this.componentsEnvConfig.pageEditor.theme.colorSecondary?this.componentsEnvConfig.pageEditor.theme.colorSecondary:null
			}
		},
		watch:{
		},
		methods: {
			getDefaultComAttrs() {
				return {
					title:'标题',
					showMore:true,
					moreLink:null,
					style:{
						titleSize:'small',
						titleWeight:true,
						titleDecoration:true,
						padding: {
							left: '15',
							right: '15',
							linkX:true,
							top: '15',
							bottom: '15',
							linkY:true,
						}
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.more{
		font-size: $--font-size-extra-small;	
		align-items: center;
		float: right;
		display: flex;
		height: 24px;
		line-height: 24px;
		color: $--color-text-secondary;
		margin-left: 10px;
	}
	
	.more-text{
		margin-right: 4px;
	}
	
	.title-size-small {
		.text{
			font-size: $--font-size-medium;
		}
		.decoration{
			height: 14px;
		}
	}
	
	.title-size-medium{
		.text{
			font-size: $--font-size-large;
		}
		.decoration{
			height: 15px;
		}
	}
	
	.title-size-large{
		.text{
			font-size: $--font-size-extra-large;
		}
		.decoration{
			height: 16px;
		}
	}
	
	.title-weight .text{
		font-weight: $font-weight-large;
	}
	
	.decoration {
		border-radius: 10px;
		border: 2px solid #155bd4;
		margin-right: 8px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.text{
		vertical-align: middle;
		line-height: 24px;
	}
</style>
