<template>
	<div class="dialog-form">
		<el-form @submit.native.prevent ref="form" :model="form" size="small":rules="rules">
			<div class="form-body" v-loading="loading==1">
				<div class="form-area">
					<el-row :gutter="20">
					  <el-col :span="12">
						  <el-form-item label="分类名称" prop="name">
							<el-input v-model="form.name" placeholder="请填写分类名称"></el-input>
						  </el-form-item>
					  </el-col>
					  <el-col :span="12">
						  <el-form-item label="上级分类">
							  <parentCascader class="fill-width" v-model="form.parentId" :curr="form.id" :clearable="true" placeholder="请选择素材分类"
							  		:options="this.categoryOptions"></parentCascader>
						  </el-form-item>
					  </el-col>
					</el-row>
				</div>
			</div>
			<div class="form-footer">
				<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary" @click="save">保存</el-button>
				<el-button size="small" @click="$emit('cancel')">取消</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import resourceApi from '@shop/api/resource'
	import resourceCategoryApi from '@shop/api/resourceCategory'

	export default {
		props:{
			id:{}
		},
		components:{
		},
		data() {
			return {
				loading:2,
				saveLoading:false,
				rules:{
					'name': [{
						required: true,
						message: '请填写分类名称'
					}]
				},
				form:{
					id:this.id,
					name:'',
					parentId:''
				},
				categoryOptions:[],
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			this.loadCategory()
			if(this.id)
				this.load(this.id)
		},
		methods: {
			loadCategory(){
				this.$request.load(resourceCategoryApi.treeList({
					success: (response) => {
						this.categoryOptions = response.data.result
					}
				}))
			},
			load(id){
				this.$request.load(resourceCategoryApi.queryById({
					params:{
						id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善分类信息'
					})
					return
				}
				var api = !this.form.id?resourceCategoryApi.add:resourceCategoryApi.edit
				this.$request.submit(api({
					data:this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.$emit('save')
					},
					successText: (response) => {
						return '保存成功'
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>