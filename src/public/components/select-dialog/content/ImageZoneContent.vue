<template>
	<div>
		<div class="header">
			<div>
				<el-button v-if="!isUpload" icon="el-icon-upload2" size="small" @click="isUpload=true">上传图片</el-button>
				<el-button v-else icon="el-icon-back" size="small" @click="isUpload=false">返回</el-button>
				<el-button @click="$router.openWindow(movePath)" type="text">前往素材空间</el-button>
			</div>
			<div v-show="!isUpload">
				<el-form ref="searchForm" class="search-form" size="small" inline label-position="right" :model="searchForm"
					@submit.native.prevent label-width="auto">
					<el-form-item>
						<el-input v-model="searchForm.name" placeholder="请填写图片名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" :disabled="remoteLoading" native-type="submit" type="primary" @click="search">搜索</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div v-show="!isUpload">
			<selectResult :select-count="selectedImages.length" @clear="selectedImages=[]"></selectResult>
			<div class="dataview-layout">
				<div class="dataview-side">
					<treeView ref="tree" :header="false" :load-request="treeListApi()" title="素材分类"
						:highlight-current="true" :current-node-key="''" node-key="id" @current-change="queryCategory"
						:default-node="[{id:'',label:'全部文件'}]">
					</treeView>
				</div>
				<div class="dataview-content">
					<div class="img-list" v-loading="remoteLoading">
						<div class="empty" v-if="imageList.length<=0">暂无数据</div>
						<div v-else v-for="(image,index) in imageList" :key="image.id" class="img-item" :class="{selected:isSelectedImage(image)}" @click="selectImage(image)"
							@dblclick="$emit('dbclick',image)">
							<div class="image-wrap select-box">
								<img v-img-src="{url:image.imgUrl,thumbnail:'200'}"/>
								<div class="selected-badge">
									<div class="right-angle"></div>
									<div class="text"><i class="el-icon-check"></i></div>
								</div>
							</div>	
							<div :title="image.imgName" class="name">{{image.imgName}}</div>
						</div>
					</div>
					<paginationLoader class="pagination" pager-style="small" ref="paginationLoader" 
					:load-request="dataListApi()" :load-request-params="loadRequestParams"
					:data.sync="imageList" :loading.sync="remoteLoading" :size="{size:10}"></paginationLoader>
				</div>
			</div>
			<div class="dialog-footer">
				<el-button :disabled="selectedImages.length<=0" size="small" type="primary" @click="$emit('select-done',selectedImages)">确定</el-button>
				<el-button size="small" @click="$emit('cancel')">取消</el-button>
			</div>
		</div>
		<uploadImageForm v-show="isUpload" class="upload-form dialog-form" :multiple="multiple" :limit="limit"
			@save="(files)=>$emit('upload-success',files)" @cancel="$emit('cancel')"></uploadImageForm>
	</div>
</template>

<script>
	import uploadImageForm from '@public/components/UploadImageForm'
	import {envConfig} from '@public/components/env.js'
	
	export default {
		components:{
			uploadImageForm
		},
		props: {
			limit:{},
			multiple:{}
		},
		watch: {
			selectedImages: {
				immediate: true,
				handler(value) {
					this.$emit('update:select-rows', value)
				}
			}
		},
		computed: {
			isSelectedImage() {
				return (image) => {
					var index = this.selectedImages.findIndex((item) => {
						return item.id == image.id
					})
					return index < 0 ? false : true
				}
			}
		},
		data() {
			return {
				dataListApi:envConfig.resource.image.listApi,
				treeListApi:envConfig.resource.image.categoryListApi,
				movePath:envConfig.resource.image.movePath,
				remoteLoading:false,
				searchForm:{
					name:''
				},
				loadRequestParams:{
					classifyId:null
				},
				isUpload: false,
				selectedImages: [],
				imageList: []
			};
		},
		mounted() {},
		methods: {
			search(){
				this.loadRequestParams.imgName = this.searchForm.name
				this.$refs.paginationLoader.reloadData()
			},
			queryCategory(data){
				this.loadRequestParams.classifyId = data.id==""?null:data.id
				this.$refs.paginationLoader.reloadData()
			},
			selectImage(select) {
				var index = this.selectedImages.findIndex((item) => {
					return item.id == select.id
				})
				if (index < 0) {
					if(!this.multiple){
						this.selectedImages = []
					}
					this.selectedImages.push(select)
				} else {
					this.selectedImages.splice(index, 1)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
	}
	
	.dataview-side{
		width: 204px;
		height: 320px;
		overflow: auto;
		margin-right: 15px;
	}
	
	.search-form{
		.el-form-item:last-child{
			margin-right: 0px;
		}
	}

	.pagination {
		margin-top: 10px;
	}

	.img-list {
		height: 320px;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		
		.empty{
			font-size: $--font-size-extra-small;
			color:$--color-text-secondary;
			line-height: 60px;
			width: 100%;
			text-align: center;
		}
	}
	
	.img-item {
		cursor: pointer;
		position: relative;
		margin-right: 8px;
		margin-bottom: 14px;
		width:120px;
		
		.name{
			margin-top: 6px;
			font-size: $--font-size-extra-small;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	
		.image-wrap {
			width: 100%;
			height: 120px;
			border: $--border-base;
			border-radius: $--border-radius-small;
			overflow: hidden;
			margin-bottom: 6px;
			position: relative;
	
			img {
				border: none;
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
	
		}
	}

	.upload-form{
		margin-top: 24px;
	}
</style>
