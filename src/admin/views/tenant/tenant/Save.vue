<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="商户编码" prop="code">
							<el-input v-model="form.code" placeholder="请填写商户编码">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商户名称" prop="name">
							<el-input v-model="form.name" placeholder="请填写商户名称">
							</el-input>
					 </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="到期时间" prop="validTime">
							  <el-date-picker value-format="yyyy-MM-dd" class="fill-width" v-model="form.validTime" type="date" placeholder="请选择到期时间"  placement="bottom-start"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="启用状态">
							<el-switch v-model="form.valid"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="form-area-title">商户资料</div>
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话">
							<el-input v-model="form.tel" placeholder="请填写联系电话">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系邮箱">
							<el-input v-model="form.email" placeholder="请填写联系邮箱">
							</el-input>
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
	import tenantApi from '@admin/api/tenant'

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
					code: '',
					name: '',
					valid:true,
					validTime:'',
					tel:'',
					email:''
				},
				rules: {
					'code': [
						{
						required: true,
						message: '请填写商户代码'
					}, 
					{
						trigger: 'blur',
						validator: (rule, value, callback) => {
							this.checkCode(()=>{
								callback()
							},()=>{
								callback(new Error())
							})
						},
						message: '商户代码已存在'
					}],
					'name': [{
						required: true,
						message: '请填写商户名称'
					}],
					'validTime': [{
						required: true,
						message: '请选择到期时间'
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
			checkCode(success,fail){
				this.$request.load(tenantApi.verifyUnique({
					params: {
						id:this.id,
						field:'code',
						value:this.form.code
					},
					success: (response) => {
						response.data.result?success():fail()
					}
				}))
			},
			load(id) {
				this.$request.load(tenantApi.queryById({
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
				if (!vaild) {
					this.$message.error({
						message: '请完善商户信息'
					})
					return
				}
				var api = !this.form.id ? tenantApi.add : tenantApi.edit
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
