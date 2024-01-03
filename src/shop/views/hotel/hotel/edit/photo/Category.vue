<template>
	<div>
		<draggable class="tag-list" :move="checkMove" handle=".move" v-model="categoryItems" forceFallback="true"
			animation="400">
			<div class="item" v-for="(item,index) in categoryItems" :key="item.id">
				<span class="text move">{{item.name}}</span>
				<el-popover v-model="editForm[item.id].visible" @show="editForm[item.id].data=editForm[item.id].resetForm()" placement="bottom-start" width="200" trigger="click">
					<el-form @submit.native.prevent size="small">
						<el-form-item label="分类名称">
							<el-input v-model="editForm[item.id].data.name" placeholder="请填写分类名称" maxlength="10"></el-input>
						</el-form-item>
						<el-button native-type="submit" :disabled="!editForm[item.id].data.name" size="small" type="primary" class="fill-width" @click="edit(editForm[item.id],item)">确定</el-button>
					</el-form>
					<el-button slot="reference" title="编辑" size="small" class="btn-text-info operate" icon="el-icon-edit-outline"
						type="text"></el-button>
				  </el-popover>
				<el-button slot="reference" @click="remove(item.id)" size="small" title="删除" class="btn-text-info operate" icon="el-icon-close"
					type="text"></el-button>
			</div>
			<el-popover v-model="addVisible" @show="addForm=resetAddForm()" v-show="categoryItems.length<maxLength" 
			ref="addButton" placement="bottom-start" width="200" trigger="click">
				<el-form @submit.native.prevent size="small">
					<el-form-item label="分类名称">
						<el-input v-model="addForm.name" maxlength="10" placeholder="请填写分类名称"></el-input>
					</el-form-item>
					<el-button native-type="submit" :disabled="!addForm.name" size="small" type="primary" class="fill-width" @click="add">确定</el-button>
				</el-form>
				<el-button class="add-btn" slot="reference" type="text">+ 添加分类 ({{categoryItems.length}}/{{maxLength}})</el-button>
			</el-popover>
		</draggable>
		<div class="dialog-footer">
			<el-button size="small" type="primary" @click="saveAll">确定</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import {
		nanoid
	} from 'nanoid'
	import lodashFp from 'lodash/fp'
	
	export default {
		props:{
			items:{}
		},
		components:{
			draggable
		},
		data() {
			return {
				maxLength:5,
				addVisible:false,
				addForm:this.resetAddForm(),
				editForm:{},
				categoryItems:[]
			}
		},
		computed: {
		},
		created() {
			if(this.items)
				this.categoryItems = lodashFp.cloneDeep(this.items)
			this.createEditForm()
		},
		methods: {
			checkMove(e) {
				if (this.$refs.addButton && e.related == this.$refs.addButton.$el) {
					return false
				}
				return true
			},
			createEditForm(){
				this.categoryItems.forEach((item)=>{
					this.$set(this.editForm,item.id,new function(){
						this.resetForm = () =>{
						  return {
							id:item.id,
						  	name:item.name
						  }
						}
						this.data = this.resetForm ()
						this.visible = false
					})
				})
			},
			resetAddForm(){
				return {
					name:''
				}
			},
			remove(id) {
				var index = this.categoryItems.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.categoryItems.splice(index, 1)
			},
			add(){
				this.addVisible = false
				this.categoryItems.push({
					id:nanoid(),
					_isNew:true,
					name:this.addForm.name
				})
				this.addForm = this.resetAddForm()
				this.createEditForm()
			},
			edit(form,item){
				form.visible = false
				item.name = form.data.name
			},
			saveAll(){
				this.$emit('save',this.categoryItems)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.item,.add-btn{
		display: inline-block;
		border:dashed 1px $--color-primary;
		margin-right: 10px;
		margin-bottom: 10px;
		padding: 0px 8px;
		border-radius: $--border-radius-base;
		box-sizing: border-box;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
	}
	
	.add-btn{
		padding: 0px 15px;
	}
	
	.tag-list{
		display: flex;
		flex-wrap: wrap;
	}
	
	.item{
		border:$--border-base;
		background-color: $--color-white;
		
		.text{
			margin-right: 3px;
			margin-left: 6px;
		}
		
		.operate{
			border-radius: $--border-radius-small;
			padding: 2px;
			cursor: pointer;
		}
	}
</style>