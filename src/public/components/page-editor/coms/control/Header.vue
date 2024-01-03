<template>
	<div class="com-header-control">
		<el-form class="com-control-form" @submit.native.prevent ref="form" size="small" :model="comAttrs" :rules="rules">
		  <el-form-item class="large-label" label="页面标题" prop="title">
		    <el-input v-model="comAttrs.title" placeholder="请填写标题" maxlength="20"></el-input>
		  </el-form-item>
		  <el-form-item class="large-label" label="导航样式">
		    <el-radio-group v-model="comAttrs.style.type">
		    	<el-radio label="default">默认</el-radio>
		    	<el-radio label="custom">沉浸式</el-radio>
		    </el-radio-group>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import baseControl from './BaseControl.vue'
	
	export default {
		mixins: [baseControl],
		watch:{
		},
		data() {
			return {
				rules: {
					// title: [{
					// 		required: true,
					// 		message: '请填写页面标题'
					// 	}
					// ]
				}
			};
		},
		methods: {
			validate() {
				var result = true
				this.$refs['form'].validate((valid) => {
					 result = valid
				})
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
