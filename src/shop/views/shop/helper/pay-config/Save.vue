<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row>
					<el-form-item label="支付通道" prop="payType">
						<el-radio-group :disabled="id?true:false" v-model="form.payType" size="small">
							<el-radio v-for="item in $dataDict.options('3rd_pay_channel')" :key="item.value"
								:label="item.value" border>{{item.label}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="商户号" prop="mchId">
							<el-input v-model="form.mchId" placeholder="请填写商户号">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="APPID" prop="appId">
							<el-input v-model="form.appId" placeholder="请填写APPID">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="支付类型" prop="channelType">
						<dictSelect :disabled="id?true:false" class="fill-width" dict-key="channel_type" v-model="form.channelType" placeholder="请选择支付类型"
							:clearable="true"></dictSelect>
					</el-form-item>
				</el-row>
				<template v-if="form.payType=='WX_PAY'">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="证书序列号" prop="mchSerialNo">
								<el-input v-model="form.mchSerialNo" placeholder="请填写证书序列号">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="APIv3密钥" prop="apiV3Key">
								<el-input v-model="form.apiV3Key" placeholder="请填写APIv3密钥">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-form-item label="证书文件（apiclient_key.pem）" prop="cert">
							<uploadFile accept=".pem" :multiple="false" :loading.sync="uploadLoading" ref="certUpload" v-model="form.cert"></uploadFile>
						</el-form-item>
					</el-row>
				</template>
				<template v-if="form.payType=='LCSW_PAY'">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="扫呗终端号" prop="terminalId">
								<el-input v-model="form.terminalId" placeholder="请填写扫呗终端号">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="扫呗令牌" prop="accessToken">
								<el-input v-model="form.accessToken" placeholder="请填写扫呗令牌">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</template>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="通道状态">
							<el-switch v-model="form.isValid"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label="通道说明">
							<el-input type="textarea" v-model="form.remark" placeholder="请填写通道说明">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<!-- <div class="form-area-title">应用规则</div>
			<div class="form-area">
				<div>
					<el-table style="margin-bottom: 20px;" :data="appModuleData" size="mini">
						<el-table-column prop="module" label="应用模块">
						</el-table-column>
						<el-table-column prop="branch" label="应用分店">
						</el-table-column>
						<el-table-column width="100" prop="address" align="right">
							<el-button size="small" type="text">删除</el-button>
						</el-table-column>
					</el-table>
					<el-button size="small" @click="addRuleVisible=true">+ 添加规则</el-button>
				</div>
			</div> -->
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading || uploadLoading" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
		<el-dialog :append-to-body="true" title="添加规则" :visible.sync="addRuleVisible" width="500px" @closed="">
			<el-form class="dialog-form" @submit.native.prevent ref="form" v-model="ruleForm" size="small">
				<div class="form-body">
					<div class="form-area">
						<el-row>
							<el-form-item label="应用模块">
								<dictSelect ref="refSelectVal" class="fill-width" dict-key="pay_module" v-model="ruleForm.module" placeholder="请选择应用模块">
									<el-option label="所有模块" :value="''"></el-option>
								</dictSelect>
							</el-form-item>
						</el-row>
						<el-row>
							<el-form-item label="应用分店">
								<el-select class="fill-width" v-model="ruleForm.branch">
									<el-option label="所有分店" :value="''"></el-option>
								</el-select>
							</el-form-item>
						</el-row>
					</div>
				</div>
				<div class="form-footer">
					<el-button native-type="submit" size="small" type="primary" @click="addRule">添加</el-button>
					<el-button size="small" @click="addRuleVisible=false">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</el-form>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import payChannelApi from '@shop/api/payChannel'

	export default {
		props: {
			id: {}
		},
		components: {},
		data() {
			return {
				loading: 2,
				uploadLoading:false,
				saveLoading: false,
				form: {
					payType: 'WX_PAY',
					mchId:'',
					appId:'',
					channelType:null,
					isValid:true,
					remark:'',
					cert:'',
					mchSerialNo:'',
					apiV3Key:'',
					terminalId:'',
					accessToken:''
				},
				rules: {
					'payType': [{
						required: true,
						message: '请选择支付通道'
					}],
					'mchId': [{
						required: true,
						message: '请填写商户号'
					}],
					'appId': [{
						required: true,
						message: '请填写APPID'
					}],
					'cert': [{
						required: true,
						message: '请上传证书文件'
					}],
					'mchSerialNo': [{
						required: true,
						message: '请填写证书序列号'
					}],
					'apiV3Key': [{
						required: true,
						message: '请填写APIv3密钥'
					}],
					'channelType': [{
						required: true,
						message: '请选择支付方式'
					}],
					'terminalId': [{
						required: true,
						message: '请选择扫呗终端号'
					}],
					'accessToken': [{
						required: true,
						message: '请选择扫呗令牌'
					}]
				},
				appModuleData:[
					{
						module:'客房预订',
						branch:'宝安分店'
					},
					{
						module:'会员充值',
						branch:'罗湖分店'
					}
				],
				addRuleVisible:false,
				ruleForm:{
					module:'',
					branch:''
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			if (this.id)
				this.load(this.id)
		},
		methods: {
			load(id) {
				this.$request.load(payChannelApi.queryById({
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
			async save() {
				if(this.$refs.certUpload){
					await this.$refs.certUpload.submit()
				}
				var vaild = validateForm(this.$refs.form, true)
				if (!vaild) {
					this.$message.error({
						message: '请完善通道信息'
					})
					return
				}
				const api = !this.id ? payChannelApi.add : payChannelApi.edit
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('save')
					},
					successText: () => {
						return '保存成功'
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			},
			addRule(){
				this.appModuleData.push({
					module:{label:ruleForm.module,value:ruleForm.module},
					branch:{label:ruleForm.branch,value:ruleForm.branch}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
