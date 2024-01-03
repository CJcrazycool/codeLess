<!-- 文本内容 -->
<template>
	<div class="text-content">
		<div class="content">
			<span v-if="emptyText && !text" class="empty">
				{{emptyText===true?'无':emptyText}}
			</span>
			<template v-if="text">
				<template v-if="hide && hideState">******</template>
				<template v-else>{{text}}<slot></slot></template>
			</template>
			<slot v-else></slot>
		</div>
		<div class="operate">
			<el-button v-if="hide && text" size="mini" type="text" icon="el-icon-view" @click="hideState=!hideState">{{hideState?'显示':'隐藏'}}</el-button>
			<slot name="operate"></slot>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			text:{},
			hide:{},
			emptyText: {
				default(){
					return false
				}
			}
		},
		data() {
			return {
				hideState:true
			}
		},
		mounted() {
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.text-content{
		width: 100%;
		display: flex;
		justify-content: space-between;
		
		.content{
			flex: 1;
			width: 0;
			overflow-wrap: break-word;
		}
	}
</style>
