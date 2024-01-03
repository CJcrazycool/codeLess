<!-- 图片上传展示列表 -->
<template>
	<div class="upload-image-list">
		<draggable class="image-list" handle=".move" v-model="images" forceFallback="true" animation="400"
			:disabled="!drag || images.length<=1" :move="checkMove" @start="isDarging=true" @end="isDarging=false;change()"
			filter=".upload-btn">
			<div v-for='(item) in images' :key="item.id" class="image-item">
				<div class="image-box" :class='{draging:isDarging,uploading:item.file && item.file.status =="uploading"}'>
					<el-progress v-if="item.file && item.file.status =='uploading'" class="upload-progress" :stroke-width="2" :percentage="item.file.percentage" :show-text="false"></el-progress>
					<div class="upload-error" v-else-if="item.file && item.file.status =='fail'">上传失败</div>
					<div class="upload-error" v-else-if="item.file && item.file.status =='invalidSize'">文件过大</div>
					<div class="upload-error" v-else-if="item.file && item.file.status =='invalidType'">不支持类型</div>
					<img v-else v-img-src="{url:item.url,thumbnail:'200'}"/>
					<div class="image-action">
						<i v-if="images.length>1" title="拖动" class="span_left move el-icon-rank"></i>
						<i title="删除" class="span_left delete el-icon-delete" @click="remove(item.id)"></i>
					</div>
				</div>
				<div v-if="$scopedSlots.default" class="slot-content">
					<slot name="default" :item="item"></slot>
				</div>
			</div>
			<div v-if="!limit || images.length<limit" class="upload-btn" @click="upload" ref="uploadBtn">
				<i class="el-icon-plus"></i>
				<div v-if="limit" class="tip">（{{images.length}}/{{limit}}）</div>
			</div>
		</draggable>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import {
		nanoid
	} from 'nanoid'

	export default {
		props: {
			//是否支持拖拽
			drag: {
				default: true
			},
			//限制数量
			limit: {
				default: null
			},
			//默认值
			value:{
				default(){
					return []
				}
			},
			afterCreateImage:{}
		},
		components: {
			draggable
		},
		watch: {
			value:{
				immediate:true,
				deep:true,
				handler(value){
					if(this.isUpdatingValue){
						this.isUpdatingValue = false
					}else{
						//value值变更的时候，都会刷新图片列表
						this.updateImages()
					}
				}
			}
		},
		data() {
			return {
				//是否当前移动中
				isDarging: false,
				//图片列表
				images: [],
				isUpdatingValue:false
			};
		},
		created() {
		},
		methods: {
			//检查是否可移动到当前位置，如果目标移动位置为上传图片按钮，则不可被移动。
			checkMove(e) {
				if (this.$refs.uploadBtn && e.related == this.$refs.uploadBtn) {
					return false
				}
				return true
			},
			//刷新图片列表
			updateImages(value){
				this.images = []
				this.value.forEach((item)=>{
					this.images.push(this.create(item))
				})
				this.change()
			},
			//创建图片
			create(item){
				var result = {
					id: !item.id?nanoid():item.id,
					...item
				}
				if(this.afterCreateImage)
					this.afterCreateImage(result)
				return result
			},
			//添加图片
			add(item) {
				this.images.push(this.create(item))
				this.change()
			},
			//移除图片
			remove(id) {
				var index = this.images.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				var image = this.images.splice(index, 1)
				this.change()
			},
			//触发上传按钮事件
			upload() {
				this.$emit('upload',this.images)
			},
			//触发图片列表改变事件
			change(){
				this.isUpdatingValue = true
				this.$emit('change',this.images)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.upload-btn,
	.image-box {
		width: 94px;
		height: 94px;
		border-radius: $--border-radius-base;
		box-sizing: border-box;
		background-color: $--color-white;
	}

	.image-item,.upload-btn {
		margin-right: 10px;
		margin-bottom: 10px;
		position: relative;
	}
	
	.image-box{
		border:1px $--border-color-lighter solid;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 100%;
			height: 100%;
			vertical-align: top;
			object-fit: contain;
			background-color: $--background-color-base;
		}

		&:hover {
			.image-action {
				opacity: 1;
			}
		}

		&.draging {
			.image-action {
				opacity: 0;
			}
		}
	}

	.upload-btn {
		border: $--border-base;
		line-height: 18px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-style: dashed;
		cursor: pointer;

		i {
			font-size: 20px;
			color: #8c939d;
		}
		
		.tip{
			font-size: $--font-size-extra-small;
			display: block;
		}

		&:hover {
			border-color: $--color-primary;
			i,.tip{
				color: $--color-primary;
			}
		}
	}
	
	.upload-btn,.image-item{
		&:last-child{
			margin-right: 0px;
		}
	}

	.image-list {
		display: flex;
		flex-wrap: wrap;
	}

	.image-action {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		text-align: center;
		color: $--color-white;
		opacity: 0;
		font-size: $--font-size-large;
		background-color: rgba($--color-black, .5);
		transition: opacity .3s;
		display: flex;
		align-items: center;
		justify-content: center;
	
		.delete {
			cursor: pointer;
		}
	}
	
	.upload-progress{
		padding: 8px;
		width:100%;
	}
	
	.upload-error{
		font-size: $--font-size-extra-small;
		color:$--color-danger;
	}
	
	.slot-content{
		margin-top: 10px;
	}
	
</style>
