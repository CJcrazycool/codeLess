<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row>
				  <el-form-item label="封面图">
				  	<imageZoneSelector v-model="form.image" :limit="1" :multiple="false"></imageZoneSelector>
				  </el-form-item>
				</el-row>
				<el-row>
				  <el-form-item label="使用说明">
					<el-input v-model="form.remark" placeholder="请填写使用说明" type="textarea">
					</el-input>
				  </el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary" @click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import memberApi from '@shop/api/member'
	import couponApi from '@shop/api/coupon'

	export default {
		props:{
			id:{}
		},
		components:{
		},
		data() {
			return {
				loading:0,
				form:{
					image:null,
					description:'',
					rechargeDescription:''
				},
				saveLoading:false,
				rules:{
				},
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
				this.$request.load(couponApi.queryById({
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
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善优惠券信息'
					})
					return
				}

				this.$request.submit(couponApi.edit({
					data: this.form,
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
					complete:()=>{
						this.saveLoading = false
					}
				}))

				
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>