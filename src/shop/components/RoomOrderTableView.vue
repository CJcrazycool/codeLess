<!-- 客房订单表格视图 -->
<template>
	<div class="table-view order-table-view">
		<div v-if="$slots['search']" class="table-view-search">
			<el-form ref="searchForm" class="form" size="small" inline label-position="right" :model="searchForm"
				@submit.native.prevent>
				<slot name="search"></slot>
				<el-form-item>
					<el-button size="small" :disabled="remoteLoading" native-type="submit" type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-if="$slots['operate']" class="table-view-operate">
			<slot name="operate"></slot>
		</div>
		<div v-if="$slots['state']" class="state-condition">
			<slot name="state"></slot>
		</div>
		<div class="table-view-center" ref="viewCenter" v-loading="remoteLoading">
			<div class="order-table">
				<div class="tb-header">
					<table cellspacing="0" cellpadding="0" border="0" width="100%">
						<slot></slot>
						<colgroup>
							<col width="25%">
							<col width="15%">
							<col width="12%">
							<col width="12%">
							<col width="18%">
							<col width="18%">
						</colgroup>
						<thead>
							<tr>
								<th class="tb-header-cell"><div class="cell">房间信息</div></th>
								<th class="tb-header-cell"><div class="cell">预订酒店</div></th>
								<th class="tb-header-cell"><div class="cell">实收金额</div></th>
								<th class="tb-header-cell"><div class="cell">订单/退款状态</div></th>
								<th class="tb-header-cell"><div class="cell">住客信息</div></th>
								<th class="tb-header-cell"><div class="cell">入住时间</div></th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="tb-body">
					<el-empty v-if="!remoteLoading && remoteData.length<=0" class="empty-data" description="暂无订单"></el-empty>
					<div v-else v-for="(row,index) in remoteData" class="row">
						<div class="row-header">
							<div>
								<div class="num-info">订单编号：{{row.orderSn}}<copyText class="span_left" :text="row.orderSn"></copyText></div>
								<div class="num-info">支付单号：{{row.paySn}}<copyText class="span_left" :text="row.paySn"></copyText></div>
							</div>
							<div>
								<div class="order-time">下单时间：{{row.createTime}}</div>
								<div v-if="$scopedSlots.operate" class="order-operate">
									<slot name="operate" :row="row"></slot>
								</div>
							</div>
						</div>
						<table cellspacing="0" cellpadding="0" border="0" width="100%" class="row-detail">
							<colgroup>
								<col width="25%">
								<col width="15%">
								<col width="12%">
								<col width="12%">
								<col width="18%">
								<col width="18%">
							</colgroup>
							<tbody>
								<tr>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">
											<thumbInfo img-fit="cover" :image-url="row.roomTypeImage">
												<template slot="title">
													{{row.roomTypeName}}
												</template>
												<template slot="desc">
													全日房 {{row.nights}}晚 {{row.roomQty}}间
												</template>
											</thumbInfo>
										</div>
									</td>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">{{row.hotelName}}</div>
									</td>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">{{$formatter.price(row.payPrice)}}</div>
									</td>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">{{row.orderStateName}}<template v-if="row.refundSn"><br/><el-link :underline="false" type="primary" @click="refundDetail(row)">{{row.refundStateName}}</el-link></template></div>
									</td>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">
											<div>{{row.contactName}}</div>
											<div>{{row.mobile}}</div>
										</div>
									</td>
									<td rowspan="1" colspan="1" class="row-cell">
										<div class="cell">
											<div>{{row.arriveDate}} 抵店</div>
											<div>{{row.leaveDate}} 离店</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div v-if="loadRequest" class="table-view-bottom">
			<paginationLoader ref="paginationLoader" :load-request="loadRequest" :load-request-params="loadRequestParams" :load-request-params-type="loadRequestParamsType" 
			:data.sync="remoteData" :loading.sync="remoteLoading" @change-page="scrollIntoView" @reload="scrollIntoView"></paginationLoader>
		</div>
	</div>
</template>

<script>
	import lodashFp from 'lodash/fp'

	export default {
		components: {},
		props: {
			//远程加载请求
			loadRequest:{},
			loadRequestParamsType:{},
			//远程加载请求参数
			loadRequestParams:{
				default () {
					return {}
				}
			},
			//搜索表单
			searchForm: {
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				remoteLoading:false,
				remoteData:[]
			}
		},
		watch: {
			'remoteData':{
				handler(value) {
					this.$emit('remote-data',value)
				}
			}
		},
		computed: {
		},
		created(){
			this.setSearchParams()
		},
		mounted() {
		},
		methods: {
			scrollIntoView(){
				this.$refs['viewCenter'].scrollIntoView()
			},
			search() {
				this.setSearchParams()
				this.reloadData(true)
			},
			setSearchParams(){
				this.loadRequestParams = Object.assign(this.loadRequestParams,lodashFp.cloneDeep(this.searchForm))
			},
			reloadData(resetPageNum){
				this.$refs['paginationLoader'].reloadData(resetPageNum)
			},
			refundDetail(row){
				this.$router.openWindow({
					path:'/order/room-refund/detail',
					query:{
						refundSn:row.refundSn
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@public/styles/components/table-view';
</style>
