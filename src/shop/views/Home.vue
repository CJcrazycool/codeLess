<template>
	<div class="page-panel page-panel-body">
		<div class="data-panel area-block">
			<div class="data-panel-left">
				<div>
					<div class="area-block-title">实时数据</div>
					<span class="data-reload-time">更新时间：{{todayDataLoadTime}}</span>
					<el-button @click="loadTodayData" :loading="todayDataLoading" type="text" size="mini">刷新</el-button>
				</div>
				<div class="data-panel-area" v-loading="todayDataLoading">
					<div class="table">
						<el-row class="row">
							<el-col :span="8">
								<div class="data-item">
									<div class="title">支付订单数</div>
									<div class="value">{{todayData.payOrderCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">支付人数</div>
									<div class="value">{{todayData.payCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">累计支付金额</div>
									<div class="value">{{$formatter.price(todayData.totalFee)}}</div>
								</div>
							</el-col>
						</el-row>
						<el-row class="row">
							<el-col :span="8">
								<div class="data-item">
									<div class="title">退款订单数</div>
									<div class="value">{{todayData.refundOrderCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">退款人数</div>
									<div class="value">{{todayData.refundCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">累计退款金额</div>
									<div class="value">{{$formatter.price(todayData.totalRefundFee)}}</div>
								</div>
							</el-col>
						</el-row>
						<el-row class="row">
							<el-col :span="8">
								<div class="data-item">
									<div class="title">访客数（UV）</div>
									<div class="value">{{todayData.visitorCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">访问量（PV）</div>
									<div class="value">{{todayData.pageViewCount}}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="data-item">
									<div class="title">新注册会员</div>
									<div class="value">{{todayData.registerCount}}</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<div class="data-panel-right tendency-chart">
				<div>
					<div class="area-block-title">数据趋势图</div>
					<div class="charts-search" style="float: right;">
						<dictSelect class="search-date" dict-key="tenant_tendency_date" size="mini" v-model="tendencySearchForm.tendencyDateType"></dictSelect>
						<dictSelect class="search-condition" dict-key="tenant_tendency_type" size="mini" v-model="tendencySearchForm.tendencyType"></dictSelect>
					</div>
				</div>
				<div class="chart-content" v-loading="tendencyLoading">
					<div id="tendencyChart" v-if="tendencyChartsAlive"></div>
				</div>
			</div>
		</div>
		<div class="area-block">
			<div class="area-block-title">待处理事项</div>
			<div class="data-panel-area" v-loading="missionLoading">
				<div class="table">
					<el-row class="row">
						<el-col :span="6">
							<div class="data-item">
								<div class="title">客房待入住</div>
								<div class="value"><span
										@click="$router.push({path:'/order/room-order/list',query:{state:'wait'}})"
										class="link">{{missionData.waitCheckInCount}}</span></div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="data-item">
								<div class="title">客房预订失败</div>
								<div class="value"><span
										@click="$router.push({path:'/order/room-order/list',query:{state:'fail'}})"
										class="link">{{missionData.reserveFailCount}}</span></div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="data-item">
								<div class="title">客房退款待处理</div>
								<div class="value"><span
										@click="$router.push({path:'/order/room-refund/list',query:{state:'pending'}})"
										class="link">{{missionData.refundPendingCount}}</span></div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="data-item">
								<div class="title">未读消息</div>
								<div class="value"><span class="link">{{missionData.unreadCount}}</span></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

		<div class="area-block" v-if="fastOperates.length>0">
			<div class="area-block-title">快捷功能</div>
			<div class="fast-operate">
				<div v-for="(item,index) in fastOperates" :key="index" class="fast-operate-item"
					@click="$router.push(item.path)">
					<div class="item-wrap">
						<div class="center">
							<div class="icon" :class="item['color-class']">
								<i :class="item.icon"></i>
							</div>
							<div class="label">{{item.label}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import dataStatisticsApi from '@shop/api/dataStatistics'
	import dataDict from '@public/js/dataDict'

	export default {
		components: {},
		data() {
			return {
				dataStatisticsApi,
				todayDataLoadTime: null,
				todayData: {
					payOrderCount: 0,
					payCount: 0,
					totalFee: 0,
					refundOrderCount: 0,
					refundCount: 0,
					totalRefundFee: 0,
					visitorCount: 0,
					pageViewCount: 0,
					registerCount: 0
				},
				todayDataLoading: false,
				tendencySearchForm: {
					tendencyDateType: "1",
					tendencyType: "1"
				},
				tendencyChartsAlive: true,
				tendencyLoading: false,
				missionLoading: false,
				missionData: {
					waitCheckInCount: 0,
					reserveFailCount: 0,
					refundPendingCount: 0,
					unreadCount: 0
				},
				fastOperates: [{
						'color-class': 'blue',
						'icon': 'el-icon-s-order',
						'label': '客房订单',
						'path': '/order/room-order/list'
					},
					{
						'color-class': 'red',
						'icon': 'ext-iconfont ext-icon-refund',
						'label': '退款查询',
						'path': '/order/room-refund/list'
					},
					{
						'color-class': 'green',
						'icon': 'el-icon-circle-plus-outline',
						'label': '充值记录',
						'path': '/custom/recharge-record/list'
					},
					{
						'color-class': 'green',
						'icon': 'el-icon-user-solid',
						'label': '客户管理',
						'path': '/custom/customer/list'
					},
					{
						'color-class': 'blue',
						'icon': 'el-icon-picture',
						'label': '素材空间',
						'path': '/shop/resource/image/list'
					},
					{
						'color-class': 'orange',
						'icon': 'el-icon-office-building',
						'label': '酒店管理',
						'path': '/hotel/hotel/list'
					},
					{
						'color-class': 'red',
						'icon': 'ext-iconfont ext-icon--trade',
						'label': '对账中心',
						'path': '/trade/trade-record/list'
					}
				]
			}
		},
		watch: {
			tendencySearchForm: {
				deep: true,
				handler() {
					this.loadTendencyData()
				}
			}
		},
		computed: {},
		created() {
			this.loadTodayData()
			this.loadTendencyData()
			this.loadMissionData()
			this.loadFastOperates()
		},
		mounted() {
		},
		methods: {
			loadFastOperates(){
				var fastOperates = []
				this.fastOperates.forEach((item)=>{
					if(this.$permission.checkByPath(item.path))
						fastOperates.push(item)
				})
				this.fastOperates = fastOperates
			},
			loadTodayData() {
				this.$request.load(dataStatisticsApi.todayData({
					before: () => {
						this.todayDataLoading = true
					},
					success: (response) => {
						if (!response.data.result)
							throw new Error()
						this.todayDataLoadTime = this.$formatter.getDateText(new Date())
						this.todayData = response.data.result
					},
					complete: () => {
						this.todayDataLoading = false
					}
				}))
			},
			loadTendencyData() {
				this.$request.load(dataStatisticsApi.tendencyData({
					params: this.tendencySearchForm,
					before: () => {
						this.tendencyLoading = true
					},
					success: (response) => {
						if (!response.data.result)
							throw new Error()
						this.renderTendencyChart(response.data.result)
					},
					complete: () => {
						this.tendencyLoading = false
					}
				}))
			},
			renderTendencyChart(datas) {
				var tipLabel = dataDict.value('tenant_tendency_type',this.tendencySearchForm.tendencyType)
				var interval = {
					1: 0,
					2: 2,
					3: 4
				} [this.tendencySearchForm.tendencyDateType]
				var xData = []
				var sData = []
				datas.forEach((row) => {
					xData.push(row.date)
					var data = row.data
					if (this.tendencySearchForm.tendencyType == 1 || this.tendencySearchForm.tendencyType == 3) {
						data = this.$formatter.price(data)
					}
					sData.push(data)
				})
				var render = () => {
					let chart = echarts.init(document.getElementById("tendencyChart"));
					chart.setOption({
						tooltip: {
							trigger: 'axis',
							formatter: '{b}<br/>' + tipLabel + ': {c}'
						},
						xAxis: {
							data: xData,
							axisLabel: {
								interval: interval
							}
						},
						yAxis: {},
						series: [{
							data: sData,
							type: 'line',
							smooth: true,
							symbol: 'circle',
							symbolSize: 6
						}],
						grid: {
							x: 55,
							y: 30,
							x2: 35,
							y2: 40
						},
					});
				}
				this.tendencyChartsAlive = false
				this.$nextTick(() => {
					this.tendencyChartsAlive = true
					this.$nextTick(() => {
						render()
					})
				})
			},
			loadMissionData() {
				this.$request.load(dataStatisticsApi.missionData({
					before: () => {
						this.missionLoading = true
					},
					success: (response) => {
						if (!response.data.result)
							throw new Error()
						this.missionData = response.data.result
					},
					complete: () => {
						this.missionLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.area-block-title {
		font-size: $--font-size-medium;
	}

	.data-reload-time {
		margin-left: 20px;
		margin-right: 10px;
		font-size: $--font-size-extra-small;
		color: $--color-text-secondary;
	}

	.tendency-chart {

		.chart-content {
			width: 100%;
			height: 300px;
			border: $--border-base;
			border-color: $--border-color-lighter;
			border-radius: $--border-radius-base;
		}

		.search-date {
			width: 90px;
		}

		.search-condition {
			width: 140px;
			margin-left: 10px;
		}
	}

	#tendencyChart {
		width: 99%;
		height: 100%;
	}

	.data-panel {
		display: flex;
		width: 100%;
	}

	.data-panel-left {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.data-panel-right {
		flex: 1;
		margin-left: 40px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.data-panel-area {
		flex: 1;
		border: $--border-base;
		border-color: $--border-color-lighter;
		border-radius: $--border-radius-base;
		display: flex;
		flex-direction: column;
		padding: 30px 40px;

		.table{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}
		
		.row {
			flex: 1;
			margin-bottom: 25px;

			&:last-child {
				margin-bottom: 0px;
			}
		}

		.data-item {
			.title {
				color: $--color-text-secondary;
				font-size: $--font-size-base;
			}

			.value {
				font-size: $--font-size-large;
				margin-top: 10px;
				font-weight: $font-weight-large;
			}
		}
	}

	.fast-operate {
		padding: 5px 0px;
	}

	.fast-operate-item {
		margin-right: 45px;
		display: inline-block;
		padding: 16px 30px;
		margin-bottom: 8px;
		cursor: pointer;
		border-radius: $--border-radius-base;

		&:hover {
			background-color: $--background-color-base;
		}

		.center,
		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.label {
			margin-top: 10px;
			font-size: $--font-size-base;
		}

		.icon {
			color: $--color-white;
			border-radius: $--border-radius-base;
			width: 40px;
			height: 40px;

			i {
				font-size: 26px;
			}

			&.blue {
				background-color: $--color-primary;
			}

			&.green {
				background-color: $--color-success;
			}

			&.red {
				background-color: $--color-danger;
			}

			&.orange {
				background-color: $--color-warning;
			}
		}

	}
</style>
