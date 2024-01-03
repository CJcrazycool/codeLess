<template>
	<tableView height="400" ref="table" row-key="id" size="small" :search-form="searchForm" class="simple-table-view" :request-params="{status:true}"
		:load-request="hotelApi.pageList()" 
		:click-row-select="true"
		@row-dblclick="(row)=>$emit('dbclick',row)"
		:select-rows.sync="selectRows"
		v-bind="$attrs" v-on="$listeners"
		:single-select="!multiple"
		:show-select-result="true"
		:pagination-loader-attrs="{'pager-style':'small'}"
		>
		<template slot="search">
			<el-form-item>
				<dropdownInput :options="queryOptions" :form="searchForm"></dropdownInput>
			</el-form-item>
			<el-form-item label="酒店状态">
				<dictSelect dict-key="state" v-model="searchForm.state" placeholder="请选择酒店状态" :clearable="true"></dictSelect>
			</el-form-item>
		</template>
		<el-table-column type="selection" align="center" :reserve-selection="true"></el-table-column>
		<el-table-column label="酒店" min-width="200">
			<template slot-scope="scope">
				<thumbInfo img-fit="cover" :image-url="$stringHelper.toArrayIndex(scope.row.homePicture)">
					<template slot="title">
						{{scope.row.name}}
					</template>
					<template slot="desc">
						{{scope.row.code}}
					</template>
				</thumbInfo>
			</template>
		</el-table-column>
		<el-table-column label="酒店别名" min-width="200" prop="anotherName"></el-table-column>
		<el-table-column label="酒店状态" min-width="200">
			<template slot-scope="scope">
				<el-tag size="small" :type="$dataDict.value('state_color',scope.row.state)" effect="plain">
					{{scope.row.state_dictText}}
				</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="createTime" label="创建时间" min-width="200"></el-table-column>
	</tableView>
</template>

<script>
	import hotelApi from '@shop/api/hotel'
	
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
				queryOptions:[
					{
						name:'name',
						label:'酒店名称'
					},
					{
						name:'code',
						label:'酒店代码'
					}
				],
				hotelApi,
				searchForm:{
					name:'',
					code:'',
					state:null
				},
				selectRows:[]
			};
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>