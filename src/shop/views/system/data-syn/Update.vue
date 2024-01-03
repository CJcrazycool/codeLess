<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="update"></tabHeader>
		<el-alert show-icon :closable="false"
		    title="更新数据将会覆盖原有字段，请做好备份避免造成数据丢失"
		    type="warning">
		  </el-alert>
		<div class="content">
			<el-popconfirm title="确认更新？" placement="bottom-start" @confirm="batchUpdate">
				<el-button slot="reference" class="batch-update" size="small" type="primary" :loading="updateLoading.batch" :disabled="disabledBatch">一键更新</el-button>
			</el-popconfirm>
			<div class="area-title">
				<span v-if="state" :class="{danger:!state.hotelData}" class="circle"></span>
				<span class="text">酒店数据</span>
				<template v-if="state">
					<el-tag v-if="state.hotelData" size="small" type="success">已配置直连</el-tag>
					<el-tag v-else size="small" type="danger">未配置直连</el-tag>
				</template>
			</div>
			<div class="item-list">
				<div class="item">
					<div class="item-main">
						<div class="item-operate">
							<el-popconfirm title="确认更新？" placement="bottom-start" @confirm="update('hotel')">
								<el-button slot="reference" size="mini" type="primary" :loading="updateLoading.hotel" :disabled="!state || !state.hotelData">更新</el-button>
							</el-popconfirm>
						</div>
						<div class="item-name">酒店房型</div>
						<div class="item-desc">酒店、房型信息</div>
					</div>
					<div class="item-footer">
						<div class="item-updatetime">
							<template v-if="state">
								<span v-if="state.hotelTime">更新时间 {{state.hotelTime}}</span>
								<span v-else>{{emptyUpdateTime}}</span>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="area-title">
				<span v-if="state" :class="{danger:!state.memberData}" class="circle"></span>
				<span class="text">会员数据</span>
				<template v-if="state">
					<el-tag v-if="state.memberData" size="small" type="success">已配置直连</el-tag>
					<el-tag v-else size="small" type="danger">未配置直连</el-tag>
				</template>
			</div>
			<div class="item-list">
				<div class="item">
					<div class="item-main">
						<div class="item-operate">
							<el-popconfirm title="确认更新？" placement="bottom-start" @confirm="update('memberCard')">
								<el-button slot="reference" size="mini" type="primary" :loading="updateLoading.memberCard" :disabled="!state || !state.memberData">更新</el-button>
							</el-popconfirm>
						</div>
						<div class="item-name">会员卡</div>
						<div class="item-desc">会员卡信息、储值政策</div>
					</div>
					<div class="item-footer">
						<div class="item-updatetime">
							<template v-if="state">
								<span v-if="state.memberCardTypeTime">更新时间 {{state.memberCardTypeTime}}</span>
								<span v-else>{{emptyUpdateTime}}</span>
							</template>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="item-main">
						<div class="item-operate">
							<el-popconfirm title="确认更新？" placement="bottom-start" @confirm="update('coupon')">
								<el-button slot="reference" size="mini" type="primary" :loading="updateLoading.coupon" :disabled="!state || !state.memberData">更新</el-button>
							</el-popconfirm>
						</div>
						<div class="item-name">优惠券</div>
						<div class="item-desc">优惠券信息</div>
					</div>
					<div class="item-footer">
						<div class="item-updatetime">
							<template v-if="state">
								<span v-if="state.couponTypeTime">更新时间 {{state.couponTypeTime}}</span>
								<span v-else>{{emptyUpdateTime}}</span>
							</template>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="item-main">
						<div class="item-operate">
							<el-popconfirm title="确认更新？" placement="bottom-start" @confirm="update('salesMan')">
								<el-button slot="reference" size="mini" type="primary" :loading="updateLoading.salesMan" :disabled="!state || !state.memberData">更新</el-button>
							</el-popconfirm>
						</div>
						<div class="item-name">业务员</div>
						<div class="item-desc">业务员信息</div>
					</div>
					<div class="item-footer">
						<div class="item-updatetime">
							<template v-if="state">
								<span v-if="state.marketerTypeTime">更新时间 {{state.marketerTypeTime}}</span>
								<span v-else>{{emptyUpdateTime}}</span>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tabHeader from './Tab'
	import systemDataSyn from '@shop/api/systemDataSyn'

	export default {
		components:{
			tabHeader
		},
		data() {
			return {
				loading:0,
				state:null,
				updateLoading:{
					batch:false,
					hotel:false,
					memberCard:false,
					coupon:false,
					salesMan:false
				}
			}
		},
		computed: {
			emptyUpdateTime(){
				return '无更新记录'
			},
			disabledBatch(){
				if(this.state && (this.state.memberData || this.state.hotelData))
					return false
				return true
			},
			updateTypeApi(){
				var updateTypeApi = {}
				if(this.state){
					if(this.state.memberData){
						updateTypeApi['memberCard'] = systemDataSyn.synMemberCardData
						updateTypeApi['coupon'] = systemDataSyn.synCouponData
						updateTypeApi['salesMan'] = systemDataSyn.synSalesManData
					}
					if(this.state.hotelData)
					{
						updateTypeApi['hotel'] = systemDataSyn.synHotelData
					}
				}
				return updateTypeApi
			}
		},
		watch: {
		},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(systemDataSyn.queryState({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.loading = 2
						this.state = response.data.result
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			updateSuccess(){
				this.$confirm('数据正在更新中，请稍后查看更新结果', '提示', {
					  confirmButtonText: '更新结果',
					  cancelButtonText: '关闭',
					  type: 'success',
					  center: true,
					}).then(() => {
						this.$router.push({
							path:'./record'
						})
					}).catch(()=>{
						
					})
			},
			update(type){
				this.$request.submit(this.updateTypeApi[type]({
					before: () => {
						this.updateLoading[type] = true
					},
					showSuccessMessage:false,
					success: (response) => {
						if(response.data.success){
							this.updateSuccess()
						}
					},
					complete: () => {
						this.updateLoading[type] = false
					}
				}))
			},
			batchUpdate(){
				var list = []
				for(let type in this.updateTypeApi){
					list.push(this.updateTypeApi[type]({
						before: () => {
							this.updateLoading[type] = true
						},
						complete: () => {
							this.updateLoading[type] = false
					}}))
				}
				if(list)
					this.$request.mergeSubmit({
						before:()=>{
							this.updateLoading.batch = true
						},
						success: () => {
							this.updateSuccess()
						},
						complete:()=>{
							this.updateLoading.batch = false
						},
						list:list
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.batch-update{
		margin-top: 15px;
		margin-bottom: 20px;
		margin-right: 15px;
	}
	
	.content{
		padding: 0px 20px;
	}
	
	.area-title{
		margin-top: 0px;
		display: flex;
		align-items: center;
		padding: 20px 0px;
		
		.circle{
			display: inline-block;
			width: 8px;
			height:8px;
			background-color: $--color-success;
			border-radius: 8px;
			&.danger{
				background-color: $--color-danger;
			}
		}
		
		.text{
			margin-left: 12px;
			margin-right: 12px;
			font-size: 16px;
			font-weight: 800;
		}
		
		&:first-child{
			margin-top: 10px;
		}
	}
	
	.item{
		border-radius: $--border-radius-base;
		width: 250px;
		display: inline-block;
		margin-right: 20px;
		margin-bottom: 20px;
		background-color: $--background-color-base;
		padding: 16px;
		border: 1px solid $--background-color-base;
		&:hover{
			border-color: $--color-primary;
		}
	}
	
	.item-main{
		height: 80px;
	}
	
	.item-desc{
		margin-top: 8px;
		font-size: 14px;
		color: $--color-text-secondary;
	}
	
	.item-updatetime{
		font-size: 14px;
		color: $--color-text-secondary;
	}
	
	.item-operate{
		float: right;
	}
</style>