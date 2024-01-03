<!-- 设置图片列表 -->
<template>
	<div class="com-control-area" ref="setImgList">
		<div class="com-control-area-title">
			图片设置
			<div class="com-control-area-desc">建议图片尺寸宽度750，高度不限制。</div>
		</div>
		<div class="set-img-list">
			<draggable handle=".move" v-model="imgs" forceFallback="true" animation="400">
				<div v-for='(item, index) in imgs' :key='item.id' class="img-item">
					<el-col :span="8">
						<div class="image">
							<img v-img-src="{url:item.src,thumbnail:'mini'}">
							<div @click="editImg(item)" class="edit">更换图片</div>
						</div>
					</el-col>
					<el-col :span="16">
						<div class="right">
							<div class="header">
								<div class="label">图片设置</div>
								<div class="operate">
									<el-button title="拖动" class="move btn-text-info" icon="el-icon-rank"
										type="text"></el-button>
									<el-button title="删除" @click="removeImg(item.id)" class="btn-text-info"
										icon="el-icon-delete" type="text"></el-button>
								</div>
							</div>
							<div class="input"><el-input v-model="item.desc" placeholder="图片描述（选填）"
									size="small"></el-input></div>
							<div class="bottom">
								<setLinkButton v-if="!item.linkType || item.linkType=='link'" v-model="item.link"
									:button-attrs="{type:'text',icon:'el-icon-link'}"
									@input="(link)=>{changeLink(item,link)}">整体跳转</setLinkButton>
								<setImgHotAreaButton v-if="!hiddenHotArea && (!item.linkType || item.linkType=='hotArea')"
									v-model="item.hotAreas" :button-attrs="{type:'text',icon:'el-icon-menu'}"
									:src="item.src" @input="(hotAreas)=>{changeImgHotArea(item,hotAreas)}">热区跳转
								</setImgHotAreaButton>
							</div>
						</div>
					</el-col>
				</div>
			</draggable>
		</div>
		<el-button v-show="maxCount==null || imgs.length<maxCount" class="add-btn" icon="el-icon-plus"
			@click="showImageZone">添加图片<template v-if="maxCount!=null">（{{imgs!=null?imgs.length:0}}/{{maxCount}}）</template></el-button>
		<div v-if="!validate()" class="error">最少选择{{minCount}}张图片</div>
		<imageZoneDialog ref="imageZone" :limit="maxCount-imgs.length"></imageZoneDialog>
		<imageZoneDialog ref="editImageZone" :multiple="false"></imageZoneDialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import setImgHotAreaButton from './SetImgHotAreaButton'
	import setLinkButton from './SetLinkButton'
	import {nanoid} from 'nanoid'
	import imageZoneDialog from '@public/components/select-dialog/ImageZoneDialog'

	export default {
		props: {
			hiddenHotArea:{
				default () {
					return false
				}
			},
			minCount:{
				default () {
					return null
				}
			},
			defaultValue: {
				default () {
					return []
				}
			},
			maxCount: {
				default () {
					return null
				}
			}
		},
		components: {
			draggable,
			setImgHotAreaButton,
			setLinkButton,
			imageZoneDialog
		},
		watch: {
			imgs: {
				deep: true,
				handler(value) {
					this.$emit('update:default-value', value);
				}
			}
		},
		data() {
			return {
				imgs: []
			};
		},
		created() {
			this.imgs = this.defaultValue
		},
		methods: {
			validate(scrollIntoView){
				if(this.minCount!= null && this.imgs.length<this.minCount){
					if(scrollIntoView){
						this.$refs.setImgList.scrollIntoView({
							block: 'center',
							behavior: 'smooth'
						})
					}
					return false
				}
				return true
			},
			showImageZone() {
				this.$refs['imageZone'].open((images)=>{
					images.forEach((url)=>{
						this.imgs.push({
							id: nanoid(),
							src: url,
							desc: '',
							linkType: null,
							link: null,
							hotAreas: []
						})
					})
				})
			},
			editImg(item) {
				this.$refs.editImageZone.open((url)=>{
					item.src = url
					item.hotAreas = []
				})
			},
			removeImg(id) {
				var index = this.imgs.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.imgs.splice(index, 1)
			},
			changeImgHotArea(item, hotAreas) {
				var type = 'hotArea'
				if (!hotAreas || hotAreas.length <= 0) {
					type = null
				}
				item.linkType = type
			},
			changeLink(item, link) {
				var type = 'link'
				if (!link) {
					type = null
				}
				item.linkType = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-img {
		&-list {
			margin-bottom: 12px;

			.img-item {
				padding: 14px;
				border: $--border-base;
				border-radius: $--border-radius-base;
				margin-bottom: 12px;
				display: flex;
				background-color: $--color-white;

				&:last-child {
					margin-bottom: 0px;
				}

				.image {
					width: 92px;
					height: 92px;
					border-radius:$--border-radius-small;
					border:1px $--border-color-lighter solid;
					box-sizing: border-box;
					overflow: hidden;
					position: relative;

					img {
						box-sizing: border-box;
						vertical-align: bottom;
						height: 100%;
						width: 100%;
						object-fit: contain;
						background-color:  $--background-color-base;
					}

					.edit {
						cursor: pointer;
						position: absolute;
						bottom: 0px;
						text-align: center;
						width: 100%;
						font-size: $--font-size-extra-small;
						line-height: 26px;
						color: $--color-white;
						background-color: rgba($--color-black, .5);
						opacity: 0;
						transition: opacity .3s;
					}

					&:hover {
						.edit {
							opacity: 1;
						}
					}
				}

				.right {
					height: 100%;
					display: flex;
					flex-direction: column;
					margin-left: 6px;

					.header,.input{
						margin-bottom: 4px;
					}
					
					.header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: $--font-size-base;
					}
					
				}
				
			}
		}
	}
	
	.add-btn {
		width: 100%;
	}
	
	.error{
		margin-top: 5px;
		font-size: $--font-size-extra-small;
		color:$--color-danger;
	}
</style>