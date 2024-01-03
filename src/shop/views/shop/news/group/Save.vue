<template>
	<div class="dialog-form">
		<el-form @submit.native.prevent ref="form" :model="form" size="small":rules="rules">
			<div class="form-body" v-loading="loading==1">
				<div class="form-area">
					<el-row >
					  <el-form-item label="分组名称" prop="name">
							<el-input v-model="form.name" placeholder="请填写分组名称"></el-input>
					  </el-form-item>
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
	import newsGroupApi from '@shop/api/newsGroup'

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
						message: '请填写分组名称'
					}]
				},
				form:{
					id:this.id,
					name:''
				}
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			if(this.id)
				this.load(this.id)
		},
		methods: {
			load(id){
				this.$request.load(newsGroupApi.queryById({
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
						message: '请完善分组信息'
					})
					return
				}
				var api = !this.form.id?newsGroupApi.add:newsGroupApi.edit
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