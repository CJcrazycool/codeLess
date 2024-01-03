<template>
	<div>
		<div v-loading="loading==1">
			<template v-for="(type) in columnType">
				<div class="column-type-title">{{type.name}}</div>
				<draggable class="tag-list" :move="(e)=>checkMove(e,'addButton-'+type.type)" handle=".move"
					v-model="attrItems[type.type]" forceFallback="true" animation="400">
					<div class="item" v-for="(item,index) in attrItems[type.type]" :key="item.id">
						<img v-if="item.icon" class="icon" v-img-src="{url:item.icon,thumbnail:'thumb'}" />
						<span class="text move">{{item.name}}</span>
						<el-button size="small" slot="reference" @click="edit(item)" title="编辑" class="btn-text-info operate" icon="el-icon-edit-outline"
							type="text"></el-button>
						<el-button size="small" slot="reference"  @click="remove(item.id,type.type)" title="删除" class="btn-text-info operate" icon="el-icon-close"
							type="text"></el-button>
					</div>
					<el-button :ref="'addButton-'+type.type" v-show="attrItems[type.type].length<maxLength" class="add-btn"
						type="text" @click="add(type.type)">+ 添加字段 ({{attrItems[type.type].length}}/{{maxLength}})</el-button>
				</draggable>
			</template>
		</div>
		<div class="dialog-footer">
			<el-button :disabled="loading!=2" :loading="saveLoading" size="small" type="primary" @click="saveAll">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
		<el-dialog :append-to-body="true" title="添加字段" :visible.sync="addAttrFormVisible" width="500px" top="20vh"
		 @open="addAttrFormAlive=true" @closed="addAttrFormAlive=false">
			<attrForm v-if="addAttrFormAlive" :form-type="addAttrFormType" @save="save" @cancel="addAttrFormVisible=false"></attrForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑字段" :visible.sync="editAttrFormVisible" width="500px" top="20vh"
		 @open="editAttrFormAlive=true" @closed="editAttrFormAlive=false">
			<attrForm v-if="editAttrFormAlive" @save="save" :default-form="editAttrForm" @cancel="editAttrFormVisible=false"></attrForm>
		</el-dialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import attrForm from './AttrForm'
	import roomApi from '@shop/api/room'
	import {
		nanoid
	} from 'nanoid'

	export default {
		components: {
			draggable,
			attrForm
		},
		data() {
			return {
				loading:0,
				saveLoading:false,
				columnType: [{
						name: '房型属性',
						type: 'attr'
					},
					{
						name: '设施/服务',
						type: 'support'
					}
				],
				maxLength: 10,
				addAttrFormVisible: false,
				addAttrFormAlive: false,
				addAttrFormType: '',
				editAttrFormVisible:false,
				editAttrFormAlive:false,
				editAttrForm:null,
				attrItems: {
					'attr': [],
					'support': []
				},
			}
		},
		computed: {},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(roomApi.columnList({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if(response.data.result)
						{
							var attr = []
							var support = []
							response.data.result.forEach((item)=>{
								if(item.facilityType==0)
									attr.push(item)
								else if(item.facilityType==1)
									support.push(item)
							})
							this.attrItems.attr = attr
							this.attrItems.support = support
						}
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			checkMove(e, attr) {
				if (this.$refs[attr] && e.related == this.$refs[attr][0].$el) {
					return false
				}
				return true
			},
			remove(id, type) {
				var index = this.attrItems[type].findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.attrItems[type].splice(index, 1)
			},
			add(type) {
				this.addAttrFormType = type
				this.addAttrFormVisible = true
			},
			edit(attrForm) {
				this.editAttrForm = attrForm
				this.editAttrFormVisible = true
			},
			save(form) {
				if(form.id)
				{
					Object.assign(this.editAttrForm,form)
					this.editAttrFormVisible = false
				}else{
					this.attrItems[form.type].push({
						id: nanoid(),
						...form
					})
					this.addAttrFormVisible = false
				}
			},
			saveAll(){
				var data = []
				var sort = 0;
				function setData(item,type){
					data.push({
						id:item._isNew?null:item.id,
						name:item.name,
						icon:item.icon,
						facilityType:type,
						sort:sort
					})
					sort++
				}
				this.attrItems.attr.forEach((item)=>{
					setData(item,0)
				})
				this.attrItems.support.forEach((item)=>{
					setData(item,1)
				})
				this.$request.submit(roomApi.saveColumn({
					data,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						this.$emit('save')
					},
					successText: (response) => {
						return '保存成功'
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.column-type-title {
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: $--font-size-base;
		font-weight: $font-weight-large;
		color:$--color-text-primary;

		&:first-child {
			margin-top: 0px;
		}
	}

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
		
		.icon {
			width: 20px;
			height: 20px;
			border-radius:$--border-radius-small;
			object-fit: contain;
			vertical-align: text-bottom;
		}
		
		.text{
			margin-right: 3px;
			margin-left: 6px;
		}
		
		.operate{
			border-radius: $--border-radius-small;
			padding: 2px;
			cursor: pointer;
			margin-left: 0px;
		}
	}
</style>
