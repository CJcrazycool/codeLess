<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-class-name="expand-row-light" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="wxappDraftApi.pageList()">
					<template slot="operate">
						<span class="tip">本月剩余可用审核数：3次</span>
					</template>
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryShopOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryTemplateOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="审核状态">
							<dictSelect dict-key="after_sale_state" v-model="searchForm.afterSaleState" placeholder="请选择审核状态" :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="提交时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="row-expand-content">
								<el-descriptions class="table-row-desc" title="模版信息">
									<el-descriptions-item label="小程序APPID">wxa7a14e00e24149d0</el-descriptions-item>
									<el-descriptions-item label="模版ID">3081</el-descriptions-item>
									<el-descriptions-item label="模版名称">盛世康养智慧平台</el-descriptions-item>
									<el-descriptions-item label="模版版本号">20231122.1154</el-descriptions-item> 
									<el-descriptions-item label="版本描述">众邦养老小程序：优化生命体征 Glod 在 2023年11月23日上午10点51分 提交上传</el-descriptions-item>
								</el-descriptions>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商户编码" min-width="200" prop="code">
						<template slot-scope="scope">
							000010
						</template>
					</el-table-column>
					<el-table-column label="商户名称" min-width="200" prop="code">
						<template slot-scope="scope">
							中濠集团
						</template>
					</el-table-column>
					<el-table-column label="小程序名称" min-width="200" prop="code">
						<template slot-scope="scope">
							中濠小程序
						</template>
					</el-table-column>
					<el-table-column label="审核状态" min-width="200" prop="code">
						<template slot-scope="scope">
							未审核
						</template>
					</el-table-column>
					<el-table-column label="发布状态" min-width="200" prop="name">
						<template slot-scope="scope">
							未发布
						</template>
					</el-table-column>
					<el-table-column label="提交时间" min-width="200" prop="state">
						<template slot-scope="scope">
							2023-11-23 14:32:30
						</template>
					</el-table-column>
					<el-table-column label="发布时间" min-width="200" prop="validTime" >
						<template slot-scope="scope">
							
						</template>
					</el-table-column>
					<el-table-column width="140" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="mini">刷新状态</el-button>
							<el-button size="mini" type="text" @click="detail(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="记录详情" :visible.sync="detailVisible" size="700px" @open="detailAlive=true" @closed="detailAlive=false">
			<detailForm :id="currRow.orderSn" v-if="detailAlive" @cancel="detailVisible=false"></detailForm>
		</el-drawer>
	</div>
</template>

<script>
	import wxappDraftApi from '@admin/api/wxappDraft'
	import detailForm from './Detail'

	export default {
		components: {
			detailForm
		},
		data() {
			return {
				value:true,
				wxappDraftApi,
				selectRows: [],
				queryShopOptions:[
					{
						name:'code',
						label:'商户编码'
					},
					{
						name:'shopName',
						label:'商户名称'
					}
				],
				queryTemplateOptions:[
					{
						name:'tplId',
						label:'模版ID'
					},
					{
						name:'tplName',
						label:'模版名称'
					},
					{
						name:'tplVersion',
						label:'模版版本号'
					}
				],
				searchForm:{
					startDate:null,
					endDate:null
				},
				currRow:null,
				detailVisible:false,
				detailAlive:false
			}
		},
		computed: {
		},
		created() {},
		methods: {
			detail(row) {
				this.detailVisible = true
				this.currRow = row
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
