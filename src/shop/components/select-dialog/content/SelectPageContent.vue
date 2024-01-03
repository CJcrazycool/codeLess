<template>
	<tableView height="400" ref="table" row-key="id" size="small" :search-form="searchForm" class="simple-table-view" :request-params="{status:true}"
		:load-request="microPageApi.pageList()" 
		:click-row-select="true"
		@row-dblclick="(row)=>$emit('dbclick',row)"
		:select-rows.sync="selectRows"
		v-bind="$attrs" v-on="$listeners"
		:single-select="!multiple"
		:show-select-result="true"
		:pagination-loader-attrs="{'pager-style':'small'}"
		>
		<template slot="side">
			<treeView ref="tree" :header="false" :load-request="microPageTypeApi.treeList()" title="页面分类" :highlight-current="true" :current-node-key="''"
			node-key="id" :default-node="[{id:'',label:'全部页面'}]" @current-change="queryCategory" default-expand-all>
			</treeView>
		</template>
		<template slot="search">
			<el-form-item label="页面名称">
				<el-input v-model="searchForm.keyword" placeholder="请填写页面名称"></el-input>
			</el-form-item>
			<el-form-item label="页面状态">
				<dictSelect dict-key="state" v-model="searchForm.status" placeholder="请选择页面状态" :clearable="true"></dictSelect>
			</el-form-item>
		</template>
		<el-table-column type="selection" align="center" :reserve-selection="true"></el-table-column>
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
	</tableView>
</template>

<script>
	import microPageApi from '@shop/api/microPage'
	import microPageTypeApi from '@shop/api/microPageType'
	
	export default {
		props: {
			multiple:{},
			limit:{}
		},
		watch: {
			selectRows:{
				immediate:true,
				handler(value) {
					this.$emit('update:select-rows', value)
				}
			}
		},
		computed: {
		},
		data() {
			return {
				microPageApi,
				microPageTypeApi,
				searchForm: {
					keyword: '',
					typeId: null
				},
				selectRows:[]
			};
		},
		mounted() {
		},
		methods: {
			queryCategory(data){
				this.searchForm.typeId = data.id==""?null:data.id
				this.$refs.table.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>