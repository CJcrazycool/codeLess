<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="新密码" prop="password">
						<el-input v-model="form.password" placeholder="请输入新密码" type="password" maxlength="20"></el-input>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="确认密码" prop="confirm_password">
						<el-input v-model="form.confirm_password" placeholder="请输入确认密码" type="password" maxlength="20"></el-input>
					  </el-form-item>
				  </el-col>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :loading="saveLoading" size="small" type="primary" @click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import systemUserApi from '@shop/api/systemUser'
	import {validateForm} from '@public/js/util'

	export default {
		props:{
			id:null
		},
		components:{
		},
		data() {
			return {
				saveLoading:false,
				rules:{
					'password': [{
						required: true,
						message: '请输入新密码'
					}],
					'confirm_password': [{
							required: true,
							message: '请输入确认密码'
						},
						{
							validator: (rule, value, callback) => {
								value !== this.form['password'] ? callback(new Error()) : callback();
							},
							message: '确认密码不一致'
						}
					]
				},
				form:{
					id:this.id,
					password:'',
					confirm_password:''
				}
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善登录密码'
					})
					return
				}
				this.$request.submit(systemUserApi.editPassword({
					params: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.$emit('success')
					},
					successText:()=>{
						return '密码修改成功'
					},
					complete:(response)=>{
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>