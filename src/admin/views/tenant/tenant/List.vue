<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="tenantApi.pageList()">
					<template slot="search">
						<el-form-item label="商户编码">
							<el-input v-model="searchForm.code" placeholder="请填写商户编码"></el-input>
						</el-form-item>
						<el-form-item label="商户名称">
							<el-input v-model="searchForm.keyword" placeholder="请填写商户名称"></el-input>
						</el-form-item>
						<el-form-item label="到期时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>

					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">注册商户</el-button>
					</template>
					<el-table-column label="商户编码" min-width="200" prop="code"></el-table-column>
					<el-table-column label="商户名称" min-width="200" prop="name"></el-table-column>
					<el-table-column label="商户状态" min-width="200" prop="state">
						<template slot-scope="scope">
							<el-tag :type="$dataDict.value('state_color',scope.row.valid)" size="small" effect="plain">
							{{scope.row.valid_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="到期时间" min-width="200" prop="validTime" ></el-table-column>
					<el-table-column label="创建时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column width="250" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-button size="small" type="text" @click="authorization(scope.row)">功能开通</el-button>
							<el-button size="small" type="text" @click="env(scope.row)">环境配置</el-button>
							<el-button size="small" type="text" @click="shopAdmin(scope.row)">进入后台</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="注册商户" :visible.sync="addVisible" width="640px" @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑商户" :visible.sync="editVisible" width="640px" @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-drawer :append-to-body="true" title="功能开通" :visible.sync="authorizationVisible" size="600px"
		 @open="authorizationAlive=true" @closed="authorizationAlive=false">
			<authorization v-if="authorizationAlive" @cancel="authorizationVisible=false" @success="saveSuccess" :id="currRow.id"></authorization>
		</el-drawer>
	</div>
</template>

<script>
	import tenantApi from '@admin/api/tenant'
	import saveForm from './Save'
	import authorization from './Authorization'

	export default {
		components: {
			saveForm,
			authorization
		},
		data() {
			return {
				tenantApi,
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				authorizationVisible:false,
				authorizationAlive:false,
				searchForm:{
					keyword:'',
					code:'',
					startDate:'',
					endDate:''
				},
				currRow:null
			}
		},
		computed: {
		},
		created() {},
		methods: {
			edit(row){
				this.currRow = row;
				this.editVisible =true
			},
			authorization(row){
				this.currRow = row
				this.authorizationVisible =true
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.authorizationVisible = false
				this.$refs.table.reloadData()
			},
			env(row) {
				this.$router.openWindow({
					path:'./api-config',
					query:{
						id:row.id
					}
				})
			},
			shopAdmin(row){
				this.$router.openWindow({
					path:'/login-shop',
					query:{
						code:row.code
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
