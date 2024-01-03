<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="字典名称" prop="dictName">
							<el-input v-model="form.dictName" placeholder="请填写字典名称">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="字典键名" prop="dictCode">
							<el-input v-model="form.dictCode" placeholder="请填写字典键名">
							</el-input>
					 </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="业务类型" prop="dictType">
							<dictSelect class="fill-width" dict-key="dict_type" v-model="form.dictType"></dictSelect>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
				 <el-form-item label="字典描述" prop="description">
						<el-input type="textarea" v-model="form.description" placeholder="请填写字典描述">
						</el-input>
					</el-form-item>
				</el-row>

			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {
		asyncValidateForm
	} from '@public/js/util'
	import dictApi from '@admin/api/dict'

	export default {
		props: {
			id: {}
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				form: {
					dictName: '',
					dictCode: '',
					description: '',
					dictType: '',
				},
				rules: {
					'dictCode': [
						{
						required: true,
						message: '请填写字典键名'
					},
					{
						trigger: 'blur',
						validator: (rule, value, callback) => {
							this.checkDictCode(()=>{
								callback()
							},()=>{
								callback(new Error())
							})
						},
						message: '字典键名已存在'
					}],
					'dictName': [{
						required: true,
						message: '请填写字典名称'
					}]
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			if (this.id)
				this.load(this.id)
		},
		methods: {
			checkDictCode(success,fail){
				this.$request.load(dictApi.verifyDict({
					params: {
						id:this.id,
						field:'dictCode',
						value:this.form.dictCode
					},
					success: (response) => {
						response.data.result?success():fail()
					}
				}))
			},
			load(id) {
				this.$request.load(dictApi.queryDictById({
					params: {
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
			async save() {
				var vaild = await asyncValidateForm(this.$refs.form,true)
				console.log(vaild)
				if (!vaild) {
					this.$message.error({
						message: '请完善字典信息'
					})
					return
				}
				var api = !this.form.id ? dictApi.addDict : dictApi.editDict
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('save')
					},
					successText: () => {
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
