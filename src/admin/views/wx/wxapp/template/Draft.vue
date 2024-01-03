<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="draft"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="wxappDraftApi.pageList()">
					<template slot="search">
						<el-form-item label="关键词">
							<el-input v-model="searchForm.keyword" placeholder="请填写关键词"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" :loading='updateLoading' @click="update">更新草稿箱</el-button>
					</template>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="row-expand-content">
								<el-descriptions class="table-row-desc" title="模版说明">
									<el-descriptions-item label="版本描述">{{scope.row.appletDesc}}</el-descriptions-item>
								</el-descriptions>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="草稿ID" min-width="200" prop="draftId"></el-table-column>
					<el-table-column label="小程序名称" min-width="200" prop="appletName"></el-table-column>
					<el-table-column label="小程序APPID" min-width="200" prop="appId"></el-table-column>
					<el-table-column label="版本号" min-width="200" prop="appletVersion"></el-table-column>
					<el-table-column show-overflow-tooltip label="上传者" min-width="200" prop="developer"></el-table-column>
					<el-table-column show-overflow-tooltip label="上传时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column width="140" align="center">
						<template slot-scope="scope">
							<el-button size="small" v-if="!scope.row.isTemplateBase" :loading="addTplLoading" type="text" @click="addTpl(scope.row)">添至模板库</el-button>
							<el-button size="small" v-else :disabled="true" type="text">已添至模板库</el-button>
						</template>
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
				wxappDraftApi,
				selectRows: [],
				searchForm:{
					keyword:''
				},
				currRow:null,
				updateLoading:false,
				addTplLoading:false
			}
		},
		computed: {
		},
		created() {},
		methods: {
			update(){
				this.$request.submit(wxappDraftApi.update({
					before:()=>{
						this.updateLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '已更新草稿箱'
					},
					complete:()=>{
						this.updateLoading = false
					}
				}))
			},
			addTpl(row){
				this.$request.submit(wxappDraftApi.addTpl({
					params: {
						draftId:row.draftId
					},
					before:()=>{
						this.addTplLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '已添至模版库'
					},
					complete:()=>{
						this.addTplLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
