<!-- 标签列表 -->
<template>
	<draggable class="tag-list" :move="checkMove" handle=".move" v-model="tagItems" forceFallback="true" @end="updateInput()"
		animation="400">
		<div class="item" v-for="(item,index) in tagItems" :key="item.id">
			<span class="text move">{{item.name}}</span>
			<el-popover v-model="editForm[item.id].visible" @show="editForm[item.id].data=editForm[item.id].resetForm()" placement="bottom-start" width="200" trigger="click">
				<el-form @submit.native.prevent size="small">
					<el-form-item :label="label+'名称'">
						<el-input v-model="editForm[item.id].data.name" :placeholder="'请填写'+label+'名称'" maxlength="12"></el-input>
					</el-form-item>
					<el-button native-type="submit" :disabled="!editForm[item.id].data.name" size="small" type="primary" class="fill-width" @click="edit(editForm[item.id],item)">确定</el-button>
				</el-form>
				<el-button slot="reference" title="编辑" class="btn-text-info operate" icon="el-icon-edit-outline"
					type="text"></el-button>
			  </el-popover>
			<el-button slot="reference" @click="remove(item.id)" title="删除" class="btn-text-info operate" icon="el-icon-close"
				type="text"></el-button>
		</div>
		<el-popover v-model="addVisible" @show="addForm=resetAddForm()" v-show="!limit || tagItems.length<limit" 
		ref="addButton" placement="bottom-start" width="200" trigger="click">
			<el-form @submit.native.prevent size="small">
				<el-form-item :label="label+'名称'">
					<el-input v-model="addForm.name" maxlength="12" :placeholder="'请填写'+label+'名称'"></el-input>
				</el-form-item>
				<el-button native-type="submit" :disabled="!addForm.name" size="small" type="primary" class="fill-width" @click="add">确定</el-button>
			</el-form>
			<el-button class="add-btn" slot="reference" type="text" size="small">+ 添加{{label}}<template v-if="limit"> ({{tagItems.length}}/{{limit}})</template></el-button>
		</el-popover>
	</draggable>
</template>

<script>
	import draggable from 'vuedraggable'
	import {
		nanoid
	} from 'nanoid'
	import lodashFp from 'lodash/fp'
	import arrayValueFormatter from './ArrayValueFormatter'
	
	export default {
		mixins:[arrayValueFormatter],
		components:{
			draggable
		},
		props: {
			//可传入object,json,或其他分割符号，默认为逗号分割。
			valueFormatter:{
				default(){
					return ','
				}
			},
			limit:{},
			label:{},
			value:{}
		},
		watch: {
			value: {
				immediate: true,
				handler: function(value) {
					if(this.isUpdatingValue){
						this.isUpdatingValue = false
					}else{
						this.loadList(value)
					}
				}
			}
		},
		data() {
			return {
				addVisible:false,
				addForm:this.resetAddForm(),
				editForm:{},
				tagItems:[],
				isUpdatingValue:false
			};
		},
		created() {
			if(this.items)
				this.tagItems = lodashFp.cloneDeep(this.items)
			this.createEditForm()
		},
		methods: {
			//初始化项列表
			loadList(value){
				if(!value)
					return
				var tags = []
				var addList = this.parseValue(value)
				addList.forEach((text)=>{
					tags.push(this.createItem(text))
				})
				this.tagItems = tags
			},
			//检查项是否可移动到当前对象，如果为添加按钮，则不可被移动到当前位置
			checkMove(e) {
				if (this.$refs.addButton && e.related == this.$refs.addButton.$el) {
					return false
				}
				return true
			},
			//重置添加表单
			resetAddForm(){
				return {
					name:''
				}
			},
			//为项生成一个编辑表单
			createEditForm(){
				this.tagItems.forEach((item)=>{
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
			//删除项
			remove(id) {
				var index = this.tagItems.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.tagItems.splice(index, 1)
				this.updateInput()
			},
			//创建项
			createItem(name){
				return {
					id:nanoid(),
					_isNew:true,
					name
				}
			},
			//添加项
			add(){
				this.addVisible = false
				this.tagItems.push(this.createItem(this.addForm.name))
				this.addForm = this.resetAddForm()
				this.createEditForm()
				this.updateInput()
			},
			//编辑项
			edit(form,item){
				form.visible = false
				item.name = form.data.name
				this.updateInput()
			},
			//更新v-model值
			updateInput() {
				this.$nextTick(()=>{
					let inputValue = this.tagItems.map((item) => {
						return item.name
					})
					this.isUpdatingValue = true
					this.$emit('input', this.encodeValue(inputValue))
				})
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
