<template>
	<div>
		<!-- <div class="input-content">
			<span class="unit">￥</span>
			<span class="value">充值金额</span>
		</div> -->
		<div v-loading="loading==1" class="recharge-info">
			<template v-if="loading==2">
				<el-empty class="empty" :image-size="80" v-if="!mbrRechargePolicyList || mbrRechargePolicyList.length<=0" description="暂无储值政策"></el-empty>
				<div v-else class="recharge-list">
					<el-row :gutter="15">
						<el-col :span="8" v-for="item in mbrRechargePolicyList" :key="item.id">
							<div class="recharge-item">
								<div class="main-text">{{item.minAmount}}元</div>
								<div class="desc-text">赠送{{item.samount}}元</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="recharge-desc">
					<div class="title">充值说明</div>
					<div class="content">
						<template v-if="mbrCardType.rechargeDescription">{{mbrCardType.rechargeDescription}}</template>
						<emptyText v-else></emptyText>
					</div>
				</div>
			</template>
		</div>
		<div class="dialog-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	import memberApi from '@shop/api/member'

	export default {
		props: {
			id:{}
		},
		components: {},
		data() {
			return {
				loading:0,
				mbrCardType:null,
				mbrRechargePolicyList:[]
			}
		},
		computed: {},
		watch: {},
		created() {
			if(this.id)
				this.load(this.id)
		},
		methods: {
			load(id){
				this.$request.mergeLoad({
					before:()=>{
						this.loading = 1
					},
					success:()=>{
						this.loading = 2
					},
					error: () => {
						this.loading = 0
					},
					sync:true,
					list:[
						memberApi.getMemberCardType({
							params: {
								id
							},
							success: (response) => {
								if (!response.data.result) {
									throw new Error()
								}
								this.mbrCardType = response.data.result
							}
						}),
						memberApi.memberRechargePolicy({
							params: ()=>{
								return {
									cardTypeCode:this.mbrCardType.code
								}
							},
							success: (response) => {
								if (!response.data.result) {
									throw new Error()
								}
								this.mbrRechargePolicyList = response.data.result
							}
						})
					]
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.empty{
		padding: 0px;
	}
	
	.recharge-info {
		min-height: 300px;
		padding: 0px 20px;
	}

	.input-content {
		background-color: $--background-color-base;
		padding: 10px 20px 10px 20px;
		border-radius: $--border-radius-base;
		margin-bottom: 20px;

		.unit {
			color:$--color-text-primary;
			font-size: 38px;
			margin-right: 6px;
			font-weight: $font-weight-large;
		}

		.value {
			font-size: $--font-size-medium;
			color: $--color-text-secondary;
		}
	}

	.recharge-list {
	}
	
	.recharge-item {
		background-color: $--background-color-base;
		margin-bottom: 15px;
		width: 100%;
		height: 80px;
		border-radius: $--border-radius-base;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.main-text{
			color:$--color-text-primary;
			font-size: 22px;
		}
		.desc-text{
			margin-top: 4px;
			font-size: $--font-size-extra-small;
		}
	}
	
	.recharge-desc{
		margin-top: 20px;
		border-top:$--border-base;
		padding: 35px 0px;
		
		.title{
			color:$--color-text-primary;
			font-weight: $font-weight-large;
			margin-bottom: 12px;
		}
		
		.content{
			line-height: 26px;
		}
	}
</style>
