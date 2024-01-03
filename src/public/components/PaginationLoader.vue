<!-- 分页数据加载器 -->
<template>
	<div class="pagination-loader" :class="['position-'+position]" >
		<el-pagination :background="backgroundColor" class="pagination" :disabled="loading" :current-page.sync="pagination.num" :page-size.sync="pagination.size"
			:page-sizes="pagination.sizes" :layout="paginationLayout" :total="pagination.total" @current-change="changePage" @size-change="changeSize">
		</el-pagination>
		<el-button title="刷新" class="refresh" :loading="loading" icon="el-icon-refresh" size="mini" circle @click="reload"></el-button>
	</div>
</template>

<script>
	import lodashCore from 'lodash/core'
	import lodashFp from 'lodash/fp'
	import {recursionEach} from '@public/js/util'

	export default {
		components: {},
		props: {
			eachData:{},
			loadRequest:{},
			// 加载请求传参方式
			// params：通过url传参数，data：通过请求body传参
			loadRequestParamsType:{
				default(){
					return 'data'
				}
			},
			loadRequestParams:{
				default () {
					return {}
				}
			},
			enablePager:{
				default () {
					return true
				}
			},
			position:{
				default () {
					return 'right'
				}
			},
			pagerStyle:{
				default(){
					return 'all'
				}
			},
			size:{
				default(){
					return {}
				}
			}
		},
		watch: {
			'pagination': {
				deep:true,
				handler() {
					this.$emit('update:pagination',this.pagination)
				}
			},
			'loading':{
				handler() {
					this.$emit('update:loading',this.loading)
				}
			},
			'remoteData':{
				deep:true,
				handler() {
					this.$emit('update:data',this.remoteData)
				}
			}
		},
		data() {
			return {
				loading:false,
				loadError:false,
				pagination: {
					total: 0,
					num: 1,
					size: 20,
					sizes: [20, 30,40, 50],
					...this.size
				},
				backgroundColor:true,
				remoteData:[]
			}
		},
		computed: {
			paginationLayout() {
				var layout = []
				layout.push('total')
				if(this.enablePager){
					if(this.pagerStyle == 'small'){
						layout.push('prev')
						layout.push('pager')
						layout.push('next')
						layout.push('jumper')
						this.backgroundColor = false
					}
					else{
						layout.push('sizes')
						layout.push('prev')
						layout.push('pager')
						layout.push('next')
						layout.push('jumper')
					}
				}
				return layout.join(',')
			}
		},
		created() {
			this.loadData()
		},
		methods: {
			changeSize(){
				this.loadData()
			},
			changePage(){
				this.loadData()
				this.$emit('change-page')
			},
			reloadData(resetPageNum){ 	
				if(resetPageNum)
					this.pagination.num = 1
				this.loadData()
			},
			reload(){
				this.reloadData()
				this.$emit('reload')
			},
			loadData(){
				var params = {}
				if(this.enablePager){
					params.pageNo = this.pagination.num
					params.pageSize = this.pagination.size
				}
				params = {
					...params,
					...this.loadRequestParams
				}
				var options = {
					...this.loadRequest,
					before: () => {
						this.loading = true
						this.$emit('before-load')
					},
					success: (response) => {
						var result = response.data.result
						if(this.enablePager){
							this.remoteData = result.records?result.records:[]
							this.pagination.total = result.total?result.total:this.remoteData.length
						}else{
							this.remoteData = result?result:[]
							var total = 0
							recursionEach(this.remoteData,(item)=>{
								total++
							})
							this.pagination.total = total
						}
						if(this.eachData)
							this.eachData(this.remoteData)
						this.loadError = false
						this.$emit('load-success',response,this.remoteData)
					},
					error: (response) => {
						this.loadError = true
						this.$emit('load-error',response)
					},
					complete: (response) => {
						this.loading = false
						this.$emit('load-compelete',response)
					}
				}
				if(this.loadRequestParamsType == 'data'){
					options.data = params
				}else{
					options.params = params
				}
				this.$request.load(options)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pagination-loader{
		display: flex;
		align-items: center;
		
		&.position-right{
			justify-content:right;
		}
		
		&.position-center{
			justify-content:center;
		}
		
		&.position-left{
			justify-content:left;
		}
		
	}
	
	.pagination{
		*:last-child {
			margin-right: 0px;
		}
	}
	
	.refresh{
		margin-left: 10px;
	}
</style>
