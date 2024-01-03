<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row>
				  <el-form-item label="异常类型" prop="exceptionType">
						<div class="form-item-text"><textContent :text="form.exceptionType"></textContent></div>
				  </el-form-item>
				</el-row>
				<el-row>
				  <el-form-item label="url" prop="exceptionType">
						<div class="form-item-text"><textContent :text="form.url"></textContent></div>
				  </el-form-item>
				</el-row>
				<el-row>
				  <el-form-item label="请求方法" prop="method">
						<div class="form-item-text"><textContent :text="form.method"></textContent></div>
				  </el-form-item>
				</el-row>
				<el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="接口类型" prop="apiType">
                            <div class="form-item-text"><textContent :text="form.apiType_dictText"></textContent></div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公司ID" prop="companyId">
                            <div class="form-item-text"><textContent :text="form.companyId"></textContent></div>
                        </el-form-item>
                    </el-col>

				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="用户ID" prop="userId">
						<div class="form-item-text"><textContent :text="form.userId"></textContent></div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="会员ID" prop="memberId">
							<div class="form-item-text"><textContent :text="form.memberId"></textContent></div>
						</el-form-item>
					</el-col>
				</el-row>
                <template v-if="form.methodType === 'POST'">
                    <el-row>
                        <el-form-item label="请求body">
                            <el-input class="textarea-large" v-model="form.body" type="textarea"></el-input>
                        </el-form-item>
                    </el-row>
                </template>

                <el-row>
                    <el-form-item label="信息">
                        <el-input class="textarea-large" v-model="form.message" type="textarea"></el-input>
                    </el-form-item>
                </el-row>
				<el-row>
					  <el-form-item label="异常信息">
						<el-input class="textarea-large" v-model="form.exceptionInfo" type="textarea"></el-input>
					  </el-form-item>
				</el-row>

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
					exceptionType:'',
					exceptionInfo:''
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
				this.$request.load(logApi.getSysExceptionLog({
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
