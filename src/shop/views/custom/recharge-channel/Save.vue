<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="渠道名称" prop="name">
						<el-input v-model="form.name" placeholder="请填写渠道名称">
						</el-input>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="所属分店" prop="hotelCode">
						<el-select v-model="form.hotelCode" placeholder="请选择所属分店" class="fill-width" :clearable="true">
							<el-option v-for="hotel in hotelList" :key="hotel.id" :label="hotel.name" :value="hotel.code"></el-option>
						</el-select>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="开启固定金额">
						<el-switch v-model="form.isFixed">
						</el-switch>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="开启自定义金额">
						<el-switch v-model="form.isCustom">
						</el-switch>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="开启业务员选择">
						<el-switch v-model="form.isMarketer">
						</el-switch>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开启充值渠道">
						<el-switch v-model="form.state">
						</el-switch>
					  </el-form-item>
					</el-col>
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
	import hotelApi from '@shop/api/hotel'
	import memberApi from '@shop/api/member'

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
				form:{
					name:'',
					hotelCode:'',
					isFixed:true,
					isCustom:true,
					state:true,
					isMarketer:false
				},
				rules:{
					'name': [{
						required: true,
						message: '请填写渠道名称'
					}]
				},
				hotelList:[]
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			if(this.id)
				this.load(this.id)
			this.loadHotel()
		},
		methods: {
			load(id){
				this.$request.load(memberApi.getMemberRechargeChannel({
					params: {
						id
					},
					before:()=>{
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
			loadHotel(){
				this.$request.load(hotelApi.queryHotelList({
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.hotelList = response.data.result
					}
				}))
			},
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善充值渠道信息'
					})
					return
				}
				var api = !this.form.id?memberApi.addRechargeChannel:memberApi.editRechargeChannel
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.$emit('save')
					},
					successText:()=>{
						return '保存成功'
					},
					complete:()=>{
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>