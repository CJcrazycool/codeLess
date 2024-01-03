<!-- 图文组件 -->
<template>
	<div class="com-image" :class="{'enable-shadow':comAttrs.style.shadow == 'shadow','border-round':comAttrs.style.radius == 'round'}"
		:style="{
			'padding-left':comAttrs.style.padding.left+'px',
			'padding-right':comAttrs.style.padding.right+'px',
			'padding-top':comAttrs.style.padding.top+'px',
			'padding-bottom':comAttrs.style.padding.bottom+'px'
		}">
		<el-empty v-if="!comAttrs.imgs || comAttrs.imgs.length<=0" class="com-content-empty"
			description="点击设置图片"></el-empty>
		<div v-else class="img-list">
			<div class="img-item" v-for='(item, index) in comAttrs.imgs' :key='item.id'
				:style="{'margin-bottom':comAttrs.style.imgMarginBottom+'px'}">
				<div class="img-ad-wrap">
					<img v-img-src="{url:item.src,thumbnail:'750'}" />
					<div v-if="item.desc" class="desc">{{item.desc}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import baseCom from './BaseCom'

	export default {
		mixins: [baseCom],
		methods: {
			getDefaultComAttrs() {
				return {
					style: {
						radius: 'default',
						shadow: 'none',
						imgMarginBottom: 0,
						padding: {
							left: '0',
							right: '0',
							linkX:true,
							top: '0',
							bottom: '0',
							linkY:true
						}
					},
					imgs: []
				}
			}
		},
		data() {
			return {};
		},
	};
</script>
<style lang="scss" scoped>
	@import "@public/styles/page-editor/var.scss";

	.com-image {
		&.enable-shadow {
			.img-ad-wrap {
				box-shadow: $com-imgShadow;
			}
		}
		
		&.border-round{
			.img-ad-wrap{
				border-radius: $com-imgRound;
			}
		}
	}

	.img {
		&-item {
			&:last-child {
				margin-bottom: 0px !important;
			}
		}
	}
</style>