<!-- 表格视图 -->
<template>
	<div class="table-view">
		<div v-if="$slots['search']" class="table-view-search">
			<el-form ref="searchForm" class="form" size="small" inline label-position="right" :model="searchForm"
				@submit.native.prevent>
				<slot name="search"></slot>
				<el-form-item>
					<el-button size="small" :disabled="remoteLoading" native-type="submit" type="primary" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>
		<selectResult v-if="showSelectResult" :selectCount="selectRows.length" @clear="clearSelectRows"></selectResult>
		<div v-if="$slots['operate']" class="table-view-operate">
			<slot name="operate"></slot>
		</div>
		<div class="table-view-center" ref="viewCenter" v-loading="remoteLoading" >
			<div v-if="$slots['side']" class="table-view-side">
				<slot name="side"></slot>
			</div>
			<div class="table-view-content">
				<el-table ref="table" :class="{'single-select':singleSelect}"
				v-bind="$attrs" v-on="$listeners" :data="loadRequest?remoteData:data" @row-click="clickRow" @select="selectRow" @selection-change="updateSelectRows"
				class="table-content" border header-cell-class-name="headerBg"> 
					<slot></slot>
					<template slot="empty">
						<template v-if="!$refs['paginationLoader'] || !$refs['paginationLoader'].loadError">暂无数据</template>
						<template v-else>
							加载失败 <el-button icon="el-icon-refresh" @click="reloadData" type="text" size="small">点击重试</el-button>
						</template>
					</template>
				</el-table>
				<div ref="stickXScroll" class="xscroll">
					<div class="content" :style="{ width: $refs.table?$refs.table.bodyWidth:null }"></div>
				</div>
			</div>
		</div>
		<div v-if="loadRequest" class="table-view-bottom">
			<paginationLoader ref="paginationLoader" :load-request="loadRequest" :load-request-params="loadRequestParams" :load-request-params-type="loadRequestParamsType" 
			:enable-pager="enablePager" :data.sync="remoteData" :loading.sync="remoteLoading" v-bind="paginationLoaderAttrs" v-on="paginationLoaderListeners"
				@change-page="scrollIntoView" @reload="scrollIntoView"></paginationLoader>
		</div>
	</div>
</template>

<script>
	import lodashFp from 'lodash/fp'

	export default {
		components: {},
		props: {
			//本地数据
			data:{},
			//远程加载请求
			loadRequest:{},
			loadRequestParamsType:{},
			//远程加载请求参数
			loadRequestParams:{
				default () {
					return {}
				}
			},
			//是否开启分页加载
			enablePager: {
				default () {
					return true
				}
			},
			//是否显示行选中结果
			showSelectResult: {
				default () {
					return false
				}
			},
			//搜索表单
			searchForm: {
				default () {
					return {}
				}
			},
			//是否开启单选
			singleSelect:{
				default(){
					return false
				}
			},
			//是否开启选中行自动选中
			clickRowSelect:{
				default(){
					return false
				}
			},
			paginationLoaderAttrs:{},
			paginationLoaderListeners:{}
		},
		data() {
			return {
				stickXScrollWidth:0,
				selectRows:[],
				remoteLoading:false,
				remoteData:[]
			}
		},
		watch: {
			'data':{
				handler() {
					this.$nextTick(()=>{
						this.updateSelectRows()
					})
				}
			},
			'remoteData':{
				handler() {
					this.$emit('remote-data')
					this.$nextTick(()=>{
						this.updateSelectRows()
					})
				}
			},
			'selectRows': {
				handler() {
					this.$emit('update:select-rows', this.selectRows);
				}
			}
		},
		computed: {
		},
		created(){
			this.setSearchParams()
		},
		mounted() {
			this.bindStickXScroll()
		},
		methods: {
			bindStickXScroll(){
				this.$nextTick(() => {
					var currScroll = ''
					var isStickScroll = false
					var isTableScroll = false
					this.$refs.table.bodyWrapper.addEventListener('scroll', () => {
						if(isStickScroll){
							isStickScroll = false
							return
						}
						isTableScroll = true
						let scrollLeft = this.$refs.table.bodyWrapper.scrollLeft
						this.$refs.stickXScroll.scrollTo(scrollLeft, 0);
					})
					this.$refs.stickXScroll.addEventListener('scroll', () => {
						if(isTableScroll){
							isTableScroll = false
							return
						}
						isStickScroll = true
						let scrollLeft = this.$refs.stickXScroll.scrollLeft
						this.$refs.table.bodyWrapper.scrollTo(scrollLeft, 0);
					})
				})
			},
			scrollIntoView(){
				this.$refs.table.bodyWrapper.scrollTop = 0
				this.$refs['viewCenter'].scrollIntoView()
			},
			search() {
				this.setSearchParams()
				this.reloadData(true)
				this.$emit('after-search',this.searchForm)
			},
			setSearchParams(){
				this.loadRequestParams = Object.assign(this.loadRequestParams,lodashFp.cloneDeep(this.searchForm))
			},
			selectRow(selection,row){
				var isSelect = selection.findIndex((item)=>{
					return item==row
				})
				if(this.singleSelect){
					this.$refs.table.clearSelection()
					this.$refs.table.toggleRowSelection(row,isSelect>-1?true:false)
				}
			},
			clickRow(row){
				if(!this.clickRowSelect){
					return
				}
				var isSelect = this.$refs.table.selection.findIndex((item)=>{
					return item==row
				})
				if(this.singleSelect){
					this.$refs.table.clearSelection()
				}
				this.$refs.table.toggleRowSelection(row,isSelect<=-1?true:false)
			},
			clearSelectRows(){
				this.$refs['table'].clearSelection()
			},
			updateSelectRows() {
				this.selectRows = this.$refs.table.selection
			},
			reloadData(resetPageNum){
				this.$refs['paginationLoader'].reloadData(resetPageNum)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@public/styles/components/table-view';
	
	.xscroll {
		z-index: $--index-top;
		position: sticky;
		margin-top: 4px;
		bottom: 0;
		width: 100%;
		overflow-x: auto;
		.content {
			height: 1px;
		}
	}
	
	::v-deep .single-select{
		.el-table__header-wrapper{
			.el-table-column--selection .cell{
				display: none;
			}
		}
	}
	
	::v-deep .table-content{
		
		.headerBg{
			background-color: $--background-color-base !important;
		}
		
		&.el-table--border{
			border-radius: $--border-radius-small;
				
			&__body-wrapper::-webkit-scrollbar{
				height: 0px;
			}
		}
		
		.el-table__body-wrapper::-webkit-scrollbar{
			height: 0px;
		}
		
	}
	
</style>
