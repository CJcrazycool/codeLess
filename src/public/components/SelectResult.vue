<!-- 数据选择结果展示面板 -->
<template>
	<div class="select-result">
		已选择 <span class="count">{{selectCount}}</span> 条
		<el-button class="clear" size="small" type="text" @click="clear" :disabled="selectCount==0">清空</el-button>
	</div>
</template>

<script>
	import lodashFp from 'lodash/fp'

	export default {
		props: {
			selectCount: {
				default () {
					return 0
				}
			}
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			clear(){
				this.$emit('clear')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-result{
		padding: 8px 22px;
		font-size: 12px;
		margin-bottom: 15px;
		background-color: $--color-primary-light-9;
		border: $--color-primary-light-8 solid 1px;
		border-radius: $--border-radius-small;
	}
	
	.count{
		color: $--color-primary;
	}
	
	.clear{
		margin-left: 10px;
	}
	
</style>
