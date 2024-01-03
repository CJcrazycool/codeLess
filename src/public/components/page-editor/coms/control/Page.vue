<template>
	<div class="com-header-control">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="pageInfo" size="small" :rules="rules">
			<el-form-item class="large-label" label="页面分类" prop="category">
				<el-cascader class="fill-width" placeholder="请选择页面分类" v-model="pageInfo.typeId" :clearable="true"
				    :options="categoryOptions"
				    :props="{ checkStrictly: true ,value:'id',emitPath:false}"
				    clearable></el-cascader>
			</el-form-item>
			<el-form-item class="large-label" label="页面名称" prop="name">
				<el-input placeholder="请填写页面名称" maxlength="20" v-model="pageInfo.name"></el-input>
			</el-form-item>
			<el-form-item class="large-label" label="页面描述">
				<el-input placeholder="用户通过微信分享给朋友时，会自动显示页面描述" maxlength="60" v-model="pageInfo.desc"></el-input>
			</el-form-item>
			<el-form-item class="large-label" label="页面备注">
				<el-input placeholder="请填写备注说明" v-model="pageInfo.remark"></el-input>
			</el-form-item>
			<el-form-item class="large-label" label="页面背景色" prop="bgColor">
				<el-color-picker size="medium" v-model="pageInfo.bgColor"></el-color-picker>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import microPageTypeApi from '@shop/api/microPageType'
	import {validateForm} from '@public/js/util'
	
	export default {
		props: {
			pageInfo: {}
		},
		data() {
			return {
				loading:false,
				rules: {
					name: [{
							required: true,
							message: '请填写页面名称'
						}
					],
					bgColor: [{
							required: true,
							message: '请选择背景颜色'
						}
					],
				},
				categoryOptions:[]
			};
		},
		created() {},
		mounted(){
			this.loadCategory()
		},
		methods: {
			loadCategory(){
				this.$request.load(microPageTypeApi.treeList({
					before: () => {
						this.loading = true
					},
					success: (response) => {
						this.categoryOptions = response.data.result
					},
					complete: () => {
						this.loading = false
					}
				}))
			},
			validate() {
				var result = validateForm(this.$refs['form'])
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>