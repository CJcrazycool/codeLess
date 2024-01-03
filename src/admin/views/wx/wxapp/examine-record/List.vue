<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="wxappTplApi.examinePageList()">
					<!-- <template slot="operate">
						<span class="tip">本月剩余可用审核数：3次</span>
					</template> -->
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryShopOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="版本号">
							<el-input v-model="searchForm.version" placeholder="请填写模版版本号"></el-input>
						</el-form-item>
						<el-form-item label="审核状态">
							<dictSelect dict-key="applet_audit_state" v-model="searchForm.auditState" placeholder="请选择审核状态" :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="提交时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="row-expand-content">
								<el-alert v-if="scope.row.auditState =='PENDING' || scope.row.auditState =='DEFERRED'" class="alert" :closable="false" title="审核中" type="warning" show-icon>
									<div>
										版本号：{{scope.row.appletVersion}} 审核中
									</div>
								</el-alert>
								<el-alert v-else-if="scope.row.auditState =='FAILURE'" class="alert" :closable="false" title="审核失败" type="error" show-icon>
									<div>
										版本号：{{scope.row.appletVersion}} 审核失败{{scope.row.reason?'：'+scope.row.reason:''}}
									</div>
								</el-alert>
								<el-alert v-else-if="scope.row.auditState =='SUCCESS'" class="alert" :closable="false" title="审核通过" type="success" show-icon>
									<div>
										版本号：{{scope.row.appletVersion}} 已审核通过
									</div>
								</el-alert>
								<el-alert v-else-if="scope.row.auditState =='PUBLISH'" class="alert" :closable="false" title="发布成功" type="success" show-icon>
									<div>
										<div>版本号：{{scope.row.appletVersion}} 已发布正式版</div>
									</div>
								</el-alert>
								<el-alert v-else-if="scope.row.auditState =='WITHDRAWN'" class="alert" :closable="false" title="撤回审核" type="info" show-icon>
									<div>
										<div>版本号：{{scope.row.appletVersion}} 审核已撤回</div>
									</div>
								</el-alert>
								<el-descriptions class="table-row-desc" title="模版信息" column="2">
									<el-descriptions-item label="商户APPID">{{scope.row.appId}}</el-descriptions-item>
									<el-descriptions-item label="模版版本号">{{scope.row.appletVersion}}</el-descriptions-item> 
									<el-descriptions-item label="版本描述">众邦养老小程序：优化生命体征 Glod 在 2023年11月23日上午10点51分 提交上传</el-descriptions-item>
								</el-descriptions>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商户编码" min-width="200" prop="companyCode"></el-table-column>
					<el-table-column label="商户名称" min-width="200" prop="companyName"></el-table-column>
					<el-table-column label="小程序名称" min-width="200" prop="appletName"></el-table-column>
					<el-table-column label="审核状态" min-width="200" prop="auditState_EnumText"></el-table-column>
					<el-table-column label="提交时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column label="发布时间" min-width="200" prop="releaseTime" ></el-table-column>
					<el-table-column width="140" align="center">
						<template slot-scope="scope">
							<el-button size="small" :disabled="refreshStateLoading" type="text" @click="refreshState(scope.row)">刷新状态</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import wxappTplApi from '@admin/api/wxappTpl'

	export default {
		components: {
		},
		data() {
			return {
				refreshStateLoading:false,
				wxappTplApi,
				selectRows: [],
				queryShopOptions:[
					{
						name:'name',
						label:'商户名称'
					},
					{
						name:'code',
						label:'商户编码'
					}
				],
				searchForm:{
					name:'',
					code:'',
					version:'',
					auditState:'',
					startDate:null,
					endDate:null
				},
				currRow:null
			}
		},
		computed: {
		},
		created() {},
		methods: {
			refreshState(row){
				this.$request.submit(wxappTplApi.refreshExamineState({
					params: {
						auditId:row.auditId
					},
					before:()=>{
						this.refreshStateLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '已刷新状态'
					},
					complete:()=>{
						this.refreshStateLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.alert{
		margin-top: 10px;
		margin-bottom: 30px;
	}
</style>
