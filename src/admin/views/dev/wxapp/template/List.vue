<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="template"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-class-name="expand-row-light" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="wxappDraftApi.pageList()">
					<template slot="search">
						<el-form-item label="关键词">
							<el-input v-model="searchForm.keyword" placeholder="请填写关键词"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">更新模板库</el-button>
					</template>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="row-expand-content">
								<el-descriptions class="table-row-desc" title="模版说明">
									<el-descriptions-item label="版本描述">众邦养老小程序：优化生命体征 Glod 在 2023年11月23日上午10点51分 提交上传</el-descriptions-item>
								</el-descriptions>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="模版ID" min-width="200" prop="code">
						<template slot-scope="scope">
							3081
						</template>
					</el-table-column>
					<el-table-column label="模版名称" min-width="200" prop="name">
						<template slot-scope="scope">
							盛世康养智慧平台
						</template>
					</el-table-column>
					<el-table-column label="来自APPID" min-width="200" prop="state">
						<template slot-scope="scope">
							wxa7a14e00e24149d0
						</template>
					</el-table-column>
					<el-table-column label="版本号" min-width="200" prop="validTime" >
						<template slot-scope="scope">
							20231122.1154
						</template>
					</el-table-column>
					<el-table-column label="默认模版" min-width="200" prop="validTime" >
						<template slot-scope="scope">
							<el-switch v-model="value">
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip label="上传者" min-width="200" prop="createTime">
						<template slot-scope="scope">
							yezs
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip label="上传时间" min-width="200" prop="createTime">
						<template slot-scope="scope">
							2023-11-23 14:32:30
						</template>
					</el-table-column>
					<el-table-column width="100" align="center">
						<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？"
							placement="bottom-end">
							<el-button slot="reference" type="text" size="small">删除</el-button>
						</el-popconfirm>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import wxappDraftApi from '@admin/api/wxappDraft'
	import tabHeader from './Tab'

	export default {
		components: {
			tabHeader
		},
		data() {
			return {
				value:true,
				wxappDraftApi,
				selectRows: [],
				searchForm:{
					keyword:''
				},
				currRow:null
			}
		},
		computed: {
		},
		created() {},
		methods: {
			del(id){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
