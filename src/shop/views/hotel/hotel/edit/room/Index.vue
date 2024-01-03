<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<tabHeader value="room"></tabHeader>
			<div class="dataview-layout">
				<div class="dataview-content">
					<tableView ref="table" row-key="id" size="small"
					:load-request="roomApi.pageList()" :load-request-params="params">
						<template slot="operate">
							<div class="tip">如需获取最新数据，请前往<el-button type="text" @click="$router.push('/system/data-syn/update')">系统直连</el-button>中进行更新</div>
							<div style="float: right;">
								<el-button type="text" icon="el-icon-s-tools" @click="columnConfigVisible=true">字段配置</el-button>
							</div>
						</template>
						<el-table-column label="房型" min-width="200" prop="account" >
							<template slot-scope="scope">
								<thumbInfo img-fit="cover" :image-url="$stringHelper.toArrayIndex(scope.row.img)">
									<template slot="title">
										{{scope.row.name}}
									</template>
									<template slot="desc">
										{{scope.row.code}}
									</template>
								</thumbInfo>
							</template>
						</el-table-column>
						<el-table-column label="房型别名" prop="anotherName" min-width="200"></el-table-column>
						<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
						<el-table-column width="100" align="center">
							<template slot-scope="scope">
								<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							</template>
						</el-table-column>
					</tableView>
				</div>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="房型字段" :visible.sync="columnConfigVisible" width="660px"
		 @open="columnConfigAlive=true" @closed="columnConfigAlive=false">
			<columnConfigForm v-if="columnConfigAlive" @save="saveColumnConfigSuccess" @cancel="columnConfigVisible=false"></columnConfigForm>
		</el-dialog>
		<el-drawer :append-to-body="true" title="编辑房型" :visible.sync="editVisible" size="700px"
		 @open="editAlive=true" @closed="editAlive=false">
			<editForm :load-id="currRow ? currRow.id:null" v-if="editAlive" @save="saveSuccess" @cancel="editVisible=false"
			@columnConfig="columnConfigVisible=true;$nextTick(()=>{editVisible=false})"></editForm>
		</el-drawer>
	</innerPageLayout>
</template>

<script>	
	import tabHeader from '../Tab'
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import roomApi from '@shop/api/room'
	import columnConfigForm from './column-config/Index'
	import editForm from './Edit'
	

	export default {
		components: {
			innerPageLayout,
			tabHeader,
			columnConfigForm,
			editForm
		},
		data() {
			return {
				roomApi,
				columnConfigVisible:false,
				columnConfigAlive:false,
				editVisible:false,
				editAlive:false,
				currRow:null,
				params:{
					hotelCode:null
				}
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			this.params.hotelCode = this.$route.query.code
		},
		methods: {
			saveColumnConfigSuccess(){
				this.columnConfigVisible = false
			},
			saveSuccess(){
				this.editVisible=false;
				this.$refs['table'].reloadData()
			},
			edit(row){
				this.currRow = row
				this.editVisible = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
