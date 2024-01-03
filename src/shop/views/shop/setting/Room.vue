<template>
	<div class="page-panel">
		<el-form hide-required-asterisk class="page-panel-form" @submit.native.prevent :rules="rules" :model="form" ref="form" size="small" label-position="left"
			label-width="200px">
			<div class="form-body setting-form-body">
				<tabHeader class="inner-page-tab" value="order"></tabHeader>
				<div v-loading="loading == 1">
					<div class="form-area-title top">客房预订</div>
					<div class="form-area">
						<el-form-item label="提前预订" prop="leadTime">
							<el-checkbox v-model="form.leadEnable">客房预订需提前</el-checkbox>
							<el-input-number :disabled="!form.leadEnable" class="span_h"
								v-model="form.leadTime" :min="1" :precision="0"></el-input-number>
							小时
						</el-form-item>
						<el-form-item prop="arriveTime">
							<div slot="label">
								默认可选抵店时段
							</div>
							<el-time-select align="center" @change="changeRoomOrderDayCheckInBeginTime" placeholder="开始时间" v-model="form.arriveStart" :picker-options="{
								  start: '09:00',
								  step: '1:00',
								  end: '23:00'
								}">
							</el-time-select>
							<span class="span_h">-</span>
							<el-checkbox @change="changeRoomOrderDayCheckInNextDay" class="span_right" v-model="form.arriveNextDay">次日</el-checkbox>
							<el-time-select align="center" placeholder="结束时间" v-model="form.arriveEnd"
								:picker-options="{
									start: '00:00',
									step: '1:00',
									end: '23:00',
									minTime:!form.arriveNextDay?form.arriveStart:null,
									//maxTime:form.roomOrderDayCheckInNextDay?form.arriveStart:null
									maxTime:form.arriveNextDay?'08:00':null
								  }">
							</el-time-select>
							<div class="form-item-tip">预订全日房可选抵店时段范围</div>
						</el-form-item>
						<el-form-item prop="hoursTime">
							<el-time-select align="center" @change="changeRoomOrderHoursCheckInBeginTime" placeholder="开始时间" v-model="form.hourStart"
								:picker-options="{
								  start: '00:00',
								  step: '1:00',
								  end: '23:00'
								}">
							</el-time-select>
							<span class="span_h">-</span>
							<el-time-select align="center" placeholder="结束时间" v-model="form.hourEnd" :picker-options="{
									format:'次日 HH:mm:ss',
									start: '00:00',
									step: '1:00',
									end: '23:00',
									minTime:form.hourStart
								  }">
							</el-time-select>
							<div class="form-item-tip">预订钟点房可选抵店时段范围</div>
						</el-form-item>
						<el-form-item label="默认离店时间" prop="leaveTime">
							<el-time-select align="center" v-model="form.leaveTime" :picker-options="{
									start: '10:00',
									step: '00:30',
									end: '15:00'
								  }" placeholder="请选择时间点">
							</el-time-select>
							<div class="form-item-tip">客房预订会将离店时间传入预订系统中作为默认值</div>
						</el-form-item>
					</div>
					<div class="form-area-title">退款政策</div>
					<div class="form-area">
						<el-form-item label="开启极速退款">
							<el-switch v-model="form.quickRefund"></el-switch>
							<div class="form-item-tip">开启极速退款后，未入住的订单申请退款时无需审核自动退款</div>
						</el-form-item>
						<template v-if="form.quickRefund">
							<el-form-item label="退款审核开启条件" prop="refundAuditTime">
								<el-checkbox v-model="form.refundAudit">距离入住时间不足</el-checkbox>
								<el-input-number :disabled="!form.refundAudit" class="span_h"
									v-model="form.refundAuditTime" :min="1" label="描述文字"
									:precision="0"></el-input-number>小时
								<div class="form-item-tip">
									开启后未入住订单距离入住时间不足{{form.refundAuditTime}}小时申请退款则需要审核</div>
							</el-form-item>
							<el-form-item prop="afterTime">
								<el-checkbox v-model="form.afterEnable">超过入住当天</el-checkbox>
								<el-time-select align="center" :disabled="!form.afterEnable" class="span_h"
									v-model="form.afterTime" :picker-options="{
										start: '16:00',
										step: '00:30',
										end: '23:30'
									  }" placeholder="请选择时间点">
								</el-time-select>之后
								<div class="form-item-tip">开启后未入住订单超过入住当天16:00之后申请退款需要审核</div>
							</el-form-item>
						</template>
						<el-form-item label="预订失败自动退款">
							<el-switch v-model="form.reserveFailRfund"></el-switch>
							<div class="form-item-tip">开启自动退款后，预订失败的订单如多次重试失败将自动退款</div>
						</el-form-item>
					</div>
				</div>
			</div>
			<div class="form-footer">
				<el-button type="primary" :disabled="loading!=2" :loading="saveLoading" native-type="submit" size="small" @click="save">保存
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import shopConfigApi from '@shop/api/shopConfig'
	import {dateHelper} from '@public/js/util'
	import tabHeader from './Tab'

	export default {
		components: {
			tabHeader
		},
		data() {
			return {
				form: {
					//提前预订
					leadEnable: false,
					leadTime: 1,
					//全日房默认抵店时段
					arriveStart: null,
					arriveNextDay: false,
					arriveEnd: null,
					//钟点房默认抵店时段
					hourStart:null,
					hourEnd:null,
					//极速退款
					quickRefund: false,
					//距离入住时间不到X小时开启审核
					refundAudit:false,
					refundAuditTime:1,
					//超过入住当天X时间点之后开启审核
					afterEnable:false,
					afterTime:null,
					//默认离店时间
					leaveTime: null,
					//预订失败，自动退款
					reserveFailRfund: false
				},
				loading: 2,
				saveLoading: false
			}
		},
		computed: {
			rules(){
				var rules = {
					'arriveTime':[
						{
							validator: (rule, value, callback) => {
								!this.form.arriveStart || !this.form.arriveEnd ? callback(new Error()) : callback();
							},
							message: '请选择抵店时段范围'
						}
					],
					'hoursTime':[
						{
							validator: (rule, value, callback) => {
								!this.form.hourStart || !this.form.hourEnd ? callback(new Error()) : callback();
							},
							message: '请选择抵店时段范围'
						}
					],
					'leaveTime':[
						{
							required: true,
							message: '请选择离店时间'
						}
					]
				}
				if(this.form.leadEnable)
					rules['leadTime'] = [{
						required: true,
						message: '请填写小时'
					}]
				if(this.form.refundAudit)
					rules['refundAuditTime'] = [{
						required: true,
						message: '请填写小时'
					}]
				if(this.form.afterTime)
					rules['afterTime'] = [{
						required: true,
						message: '请选择时间点'
					}]
				return rules
			}
		},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(shopConfigApi.queryRoomConfig({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result;
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			//检查全日房预订默认可选抵店时段，当结束时间小于开始时间，则清空结束时间
			changeRoomOrderDayCheckInBeginTime(value){
				if(!value){
					return
				}
				if(this.form.arriveEnd && !this.form.arriveNextDay){
					if(dateHelper.getDateByTime(this.form.arriveEnd) <=dateHelper.getDateByTime(value) ){
						this.form.arriveEnd = null
					}
				}
			},
			//检查全日房抵店时段，如果结束时间打开次日，则清空结束时间
			changeRoomOrderDayCheckInNextDay(value){
				this.form.arriveEnd = null
			},
			//检查钟点房预订默认可选抵店时段，当结束时间小于开始时间，则清空结束时间
			changeRoomOrderHoursCheckInBeginTime(value){
				if(!value){
					return
				}
				if(this.form.hourEnd){
					if(dateHelper.getDateByTime(this.form.hourEnd) <=dateHelper.getDateByTime(value)){
						this.form.hourEnd = null
					}
				}
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善配置信息'
					})
					return
				}
				this.$request.submit(shopConfigApi.saveRoomConfig({
					data:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage: 'alert',
					success: (response) => {

					},
					successText: (response) => {
						return '保存成功'
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
