<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
					 <el-form-item label="商户编码">
							<div class="form-item-text">
								<textContent :text='"000010"'></textContent>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商户名称">
							<div class="form-item-text">
								<textContent :text='"中濠集团"'></textContent>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="审核状态">
							<div class="form-item-text">
								<textContent :text="'未审核'"></textContent>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="发布状态">
							<div class="form-item-text">
								<textContent :text="'未发布'"></textContent>
							</div>
					 </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="提交时间">
							<div class="form-item-text">
								<textContent :text="'2023-11-23 14:32:30'"></textContent>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="发布时间">
							<div class="form-item-text">
								<textContent :text="''"></textContent>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="form-area-title">模版信息</div>
			<div class="form-area">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="小程序APPID">
							<div class="form-item-text">
								<textContent :text="'wxa7a14e00e24149d0'"></textContent>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="模版ID">
							<div class="form-item-text">
								<textContent :text="'3081'"></textContent>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="模版名称">
							<div class="form-item-text">
								<textContent :text="'盛世康养智慧平台'"></textContent>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="模版版本号">
							<div class="form-item-text">
								<textContent :text="'20231122.1154'"></textContent>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="版本描述">
						<div class="form-item-text">
							<textContent :text="'众邦养老小程序：优化生命体征 Glod 在 2023年11月23日上午10点51分 提交上传'"></textContent>
						</div>
					</el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import rechargeOrderApi from '@shop/api/rechargeOrder'

	export default {
		props: {
			id: {}
		},
		components: {},
		data() {
			return {
				loading: 2,
				form: {
					orderSn: '',
					paySn: '',
					payPrice: 0,
					orderState: null,
					orderState_dictText: '',
					totalRefund: 0,
					refundTime: '',
					mbrCardTypeName: '',
					mbrCardNo: '',
					mobile: '',
					saleName: '',
					hotelName: ''
				},
				rules: {}
			}
		},
		computed: {},
		watch: {},
		created() {
			this.load()
		},
		methods: {
			load() {
				if (this.id)
					this.loadData(this.id)
			},
			loadData(id) {
				return
				this.$request.load(rechargeOrderApi.queryById({
					params: {
						orderSn: this.id
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
