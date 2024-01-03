<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="日志类型">
						  <div class="form-item-text"><textContent :text="form.logType_dictText"></textContent></div>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="操作类型">
						  <div class="form-item-text"><textContent :text="form.operateType_dictText"></textContent></div>
					  </el-form-item>
				  </el-col>
				</el-row>
				<template v-if="form.logType !== 1">
					<el-row>
						<el-form-item label="url" prop="url">
							<div class="form-item-text"><textContent :text="form.requestUrl"></textContent></div>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="请求方法" prop="method">
							<div class="form-item-text"><textContent :text="form.method"></textContent></div>
						</el-form-item>
					</el-row>
				</template>

				<template v-if="form.requestType === 'POST' && form.logType === 2">
					<el-row>
						<el-form-item label="请求参数">
							<el-input class="textarea-large" v-model="form.requestParam" type="textarea"></el-input>
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
					logType_dictText:'',
					operateType_dictText:'',
					requestParam:''
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
				this.$request.load(logApi.getSysLog({
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
