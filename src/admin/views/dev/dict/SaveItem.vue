<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="数据键" prop="itemValue">
							<el-input v-model="form.itemValue" placeholder="请填写数据键">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="数据值" prop="itemText">
							<el-input v-model="form.itemText" placeholder="请填写数据值">
							</el-input>
					 </el-form-item>
					</el-col>
				</el-row>
				<el-row>
				 <el-form-item label="数据描述" prop="description">
						<el-input type="textarea" v-model="form.description" placeholder="请填写数据描述">
						</el-input>
					</el-form-item>
				</el-row>
				<el-row v-if="id" :gutter="20">
					<el-col :span="12">
						<el-form-item label="排序序号" prop="sortNo">
							 <el-input-number v-model="form.sortNo"></el-input-number>
						</el-form-item>
					</el-col>
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
			id: {},
			dictId:{}
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				form: {
					dictId:this.dictId,
					itemValue: '',
					itemText: '',
					description: '',
					sortNo:0
				},
				rules: {
					'itemValue': [{
						required: true,
						message: '请填写数据键'
					}, {
						trigger: 'blur',
						validator: (rule, value, callback) => {
							this.checkItemValue(()=>{
								callback()
							},()=>{
								callback(new Error())
							})
						},
						message: '数据键已存在'
					}]
					// 'itemText': [{
					// 	required: true,
					// 	message: '请填写数据值'
					// }]
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
			checkItemValue(success,fail){
				this.$request.load(dictApi.verifyDictItem({
					params: {
						dictId:this.dictId,
						id:this.id,
						field:'itemValue',
						value:this.form.itemValue
					},
					success: (response) => {
						response.data.result?success():fail()
					}
				}))
			},
			load(id) {
				this.$request.load(dictApi.queryDictItemById({
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
				var vaild = await asyncValidateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善数据信息'
					})
					return
				}
				var api = !this.form.id ? dictApi.addDictItem : dictApi.editDictItem
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
