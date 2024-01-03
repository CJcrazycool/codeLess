<template>
	<div class="drawer-content">
		<div class="drawer-body">
			<tableView ref="table" row-key="id" size="small" :load-request="systemUserApi.pageList()">
				<el-table-column label="模版ID" min-width="100">
					<template slot-scope="scope">
						3081
					</template>
				</el-table-column>
				<el-table-column label="模版名称" min-width="150">
					<template slot-scope="scope">
						捷客达标准模版
					</template>
				</el-table-column>
				<el-table-column label="模版版本号" min-width="120">
					<template slot-scope="scope">
						20231122.1154
					</template>
				</el-table-column>
				<el-table-column label="审核状态" min-width="100">
					<template slot-scope="scope">
						未审核
					</template>
				</el-table-column>
				<el-table-column label="发布状态" min-width="100">
					<template slot-scope="scope">
						未发布
					</template>
				</el-table-column>
				<el-table-column label="提交时间" prop="createTime" min-width="150"></el-table-column>
			</tableView>
		</div>
	</div>
</template>

<script>
	import systemUserApi from '@shop/api/systemUser'
	
	export default {
		components: {
		},
		data() {
			return {
				systemUserApi
			}
		},
		computed: {},
		created() {},
		methods: {
			submit(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
