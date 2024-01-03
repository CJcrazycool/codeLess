<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<tabHeader value="system"></tabHeader>
			<div v-if="loading == 1" class="loading" v-loading="true"></div>
			<div v-else>
				<el-descriptions title="系统信息" class="desc-view card" :colon="false" :column="3">
					<el-descriptions-item label="商户编码">{{data.company.code}}</el-descriptions-item>
					<el-descriptions-item label="商户名称">{{data.company.name}}</el-descriptions-item>
					<el-descriptions-item label="系统到期时间">{{data.company.validTime}}</el-descriptions-item>
				</el-descriptions>
			</div>
		</div>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import tabHeader from './Tab'
	import accessAuthApi from '@shop/api/accessAuth'
	
	export default {
		components:{
			innerPageLayout,
			tabHeader
		},
		data() {
			return {
				loading:0,
				data:{}
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(accessAuthApi.getLoginUserInfo({
					params: {
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.loading = 2
						this.data = response.data.result
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>