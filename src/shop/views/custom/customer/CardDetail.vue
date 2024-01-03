<template>
	<div>
		<tableView :data="memberCards" size="small">
			<el-table-column prop="card" label="会员卡">
				<template slot-scope="scope">
					{{scope.row.mbrCardTypeName}}<el-tag v-if="scope.row.isMainCard" class="span_left" size="small" effect="plain">主卡</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="card" label="会员卡号">
				<template slot-scope="scope">
					{{scope.row.mbrCardNo}}
				</template>
			</el-table-column>
			<el-table-column prop="userId" label="客历号" min-width="150">
				<template slot-scope="scope">{{scope.row.profileId}}<copyText class="span_left" :text="scope.row.profileId"></copyText></template>
			</el-table-column>
		</tableView>
		<div class="dialog-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>

	export default {
		components: {},
		props:{
			memberCards:[],
		},
		data() {
			return {
			}
		},
		watch: {},
		computed: {},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
