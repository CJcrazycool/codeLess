<!-- 辅助分割组件 -->
<template>
	<div class="com-line">
		<div v-if="comAttrs.type=='empty'" class="empty" :style="{height:comAttrs.style.emptyHeight+'px'}"></div>
		<div v-else-if="comAttrs.type=='line'" class="border">
			<div class="border-line" :style="{
				'margin-left':comAttrs.style.margin.left+'px',
				'margin-right':comAttrs.style.margin.right+'px',
				'margin-top':comAttrs.style.margin.top+'px',
				'margin-bottom':comAttrs.style.margin.bottom+'px',
				'border-bottom':comAttrs.style.borderWidth+'px '+comAttrs.style.borderStyle+' '+comAttrs.style.borderColor}"></div>
		</div>
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
					type:'empty',
					style:{
						emptyHeight:30,
						borderStyle:'solid',
						borderColor:'#DCDFE6',
						borderWidth:1,
						margin: {
							left: '0',
							right: '0',
							linkX:true,
							top: '0',
							bottom: '0',
							linkY:true,
						}
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.border{
		padding: 10px 0px;
	}
</style>
