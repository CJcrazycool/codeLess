<template>
	<div class="dialog-form">
		<el-form @submit.native.prevent ref="form" :model="form" size="small":rules="rules">
			<div class="form-body" v-loading="loading==1">
				<div class="form-area">
					<el-row :gutter="20">
					  <el-col :span="12">
						  <el-form-item label="图片名称" prop="imgName">
							<el-input v-model="form.imgName" placeholder="请填写图片名称"></el-input>
						  </el-form-item>
					  </el-col>
					  <el-col :span="12">
						  <el-form-item label="素材分类">
							<el-cascader class="fill-width"  v-model="form.classifyId" :clearable="true" placeholder="请选择素材分类"
								:options="categoryOptions"
								:props="{ checkStrictly: true ,value:'id',emitPath:false}"
								clearable></el-cascader>
						  </el-form-item>
					  </el-col>
					</el-row>
				</div>
			</div>
			<div class="form-footer">
				<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary" @click="save">确定</el-button>
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
				loading:0,
				saveLoading:false,
				rules:{
					'imgName': [{
						required: true,
						message: '请填写图片名称'
					}]
				},
				form:{
					id:null,
					imgName:'',
					classifyId:''
				},
				categoryOptions:[],
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			this.load(this.id)
			this.loadCategory()
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
				this.$request.load(resourceApi.queryById({
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
						this.form.id = response.data.result.id
						this.form.imgName = response.data.result.imgName
						this.form.classifyId = response.data.result.classifyId
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
						message: '请完善图片信息'
					})
					return
				}
				this.$request.submit(resourceApi.edit({
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