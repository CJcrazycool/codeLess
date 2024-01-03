<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row>
				  <el-form-item label="接口类型" prop="type">
					<div class="form-item-text"><textContent :text="form.type"></textContent></div>
				  </el-form-item>
				</el-row>
				<template v-if="form.isSuccess === false">
					<el-row>
						<el-form-item label="错误信息" prop="errorInfo">
							<div class="form-item-text"><textContent :text="form.errorInfo"></textContent></div>
						</el-form-item>
					</el-row>
				</template>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="公司ID" prop="type">
							<div class="form-item-text"><textContent :text="form.companyId"></textContent></div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="会员ID" prop="type">
							<div class="form-item-text"><textContent :text="form.memberId"></textContent></div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
				  <el-form-item label="url">
					  <el-input class="textarea-large" v-model="form.url" type="textarea"></el-input>
				  </el-form-item>
				</el-row>

				<el-row>
				  <el-form-item label="请求参数">
						<el-input class="textarea-large" v-model="form.parameter" type="textarea"></el-input>
				  </el-form-item>
				</el-row>
				<el-row>
				  <el-form-item label="返回结果">
						<el-input class="textarea-large" v-model="form.result" type="textarea"></el-input>
				  </el-form-item>
				</el-row>
				<template v-if="form.isException === true">
					<el-row>
						<el-form-item label="异常类型" prop="type">
							<div class="form-item-text"><textContent :text="form.exceptionType"></textContent></div>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="异常信息">
							<el-input class="textarea-large" v-model="form.exceptionInfo" type="textarea"></el-input>
						</el-form-item>
					</el-row>
				</template>


			</div>
		</div>
		<div class="form-footer">
			<el-button size="small" @click="$emit('cancel')">关闭</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import logApi from '@shop/api/logs'

	export default {
		props:{
			id:null,
		},
		components:{
		},
		data() {
			return {
				loading:1,
				saveLoading:false,
				rules:{
				},
				form:{
					type:'',
					url:'',
					parameter:'',
					result:''
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
				this.$request.load(logApi.getInterfaceLog({
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
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
