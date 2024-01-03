<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<tabHeader value="apiConfig"></tabHeader>
			<div class="dataview-layout">
				<div class="dataview-content">
					<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
						:select-rows.sync="selectRows" :load-request="tenantInterfaceApi.pageList()" :load-request-params="params">
						<template slot="operate">
							<el-button size="small" type="primary" @click="addVisible=true">添加接口</el-button>
						</template>
						<el-table-column label="业务类型" min-width="120" prop="moduleType_EnumText"></el-table-column>
						<el-table-column label="接口来源" min-width="120" prop="interfaceType_EnumText"></el-table-column>
						<el-table-column label="接口代码" min-width="120" prop="pmsCode"></el-table-column>
						<el-table-column label="接口地址" min-width="200" prop="host"></el-table-column>
						<el-table-column width="130" align="center">
							<template slot-scope="scope">
								<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
								<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？" placement="bottom-start">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</tableView>
				</div>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="添加接口" :visible.sync="addVisible" size="640px" @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" :company-id="$route.query.id" @cancel="addVisible=false" @save="saveSuccess"></saveForm>
		</el-drawer>
		<el-drawer :append-to-body="true" title="编辑接口" :visible.sync="editVisible" size="640px" @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess"></saveForm>
		</el-drawer>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@admin/components/InnerPageLayout'
	import tabHeader from '../Tab'
	import tenantInterfaceApi from '@admin/api/tenantInterface'
	import saveForm from './Save'

	export default {
		components: {
			innerPageLayout,
			tabHeader,
			saveForm
		},
		data() {
			return {
				tenantInterfaceApi,
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				searchForm:{
				},
				currRow:null,
				params:{
					companyId:null
				}
			}
		},
		computed: {
		},
		created() {
			this.params.companyId = this.$route.query.id
		},
		methods: {
			edit(row){
				this.currRow = row;
				this.editVisible =true
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			del(id){
				this.$request.submit(tenantInterfaceApi.delete({
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
