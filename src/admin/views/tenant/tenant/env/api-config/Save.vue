<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="业务类型" prop="moduleType">
							<dictSelect class="fill-width" dict-key="module_type" v-model="form.moduleType" placeholder="请选择业务类型" :clearable="true"></dictSelect>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="接口来源" prop="interfaceType">
							<dictSelect class="fill-width" dict-key="interface_type" v-model="form.interfaceType" placeholder="请选择接口来源" :clearable="true"></dictSelect>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="form-area-title">接口配置</div>
			<div class="form-area">
				<el-row>
					<el-col>
						<el-form-item label="接口地址" prop="host">
							<el-input v-model="form.host" placeholder="请填写接口地址">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label="接口签名">
							<el-input v-model="form.pmsSign" placeholder="请填写接口签名" type="password" :show-password="true">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="接口代码">
							<el-input v-model="form.pmsCode" placeholder="请填写接口代码">
							</el-input>
					 </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="渠道代码">
							<el-input v-model="form.pmsChannelCode" placeholder="请填写渠道代码">
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
		validateForm
	} from '@public/js/util'
	import tenantInterfaceApi from '@admin/api/tenantInterface'

	export default {
		props: {
			companyId:{},
			id: {}
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				form: {
					companyId:this.companyId,
					moduleType:'',
					interfaceType:'',
					host:'',
					pmsSign:'',
					pmsCode:'',
					pmsChannelCode:''
				},
				rules: {
					'moduleType': [
						{
						required: true,
						message: '请选择业务类型'
					}],
					'interfaceType': [{
						required: true,
						message: '请选择接口来源'
					}],
					'host':[{
						required: true,
						message: '请填写接口地址'
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
			load(id) {
				this.$request.load(tenantInterfaceApi.queryById({
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
			save() {
				var vaild = validateForm(this.$refs.form,true)
				if (!vaild) {
					this.$message.error({
						message: '请完善接口信息'
					})
					return
				}
				var api = !this.form.id ? tenantInterfaceApi.add : tenantInterfaceApi.edit
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
