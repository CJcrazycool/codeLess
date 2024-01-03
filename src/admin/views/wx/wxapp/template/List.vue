<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="template"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="wxappTplApi.pageList()">
					<template slot="search">
						<el-form-item label="关键词">
							<el-input v-model="searchForm.keyword" placeholder="请填写关键词"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" :loading='updateLoading' @click="update">更新模板库</el-button>
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
					<el-table-column label="模版ID" min-width="200" prop="templateId"></el-table-column>
					<el-table-column label="小程序名称" min-width="200" prop="appletName"></el-table-column>
					<el-table-column label="小程序APPID" min-width="200" prop="appId"></el-table-column>
					<el-table-column label="版本号" min-width="200" prop="appletVersion"></el-table-column>
					<el-table-column label="默认标准模版" min-width="200" prop="validTime" >
						<template slot-scope="scope">
							<el-switch @change="e=>setDefault(e,scope.row)" v-model="scope.row.isDefault"></el-switch>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip label="上传者" min-width="200" prop="developer"></el-table-column>
					<el-table-column show-overflow-tooltip label="创建时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column width="100" align="center">
						<template slot-scope="scope">
							<el-popconfirm @confirm="del(scope.row.templateId)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button :loading="deleteLoading" slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import wxappTplApi from '@admin/api/wxappTpl'
	import tabHeader from './Tab'

	export default {
		components: {
			tabHeader
		},
		data() {
			return {
				wxappTplApi,
				selectRows: [],
				searchForm:{
					keyword:''
				},
				currRow:null,
				updateLoading:false,
				deleteLoading:false
			}
		},
		computed: {
		},
		created() {},
		methods: {
			update(){
				this.$request.submit(wxappTplApi.update({
					before:()=>{
						this.updateLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '已更新模版库'
					},
					complete:()=>{
						this.updateLoading = false
					}
				}))
			},
			del(id) {
				this.$request.submit(wxappTplApi.delete({
					params: {
						templateId:id
					},
					before:()=>{
						this.deleteLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '删除成功'
					},
					complete:()=>{
						this.deleteLoading = false
					}
				}))
			},
			setDefault(e,row){
				this.$request.submit(wxappTplApi.setDefault({
					params: {
						id:row.id
					},
					success: (response) => {
						if(response.data.success)
							this.$refs.table.reloadData()
					},
					successText:()=>{
						return '设置成功'
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
