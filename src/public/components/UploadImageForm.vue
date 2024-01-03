<!-- 图片上传表单 -->
<template>
	<el-form @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-form-item label="素材分类">
					<el-cascader placeholder="请选择素材分类" v-model="form.category" :clearable="true"
						:options="categoryOptions"
						:props="{ checkStrictly: true ,value:'id',emitPath:false}"
						clearable></el-cascader>
				</el-form-item>
				<el-form-item label="上传图片" prop="fileList">
					<uploadImage ref="uploadImage" v-model="form.fileList" :value-formatter="multiple?'object':','"
					 :multiple="multiple" :limit="limit"
					 :upload-file-list.sync="uploadFileList" :loading.sync="uploadLoading"></uploadImage>
				</el-form-item>
			</div>
		</div>
		<div class="form-footer">
			<el-button :loading="uploadLoading || saveLoading" native-type="submit" size="small" type="primary" @click="save">开始上传</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import {envConfig} from './env.js'
	
	export default {
		props:{
			multiple:{
				default(){
					return true
				}
			},
			limit:{}
		},
		data() {
			return {
				batchAddApi:envConfig.resource.image.batchAddApi,
				treeListApi:envConfig.resource.image.categoryListApi,
				saveLoading:false,
				uploadLoading:false,
				rules: {
					'fileList': [{
						required: true,
						message: '请选择上传图片',
						trigger: 'blur'
					}]
				},
				form:{
					category:null,
					fileList:this.multiple?[]:''
				},
				uploadFileList:[],
				categoryOptions:[]
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			this.loadCategory()
		},
		methods: {
			loadCategory(){
				this.$request.load(this.treeListApi({
					success: (response) => {
						this.categoryOptions = response.data.result
					}
				}))
			},
			createFormData() {
				var data = []
				var fileList = !this.multiple?[this.form.fileList]:this.form.fileList
				fileList.forEach((url,index)=>{
					data.push({
						'classifyId':this.form.category,
						'imgUrl':url,
						'imgName':this.uploadFileList[index].file.raw.name,
						'imgSize':this.uploadFileList[index].file.raw.size
					})
				})
				return data
			},
			async save() {
				await this.$refs.uploadImage.submit()
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请选择上传图片'
					})
					return
				}
				var data = this.createFormData()
				this.$request.submit(this.batchAddApi({
					data,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.$emit('save',this.form.fileList)
					},
					successText: (response) => {
						return '上传成功'
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
.form-area {
	padding: 0px 40px;
}
</style>
