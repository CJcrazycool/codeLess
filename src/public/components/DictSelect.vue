<!-- 字典下拉框 -->
<template>
	<el-select class="dict-select"  v-bind="$attrs" v-on="$listeners">
		<slot></slot>
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>
</template>

<script>
	import dataDict from '@public/js/dataDict'

	export default {
		props: {
			whiteList:{},
			blackList:{},
			dictKey:{},
			parseValue:{}
		},
		data() {
			return {
				options:dataDict.options(this.dictKey,{
					white:this.whiteList,
					black:this.blackList
				},this.parseValue)
			}
		},
		mounted() {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
	
</style>
