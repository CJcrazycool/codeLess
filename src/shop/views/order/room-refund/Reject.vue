<template>
	<el-form class="dialog-form" @submit.native.prevent :model="form" ref="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row>
				  <el-form-item label="驳回原因" prop="rejectionReason">
				  	<el-input v-model="form.rejectionReason" placeholder="请填写驳回原因" type="textarea"></el-input>
				  </el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button :disabled="!form.rejectionReason" :loading="saveLoading" native-type="submit" size="small" type="danger" @click="submit">确认驳回</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'

	export default {
		props:{
			order:null,
			refundOrder:null
		},
		components: {},
		data() {
			return {
				roomRefundOrderApi,
				saveLoading:false,
				form: {
					refundSn:this.refundOrder.refundSn,
					rejectionReason:''
				},
				rules: {
				},
			}
		},
		watch: {},
		computed: {},
		created() {
		},
		methods: {
			submit() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善驳回信息'
					})
					return
				}
				this.$request.submit(roomRefundOrderApi.reject({
					params:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(!response.data.success)
							throw new Error()
						this.$emit('success')
					},
					successText:()=>{
						return '已驳回退款'
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
