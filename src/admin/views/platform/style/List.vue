<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" default-expand-all
					:select-rows.sync="selectRows" :load-request="styleApi.pageList()">
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加主题</el-button>
					</template>
					<el-table-column label="主题名称" min-width="200" prop="colorName"></el-table-column>
					<el-table-column label="主色" min-width="200" prop="colorPrimary">
						<template slot-scope="scope">
							<div class="color" :style="{'background-color':scope.row.colorPrimary}"></div>{{scope.row.colorPrimary}}
						</template>
					</el-table-column>
					<el-table-column label="配色" min-width="200" prop="colorSecondary">
						<template slot-scope="scope">
							<div class="color" :style="{'background-color':scope.row.colorSecondary}"></div>{{scope.row.colorSecondary}}
						</template>
					</el-table-column>
					<el-table-column label="辅助色" min-width="200" prop="colorThrice">
						<template slot-scope="scope">
							<div class="color" :style="{'background-color':scope.row.colorThrice}"></div>{{scope.row.colorThrice}}
						</template>
					</el-table-column>
					<el-table-column label="默认主题" min-width="200" prop="appletName">
						<template slot-scope="scope">
							<el-switch @change="e=>setDefault(e,scope.row)" v-model="scope.row.colorTacitly"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="排序序号" min-width="200" prop="sort" ></el-table-column>
					<el-table-column label="创建时间" min-width="200" prop="createTime" ></el-table-column>
					<el-table-column width="130" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="添加主题" :visible.sync="addVisible" size="640px" @open="addAlive=true"
			@closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @success="saveSuccess"></saveForm>
		</el-drawer>
		<el-drawer :append-to-body="true" title="编辑主题" :visible.sync="editVisible" size="640px" @open="editAlive=true"
			@closed="editAlive=false">
			<saveForm v-if="editAlive" @cancel="editVisible=false" :id="currRow.id" @success="saveSuccess"></saveForm>
		</el-drawer>
	</div>
</template>

<script>
	import styleApi from '@admin/api/style'
	import saveForm from './Save'

	export default {
		components: {
			saveForm
		},
		data() {
			return {
				styleApi,
				addVisible: false,
				addAlive: false,
				editVisible: false,
				editAlive: false,
				selectRows: [],
				searchForm:{},
				currRow:null,
			}
		},
		computed: {
		},
		created() {},
		methods: {
			edit(row) {
				this.editVisible = true
				this.currRow = row
			},
			del(id) {
				this.$request.submit(styleApi.delete({
					params: {
						id
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '删除成功'
					}
				}))
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			setDefault(e,row){
				this.$request.submit(styleApi.setDefault({
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
	.color{
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
		width:18px;
		height:18px;
		background-color: red;
		border-radius: 50%;
	}
</style>
