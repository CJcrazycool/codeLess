<!-- 帮助说明 -->
<template>
	<el-tooltip class="help-tip tip" v-bind="$attrs" v-on="$listeners" placement="right">
		<div slot="content"><slot></slot></div>
		<i class="el-icon-question"></i>
	</el-tooltip>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
	.help-tip {
		 margin-left: 5px;
		 cursor: help;
		 font-size: $--font-size-base;
	}
</style>
