<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<roomRefundTableView ref="table" row-key="id" size="small" :search-form="searchForm"
				:load-request="roomRefundOrderApi.pageList()">
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryOrderOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryContactsOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="预订酒店">
							<el-select v-model="searchForm.hotelCode" placeholder="请选择预订酒店" :clearable="true">
							    <el-option
							      v-for="item in hotelList"
							      :key="item.id"
							      :label="item.name"
							      :value="item.code">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="申请时间">
							<dateRange :begin-value.sync="searchForm.startApplyTime" :end-value.sync="searchForm.endApplyTime"></dateRange>
						</el-form-item>
						<el-form-item label="退款时间">
							<dateRange :begin-value.sync="searchForm.startRefundTime" :end-value.sync="searchForm.endRefundTime"></dateRange>
						</el-form-item>
					</template>
					<el-tabs slot="state" v-model="stateActive" :before-leave="stateBeforeLeave">
						<el-tab-pane label="全部退款" name="all"></el-tab-pane>
						<el-tab-pane label="处理中" name="PENDING"></el-tab-pane>
						<el-tab-pane label="同意退款" name="CONSENT_REFUND"></el-tab-pane>
						<el-tab-pane label="退款驳回" name="REJECTION"></el-tab-pane>
						<el-tab-pane label="已撤销" name="REVOCATION"></el-tab-pane>
					</el-tabs>
					<template v-slot:operate="scope">
						<el-button size="small" type="text" @click="detail(scope.row)">查看</el-button>
					</template>
				</roomRefundTableView>
			</div>
		</div>
	</div>
</template>

<script>
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'
	import roomRefundTableView from '@shop/components/RoomRefundTableView'
	import hotelApi from '@shop/api/hotel'
	import {formatter} from '@public/js/util'
	import {dateHelper} from '@public/js/util'
	
	export default {
		components:{
			roomRefundTableView
		},
		data() {
			return {
				roomRefundOrderApi,
				stateActive:'all',
				queryOrderOptions:[
					{
						name:'orderSn',
						label:'订单编号'
					},
					{
						name:'refundSn',
						label:'退款编号'
					}
				],
				queryContactsOptions:[
					{
						name:'contactName',
						label:'住客姓名'
					},
					{
						name:'mobile',
						label:'联系手机'
					}
				],
				searchForm: {
					refundState:null,
					orderSn:'',
					refundSn:'',
					contactName:'',
					mobile:'',
					hotelCode:'',
					startApplyTime:'',
					endApplyTime:'',
					startRefundTime:'',
					endRefundTime:''
				},
				hotelList:[],
				tabActive:'all'
			}
		},
		computed: {
		},
		created() {
			this.loadQueryParams(this.$route.query)
			this.loadHotel()
			var defaultDateRange = dateHelper.getRecentDayRange(90)
			this.searchForm.startApplyTime = formatter.getDateText(defaultDateRange.start)
			this.searchForm.endApplyTime = formatter.getDateText(defaultDateRange.end)
		},
		methods: {
			loadQueryParams(params){
				var stateValue = {
					'pending':'PENDING'
				} [params.state]
				if(stateValue){
					this.searchForm.refundState = stateValue
					this.stateActive = stateValue
				}
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
			stateBeforeLeave(name){
				var refundState = null
				if(name != 'all')
					refundState = name
				this.searchForm.refundState = refundState
				this.$refs.table.search()
			},
			detail(row){
				this.$router.openWindow({
					path:'./detail',
					query:{
						refundSn:row.refundSn
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>