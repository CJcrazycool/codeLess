<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="page"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-side">
				<treeView ref="tree" :load-request="microPageTypeApi.treeList()" title="页面分类" :highlight-current="true" :current-node-key="''"
				node-key="id" :default-node="[{id:'',label:'全部页面'}]" @current-change="queryCategory" default-expand-all>
				</treeView>
			</div>
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" :show-select-result="true"
					:load-request="microPageApi.pageList()" :select-rows.sync="selectRows">
					<template slot="search">
						<el-form-item label="页面名称">
							<el-input v-model="searchForm.keyword" placeholder="请填写页面名称"></el-input>
						</el-form-item>
						<el-form-item label="页面状态">
							<dictSelect dict-key="state" v-model="searchForm.status" placeholder="请选择页面状态" :clearable="true"></dictSelect>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="add">添加页面</el-button>
						<el-popconfirm @confirm="batchSetStatus(true)" class="span_btn" title="确认启用？"
							placement="bottom-start">
							<el-button slot="reference" :disabled="selectRows.length<=0 || !checkBatchSetStatus" size="small">批量启用</el-button>
						</el-popconfirm>
					</template>
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="页面名称" prop="name" min-width="200">
						<template slot-scope="scope">
							{{scope.row.name}}<el-tag class="span_left" effect="plain" v-if="scope.row.isIndex=='1'"
								size="small">首页</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="页面分类" prop="typeName" min-width="200"></el-table-column>
					<el-table-column label="页面状态" min-width="200">
						<template slot-scope="scope">
							<el-tag size="small" :type="$dataDict.value('state_color',scope.row.status)" effect="plain">{{scope.row.status_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column label="备注" prop="remark" min-width="200" show-overflow-tooltip></el-table-column>
					<el-table-column width="140" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除
								</el-button>
							</el-popconfirm>
							<el-dropdown size="small" placement="bottom" trigger="click"
								@command="(command)=>{actionCommand(command,scope.row)}">
								<el-button type="text" icon="el-icon-arrow-down" size="small"></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-if="!scope.row.status" command="onlice">提交发布</el-dropdown-item>
									<el-dropdown-item v-if="scope.row.status" command="index">设为首页</el-dropdown-item>
									<el-dropdown-item command="copy" divided>复制</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import microPageApi from '@shop/api/microPage'
	import microPageTypeApi from '@shop/api/microPageType'
	import tabHeader from './Tab'

	export default {
		components:{
			tabHeader
		},
		data() {
			return {
				microPageApi,
				microPageTypeApi,
				tab: 'page',
				searchForm: {
					keyword: '',
					typeId: null,
					status: null
				},
				category: [],
				selectRows: []
			}
		},
		computed: {
			checkBatchSetStatus(){
				var valid = true
				for(var i in this.selectRows){
					if(this.selectRows[i].status){
						valid = false
						break
					}
				}
				return valid
			}
		},
		watch: {
		},
		created() {
		},
		methods: {
			queryCategory(data){
				this.searchForm.typeId = data.id==""?null:data.id
				this.$refs.table.search()
			},
			add() {
				this.$router.openWindow('save')
			},
			edit(row) {
				this.$router.openWindow({
					path: 'save',
					query: {
						id: row.id
					}
				})
			},
			copy(row) {
				this.$router.openWindow({
					path: 'save',
					query: {
						copy_id: row.id
					}
				})
			},
			del(row) {
				this.$request.submit(microPageApi.delete({
					params:{
						id:row.id
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
			setIndex(row) {
				this.$request.submit(microPageApi.setIndex({
					params:{
						id:row.id
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '已设为首页'
					}
				}))
			},
			setStatus(ids, status) {
				var api = status?microPageApi.batchRelease:microPageApi.batchDraftTransfer
				this.$request.submit(api({
					data:ids,
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return status ? '已提交发布' : '已移至草稿箱'
					}
				}))
			},
			batchSetStatus(status) {
				var ids = []
				for (var i in this.selectRows) {
					ids.push(this.selectRows[i].id)
				}
				this.setStatus(ids, status)
			},
			actionCommand(command, row) {
				if (command == 'index') {
					this.setIndex(row)
				} else if (command == 'copy') {
					this.copy(row)
				} else if (command == 'draft') {
					this.setStatus([row.id], false)
				} else if (command == 'onlice') {
					this.setStatus([row.id], true)
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
</style>