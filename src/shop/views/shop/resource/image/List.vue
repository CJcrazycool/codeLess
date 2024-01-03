<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="image"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-side">
				<treeView ref="tree" :load-request="resourceCategoryApi.treeList()" title="素材分类" :highlight-current="true" :current-node-key="''"
				node-key="id" :default-node="[{id:'',label:'全部文件'}]" @current-change="queryCategory" :remote-data.sync="categoryData" default-expand-all>
				</treeView>
			</div>
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" :show-select-result="true"
					:load-request="resourceApi.pageList()" :select-rows.sync="selectRows">
					<template slot="search">
						<el-form-item label="图片名称">
							<el-input v-model="searchForm.imgName" placeholder="请填写图片名称"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="uploadVisible=true">上传图片</el-button>
						<el-popover width="200" placement="bottom-start" trigger="click" class="span_btn" @show="batchMoveForm.classifyId=null"
							v-model="batchMoveVisible">
							<el-button slot="reference" :disabled="selectRows.length<=0" size="small">批量移动</el-button>
							<el-form v-model="batchMoveForm" size="small">
								<el-form-item>
									<el-cascader class="fill-width"  v-model="batchMoveForm.classifyId" :clearable="true" placeholder="请选择素材分类"
									    :options="categoryData"
									    :props="{ checkStrictly: true ,value:'id',emitPath:false}"
									    clearable></el-cascader>
								</el-form-item>
								<el-button class="fill-width"
									size="small" type="primary" @click="batchMove">保存</el-button>
							</el-form>
						</el-popover>
						<el-popconfirm class="span_btn" title="确认删除？" @confirm="batchDel" placement="bottom-start">
							<el-button slot="reference" :disabled="selectRows.length<=0" size="small">批量删除</el-button>
						</el-popconfirm>
					</template>
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="图片" min-width="600">
						<template slot-scope="scope">
							<thumbInfo :image-url="scope.row.imgUrl" :preview="true">
								<template slot="title">
									{{scope.row.imgName}}
								</template>
								<template slot="desc">
									<div>{{getImageResourceUrl(scope.row.imgUrl)}}<copyText :text="getImageResourceUrl(scope.row.imgUrl)" class="span_left" size="small"></copyText></div>
								</template>
							</thumbInfo>
						</template>
					</el-table-column>
					<el-table-column label="文件大小" prop="imgSize" min-width="200">
						<template slot-scope="scope">
							{{$formatter.getFileSizeToKB(scope.row.imgSize)}}
						</template>
					</el-table-column>
					<el-table-column label="素材分类" prop="classifyName" min-width="200"></el-table-column>
					<el-table-column label="上传时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column width="130" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="上传图片" :visible.sync="uploadVisible" width="870px"
		 @open="uploadAlive=true" @closed="uploadAlive=false">
			 <uploadImageForm v-if="uploadAlive" class="dialog-form"
				@save="uploadSuccess" @cancel="uploadVisible=false"></uploadImageForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑图片" :visible.sync="editVisible" width="680px"
		@open="editAlive=true" @closed="editAlive=false">
			<editForm v-if="editAlive" ref="editForm" :id="currRow?currRow.id:null" @save="editSuccess" @cancel="editVisible=false"></editForm>
		</el-dialog>
	</div>
</template>

<script>
	import resourceApi from '@shop/api/resource'
	import resourceCategoryApi from '@shop/api/resourceCategory'
	import uploadImageForm from '@public/components/UploadImageForm'
	import editForm from './Edit'
	import {getImageResourceUrl} from '@public/js/util'
	import tabHeader from '../Tab'

	export default {
		components:{
			uploadImageForm,
			editForm,
			tabHeader
		},
		data() {
			return {
				resourceApi,
				resourceCategoryApi,
				tab: 'image',
				categoryData:[],
				searchForm: {
					imgName: '',
					classifyId: null
				},
				selectRows: [],
				batchMoveVisible:false,
				batchMoveForm:{
					classifyId:null
				},
				uploadVisible:false,
				uploadAlive:false,
				editVisible:false,
				editAlive:false,
				currRow:null
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			getImageResourceUrl,
			queryCategory(data){
				this.searchForm.classifyId = data.id==""?null:data.id
				this.$refs.table.search()
			},
			uploadSuccess() {
				this.uploadVisible = false
				this.$refs.table.reloadData()
			},
			editSuccess() {
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			edit(row){
				this.editVisible = true
				this.currRow = row
			},
			del(row) {
				this.$request.submit(resourceApi.delete({
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
			batchDel() {
				this.$request.submit(resourceApi.batchDelete({
					data:this.selectRows.map((item)=>{
							return item['id']
					}),
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '删除成功'
					}
				}))
			},
			batchMove(){
				this.batchMoveVisible=false
				var data = this.selectRows.map((item)=>{
					return {
						classifyId:this.batchMoveForm.classifyId,
						id:item['id']
					}
				}) 
				this.$request.submit(resourceApi.batchMove({
					data,
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '移动成功'
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>