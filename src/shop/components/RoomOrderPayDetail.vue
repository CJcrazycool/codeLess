<!-- 客房订单支付明细 -->
<template>
	<tableView class="pay-detail-table" ref="table" :data="orderData" size="small">
			<el-table-column type="expand">
			      <template slot-scope="scope">
						<table class="price-detail-table" cellspacing="0" cellpadding="0" border="0" width="430">
							<colgroup>
								<col width="50%">
								<col width="50%">
							</colgroup>
							<thead>
								<tr>
									<th>房费明细</th>
									<th>价格</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in scope.row.orderItems">
									<td rowspan="1" colspan="1">
										{{item.checkInTime}}
									</td>
									<td rowspan="1" colspan="1">
										{{$formatter.price(item.price)}}
									</td>
								</tr>
							</tbody>
						</table>
			      </template>
			</el-table-column>
		  <el-table-column label="房间信息">
			<template slot-scope="scope">
				<thumbInfo img-fit="cover" :image-url="scope.row.roomTypeImage">
					<template slot="title">
						{{scope.row.roomTypeName}}
					</template>
					<template slot="desc">
						全日房 {{scope.row.nights}}晚 {{scope.row.roomQty}}间
					</template>
				</thumbInfo>
			</template>
		  </el-table-column>
		  <el-table-column prop="hotelName" label="预订酒店"></el-table-column>
		  <el-table-column label="订单状态">
			  <template slot-scope="scope">
			    {{scope.row.orderStateName}}
			  </template>
		  </el-table-column>
		  <el-table-column width="180" label="实收金额">
			<template slot-scope="scope">
				{{$formatter.price(scope.row.payPrice)}}
				<template v-if="scope.row.couponAmount>0"><br/>已优惠 {{$formatter.price(scope.row.couponAmount)}}</template>
			</template>
		  </el-table-column>
		  <el-table-column width="120" align="center">
				<template slot-scope="scope">
					<el-button size="small" type="text" @click="priceDetail(scope.row)">房费明细</el-button>
				</template>
		  </el-table-column>
		</tableView>
</template>

<script>
	export default {
		props:{
			order:{}
		},
		data() {
			return {
				orderData:[]
			}
		},
		watch: {
		},
		computed: {
		},
		created(){
			this.orderData = []
			this.orderData.push(this.order)
		},
		mounted() {
		},
		methods: {
			priceDetail(row){
				this.$refs.table.$refs.table.toggleRowExpansion(row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.price-detail-table{
		padding-left: 80px;
		tr{
			line-height: 35px;
		}
	}
</style>