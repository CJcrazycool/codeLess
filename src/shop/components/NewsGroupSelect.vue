<template>
	<el-select filterable placeholder="请选择文章分组" v-bind="$attrs" v-on="$listeners">
		<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
	</el-select>
</template>

<script>
	import newsGroupApi from '@shop/api/newsGroup'
	
	export default {
		data() {
			return {
				options:[]
			}
		},
		watch: {
		},
		computed: {
		},
		created(){
			this.load()
		},
		mounted() {
		},
		methods: {
			load(){
				this.$request.load(newsGroupApi.list({
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.options = response.data.result
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>