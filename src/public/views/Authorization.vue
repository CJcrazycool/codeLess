<!-- 授权页面、可混入该组件公用 -->
<template>
	<div class="drawer-content">
		<div class="drawer-body" v-loading="loading==1">
			<el-tree class="permission-tree" ref="tree" :props="{label:'name'}" node-key="id" :data="permissionData"
				:default-checked-keys="keys" show-checkbox default-expand-all :check-strictly="true" @check="autoCheck">
			</el-tree>
		</div>
		<div class="drawer-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import tenantApi from '@admin/api/tenant'

	export default {
		props: {
			id: {}
		},
		components: {},
		data() {
			return {
				saveApi:null,
				treeListApi:null,
				loading: false,
				saveLoading: false,
				permissionData: [],
				keys: [],
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadAuthData()
		},
		methods: {
			autoCheck(node){
				var node = this.$refs.tree.getNode(node)
				var deepCheckChildren = (node,checked)=>{
					if(node.childNodes && node.childNodes.length>0){
						node.childNodes.forEach(node => {
							this.$refs.tree.setChecked(node,checked)
							deepCheckChildren(node,checked)
						})
					}
				}
				var deepCheckParent = (node,checked)=>{
					if(node.parent && node.level>0){
						if(checked)
							this.$refs.tree.setChecked(node.parent,checked)
						deepCheckParent(node.parent,checked)
					}
				}
				deepCheckChildren(node,node.checked)
				deepCheckParent(node,node.checked)
			},
			loadAuthData() {
				var data = {}
				if(this.beforeSave)
					this.beforeLoad(data)
				this.$request.load(this.treeListApi({
					params: data,
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						this.permissionData = response.data.result
						var keys = [];
						const setKeysDeep = (list) => {
							list.forEach(e => {
								if (e.isPermission) {
									keys.push(e.id)
								} 
								if (e.children) {
									setKeysDeep(e.children);
								}
							})
						}
						setKeysDeep(this.permissionData);
						this.keys = keys
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			save() {
				var permissionIds = [];
				var nodes = this.$refs.tree.getCheckedNodes()
				nodes.forEach(e => {
					permissionIds.push(e.id)
				})
				var data = {}
				if(this.beforeSave)
					this.beforeSave(data,permissionIds)
				this.$request.submit(this.saveApi({
					data: data,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('success')
					},
					successText: (response) => {
						return '保存成功'
					},
					complete: (response) => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .permission-tree {
		
		.el-tree-node__content {
			min-height: 34px;
		}
	}
</style>
