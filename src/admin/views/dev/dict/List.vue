<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="dictApi.ditcPageList()">
					<template slot="search">
						<el-form-item label="关键词">
							<el-input v-model="searchForm.keyword" placeholder="请填写字典名称/键名"></el-input>
						</el-form-item>
						<el-form-item label="业务类型">
							<dictSelect dict-key="dict_type" v-model="searchForm.dictType" placeholder="请选择业务类型" :clearable="true"></dictSelect>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加字典</el-button>
					</template>
					<el-table-column label="字典名称" min-width="140" prop="dictName"></el-table-column>
					<el-table-column label="字典键名" min-width="140" prop="dictCode"></el-table-column>
					<el-table-column label="业务类型" min-width="140" prop="dictType_dictText"></el-table-column>
					<el-table-column label="字典明细" min-width="300" prop="dictItem"></el-table-column>
					<el-table-column label="字典描述" min-width="200" prop="description"></el-table-column>
					<el-table-column width="200" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-button size="small" type="text" @click="config(scope.row)">字典配置</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="添加字典" :visible.sync="addVisible" width="640px" @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑字典" :visible.sync="editVisible" width="640px" @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-drawer :append-to-body="true" title="字典配置" :visible.sync="configVisible" size="700px" @open="configAlive=true" @closed="configAlive=false">
			<itemList v-if="configAlive" :id="currRow ? currRow.id:null" :code="currRow ? currRow.dictCode:null" @cancel="configVisible=false"></itemList>
		</el-drawer>
	</div>
</template>

<script>
	import dictApi from '@admin/api/dict'
	import saveForm from './Save'
	import itemList from './ItemList'

	export default {
		components: {
			saveForm,
			itemList
		},
		data() {
			return {
				dictApi,
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				configVisible:false,
				configAlive:false,
				searchForm:{
					keyword:'',
					dictType:null
				},
				currRow:null
			}
		},
		computed: {},
		created() {},
		methods: {
			edit(row){
				this.currRow = row;
				this.editVisible =true
			},
			config(row){
				this.currRow = row;
				this.configVisible =true
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			del(id) {
				this.$request.submit(dictApi.deleteDict({
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
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
