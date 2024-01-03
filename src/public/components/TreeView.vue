<!-- 树形视图 -->
<template>
	<div class="tree-view">
		<div v-if="$slots['operate']" class="operate">
			<slot name="operate"></slot>
		</div>
		<div v-if="header" class="title">
			<div class="text">{{title}}</div>
			<el-button v-if="loadRequest" :loading="loading" title="刷新" icon="el-icon-refresh" type="text" @click="reloadData"></el-button>
		</div>
		<el-tree v-loading="loading" ref="tree" class="tree" :data="nodeData" @current-change="currentChange"
			:expand-on-click-node="false" @node-drop="dropFinish" :empty-text="loadError?'加载失败':'暂无数据'" :draggable="dropSaveRequest && draggable"
			 :default-expanded-keys="expandKeys" @node-expand="nodeExpand" @node-collapse="nodeCollapse"
			 v-bind="$attrs" v-on="$listeners" >
			<div class="node" slot-scope="{ node, data }">
				<div :title="data.label" class="label">{{ data.label }}</div>
				<slot name="nodeOperate" :node="node" :data="data"></slot>
			</div>
		</el-tree>
	</div>
</template>

<script>
	import {dataConvertor} from '@public/js/api'
	
	export default {
		props:{
			header:{
				default(){
					return true
				}
			},
			//本地数据
			data:{},
			defaultNode:{
				default(){
					return []
				}
			},
			title:{},
			//远程加载请求
			loadRequest:{},
			loadRequestParamsType:{
				default(){
					return 'params'
				}
			},
			//远程加载请求参数
			loadRequestParams:{
				default () {
					return {}
				}
			},
			//远程数据加载完成
			remoteDataLoaded:{},
			//拖拽保存请求
			dropSaveRequest:{},
			dropSaveRequestParamsType:{
				default(){
					return 'data'
				}
			}
		},
		data() {
			return {
				currNode:null,
				tab:'category',
				loading: false,
				loadError:false,
				remoteData: [],
				draggable:true,
				expandKeys:[]
			}
		},
		computed: {
			nodeData(){
				return this.loadRequest?this.defaultNode.concat(this.remoteData?this.remoteData:[]):data
			}
		},
		watch: {
			remoteData(value){
				this.$emit('update:remote-data',value)
			}
		},
		created() {
			this.loadData()
		},
		updated(){
			this.setDefaultCurrent()
		},
		methods: {
			nodeExpand(node){
				var exists = this.expandKeys.find((key)=>{
					return key == node.id
				})
				if(!exists)
					this.expandKeys.push(node.id)
			},
			nodeCollapse(node){
				var index = this.expandKeys.findIndex((key)=>{
					return key == node.id
				})
				if(index>=0)
					this.expandKeys.splice(index, 1)
			},
			currentChange(data,node){
				this.currNode =node
			},
			reloadData(){
				this.loadData()
			},
			setDefaultCurrent(){
				if(this.currNode){
					var existsNode = this.$refs.tree.getNode(this.currNode.data)
					if(existsNode)
						this.$refs.tree.setCurrentNode(existsNode.data)
					else
						this.$refs.tree.setCurrentKey(null)
				}
			},
			loadData(){
				if(!this.loadRequest)
					return
				var params = {
					...this.loadRequestParams
				}
				var options = {
					...this.loadRequest,
					before: () => {
						this.loading = true
						this.$emit('update:loading',this.loading)
						this.$emit('before-load')
					},
					success: (response) => {
						this.remoteData = response.data.result
						this.loadError = false
						this.$emit('load-success',response,this.remoteData)
					},
					error: (response) => {
						this.loadError = true
						this.$emit('load-error',response)
					},
					complete: (response) => {
						this.loading = false
						this.$emit('update:loading',this.loading)
						this.$emit('load-compelete',response)
					}
				}
				if(this.loadRequestParamsType == 'data'){
					options.data = params
				}else{
					options.params = params
				}
				this.$request.load(options)
			},
			dropFinish(node,target,type){
				if(!this.dropSaveRequest)
					return
				var data = dataConvertor.dropNode(node,target,type,this.$refs.tree.nodeKey)
				var options = {
					...this.dropSaveRequest,
					before: () => {
						this.draggable = false
					},
					success:(response)=>{
						if(response.data.success)
							this.$emit('drop-success')
					},
					successText: (response) => {
						return '移动成功'
					},
					complete: () => {
						this.draggable = true
					}
				}
				if(this.dropSaveRequestParamsType == 'data'){
					options.data = data
				}else{
					options.params = data
				}
				this.$request.submit(options)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.operate {
		margin-bottom: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.title{
		border-radius: $--border-radius-small;
		height: 42px;
		padding: 0px 18px;
		background-color: $--background-color-base;
		font-size: $--font-size-small;
		font-weight: $font-weight-large;
		margin-bottom: 12px;
		color: $--color-text-secondary;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.tree{
		
		::v-deep &.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
			font-weight: 800;
			color:$--color-primary;
		}
		
		::v-deep .el-tree-node__content {
			transition: $--all-transition;
			padding: 6px;
			height: auto;
			min-height: 26px;
			border-radius: $--border-radius-small;
			
		}
		
		.node{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: $--font-size-base;
		}
		
		.label{
			line-height: 20px;
			flex: 1;
			width: 0;
			overflow: hidden;    
			text-overflow:ellipsis;    
			white-space: nowrap;
			font-size:$--font-size-small;
		}
	}
</style>
