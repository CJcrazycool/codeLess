<!-- 设置热区内容 -->
<template>
	<div class="content">
		<div class="left">
			<div class="image-wrap">
				<img @load="imgLoadDone=true" :draggable="false" v-img-src="{url:src,thumbnail:'normal'}"/>
				<vue-draggable-resizable :draggable="!selectHotArea.disableDrag" class="hot-area-block"
					v-if="imgLoadDone" v-for="(item, index) in hotAreas" :parent="true" :key="item.id"
					:w="item.width" :h="item.height" :x="item.x" :y="item.y" :min-width="blockDefault.minWidth"
					:min-height="blockDefault.minHeight" @dragstop="(x, y) => onBlockDragStop(x, y, item)"
					@resizestop="(x, y, width, height) => onBlockResizeStop(x, y, width, height, item)"
					@activated="selectHotArea.obj = item;" @deactivated="selectHotArea.obj = null"
					@dragging="selectHotArea.isDraging=true" @resizing="selectHotArea.isDraging=true">
					<div class="label">{{index+1}}</div>
					<div v-if="isShowBlockOperate(item)" class="operate"
						@mouseover="selectHotArea.disableDrag=true" @mouseleave="selectHotArea.disableDrag=false">
						<el-tooltip effect="dark" content="删除" placement="bottom">
							<i class="operate-btn el-icon-delete"
								@click="()=>{selectHotArea.disableDrag = false;removeHotArea(item.id)}"></i></el-tooltip>
						<el-tooltip effect="dark" content="复制" placement="bottom">
							<i class="operate-btn el-icon-copy-document"
								@click="()=>{selectHotArea.disableDrag = false;copyHotArea(item)}"></i>
						</el-tooltip>
					</div>
				</vue-draggable-resizable>
				<div class="clear"></div>
			</div>
		</div>
		<div class="right">
			<div class="right-header">
				<div class="right-title">热区管理</div>
				<el-button :disabled="hotAreas.length>=maxHotAreaCount" type="text" size="mini" icon="el-icon-plus"
					@click="addHotAreaList">添加热区 （{{hotAreas.length}}/{{maxHotAreaCount}}）</el-button>
			</div>
			<div class="hot-area-list">
				<div v-for='(item, index) in hotAreas' :key='item.id' class="hot-area-item">
					<div class="label">
						热区 {{index+1}}
					</div>
					<div class="operate">
						<setLinkButton v-model="item.link" :update-load="!copyIds.includes(item.id)"
							:button-attrs="{type:'text',icon:'el-icon-link'}">设置链接</setLinkButton>
						<el-button title="删除" class="btn-text-info" icon="el-icon-delete" type="text"
							@click="removeHotArea(item.id)"></el-button>
						<el-button title="复制" class="btn-text-info" :disabled="hotAreas.length>=maxHotAreaCount"
							icon="el-icon-copy-document" type="text" @click="copyHotArea(item)"></el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vueDraggableResizable from 'vue-draggable-resizable'
	import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
	import setLinkButton from './SetLinkButton'
	import {nanoid} from 'nanoid'

	export default {
		components: {
			vueDraggableResizable,
			setLinkButton
		},
		model: {},
		props:{
			src:{
				default:null
			},
			hotAreas:{
				default:[]
			}
		},
		watch: {
			hotAreas:{
				immediate:true,
				deep:true,
				handler(value){
					this.$emit('update:hot-areas',value)
				}
			}
		},
		computed: {
			isShowBlockOperate() {
				return (item) => {
					return item == this.selectHotArea.obj && !this.selectHotArea.isDraging
				}
			}
		},
		data() {
			return {
				maxHotAreaCount: 20,
				copyIds:[],
				blockDefault: {
					minWidth: 30,
					minHeight: 30,
					x: 0,
					y: 0,
					width: 50,
					height: 50
				},
				imgLoadDone: false,
				selectHotArea: {
					obj: null,
					isDraging: false,
					disableDrag: false
				}
			};
		},
		mounted() {
			if(this.hotAreas.length<=0)
				this.addHotAreaList()
		},
		methods: {
			addHotAreaList() {
				this.hotAreas.push({
					id: nanoid(),
					x: this.blockDefault.x,
					y: this.blockDefault.y,
					width: this.blockDefault.width,
					height: this.blockDefault.height,
					link: null
				})
			},
			removeHotArea(id) {
				var index = this.hotAreas.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.hotAreas.splice(index, 1)
			},
			copyHotArea(item) {
				var newItem = {
					...item,
					id: nanoid(),
				}
				this.copyIds.push(newItem.id)
				this.hotAreas.push(newItem)
			},
			onBlockResizeStop(x, y, width, height, item) {
				item.x = x
				item.y = y
				item.width = width
				item.height = height
				this.selectHotArea.isDraging = false
			},
			onBlockDragStop(x, y, item) {
				item.x = x
				item.y = y
				this.selectHotArea.isDraging = false
			},
			changeLink(item, link) {
				item.link = link
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		justify-content: space-between;
	}

	.left {
		user-select: none;
		width: 375px;
		position: relative;
		margin-right: 20px;
	}
	
	.image-wrap{
		width: 375px;
		background-color: $background-color-deep;
		border-radius: $--border-radius-small;
		padding: 8px;
		margin-bottom: 20px;
		
		img {
			float: left;
			box-sizing: border-box;
			vertical-align: bottom;
			width: 100%;
			-o-object-fit: contain;
			object-fit: contain;
		}
	}


	.right {
		overflow: auto;
		margin-left: 20px;
		padding-right: 10px;
		flex: 1;

		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

		}

		&-title {
			font-weight: $font-weight-large;
		}

	}

	.hot-area {
		&-list {
			margin-top: 10px;
		}

		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: $--font-size-base;
			padding: 8px 12px;
			border: $--border-base;
			border-radius: $--border-radius-base;
			margin-bottom: 10px;

			::v-deep .set-link-button {
				background-color: $--background-color-base;
				border-radius: $--border-radius-small;
				padding: 0px 8px;
				max-width: 230px;
				margin-right: 10px;
			}
		}

		&-block {
			background: rgba($selected-color-deep, .6);
			padding: 6px;
			cursor: move;
			border: none;

			&.active {
				z-index: $--index-top !important;
				background: rgba($selected-color-deep, .9);
			}

			::v-deep .handle {
				width: 6px;
				height: 6px;

				&-tl,
				&-tm,
				&-tr {
					top: -2px;
				}

				&-tl,
				&-ml,
				&-bl {
					left: -2px;
				}

				&-tr,
				&-mr,
				&-br {
					right: -2px;
				}

				&-bl,
				&-bm,
				&-br {
					bottom: -2px;
				}

			}

			.operate {
				display: inline-flex;
				position: absolute;
				background: $--color-white;
				box-shadow: $--box-shadow-dark;
				box-sizing: border-box;
				text-align: center;
				font-size: $--font-size-medium;
				left: 0px;
				bottom: -30px;

				&-btn {
					cursor: pointer;
					padding: 4px;

					&:hover {
						background-color: rgba($--color-black, .1);
					}
				}
			}

			.label {
				font-size: $--font-size-extra-small;
				color: $--color-white;
			}
		}
	}
</style>