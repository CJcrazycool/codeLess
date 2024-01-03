<template>
	<div class="page-editor">
		<div class="header">
			<div class="header-left">
				<img class="logo" src="@public/assets/img/logo_light.png">
			</div>
			<template v-if="!loading">
				<div class="header-center">
					正在装修：<template v-if="pageInfo.name==''">未命名页面</template>{{pageInfo.name}}
					<slot name="headerCenter"></slot>
				</div>
				<div class="header-right">
					<slot name="headerRight"></slot>
				</div>
			</template>
		</div>
		<div class="com-lib">
			<div class="com-lib-header">
				组件库
			</div>
			<template v-if="!loading">
				<el-collapse class="com-lib-type" :value="0">
					<el-collapse-item v-for="(type, index) in comLibs" :title="type.typeName" :name="index"
						:key="index">
						<div class="com-lib-list">
							<div v-for="(name, index) in type.items" v-if="!isHeaderCom(name)" :key="index"
								class="com-lib-item" @click="addCanvasCom(name,true)" draggable="true"
								@dragstart="onComDragStart($event,name)" @dragend="onComDragEnd($event)">
								<div class="item-wrap">
									<div class="center">
										<div class="icon">
											<i :class="comConfig[name].icon"></i>
										</div>
										<div class="label">{{comConfig[name].label}}</div>
									</div>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</template>
		</div>
		<div class="preview">
			<div v-loading="loading" class="canvas" @dragover="onCanvasOver($event)" @dragleave="onCanvasLeave($event)"
				@drop="onCanvasDrop($event)" :class="{'pointer-events':canvas.comList.length<=0 && dragCom}"
				:style="{'background-color':pageInfo.bgColor}">
				<template v-if="!loading">
					<div :key="item.id" v-for="(item, index) in canvas.comList" class="com-item"
						:class="{'pointer-events':dragCom}" @dragover="onCanvasComOver($event,index)">
						<div v-show="item.showDragArea.top" class="dragarea">
							组件放置区域
						</div>
						<div class="widget" v-show="canvas.selectCom && canvas.selectCom.id == item.id">
							<div class="label">
								<div>{{index+1}} {{item.label}}</div>
							</div>
						</div>
						<div v-if="!isHeaderCom(item.name)" class="operate"
							v-show="canvas.selectCom && canvas.selectCom.id == item.id">
							<el-tooltip effect="dark" content="置顶" placement="right">
								<div class="operate-btn" @click="moveCanvasCom(item.id,0)"><i class="el-icon-upload2"></i>
								</div>
							</el-tooltip>
							<el-tooltip effect="dark" content="上移" placement="right">
								<div class="operate-btn" @click="moveCanvasCom(item.id,index-1)"><i class="el-icon-top"></i>
								</div>
							</el-tooltip>
							<el-tooltip effect="dark" content="下移" placement="right">
								<div class="operate-btn" @click="moveCanvasCom(item.id,index+1)"><i
										class="el-icon-bottom"></i></div>
							</el-tooltip>
							<el-tooltip effect="dark" content="置底" placement="right">
								<div class="operate-btn" @click="moveCanvasCom(item.id,canvas.comList.length-1)"><i
										class="el-icon-download"></i>
								</div>
							</el-tooltip>
							<el-tooltip effect="dark" content="复制" placement="right">
								<div class="operate-btn" @click="copyCanvasCom(item.id)"><i
										class="el-icon-copy-document"></i></div>
							</el-tooltip>
							<el-tooltip effect="dark" content="删除" placement="right">
								<div class="operate-btn" @click="removeCanvasCom(item.id)"><i class="el-icon-delete"></i>
								</div>
							</el-tooltip>
						</div>
						<div class="com-content" :class="{'select':canvas.selectCom && canvas.selectCom.id == item.id}"
							@click="selectCanvasCom(item)">
							<component :is="item.file" :default-com-attrs="item.defaultComAttrs"
								:ref="'canvas-com'+item.id">
							</component>
						</div>
						<div v-show="item.showDragArea.bottom" class="dragarea">
							组件放置区域
						</div>
					</div>
					<div v-show="showDefaultDragArea" class="dragarea">
						组件放置区域
					</div>
				</template>
				<div class="height-tag">iPhone 13手机高度</div>
			</div>
		</div>
		<div class="curr-com">
			<div class="curr-com-header">
				页面布局
			</div>
			<template v-if="!loading">
				<div class="curr-com-list">
					<draggable :move="checkMove" handle=".move-enable" v-model="canvas.comList" forceFallback="true"
						animation="400">
						<div :key="item.id" v-for="(item, index) in canvas.comList" @click="selectCanvasCom(item)"
							class="curr-com-item"
							:class="{'select':canvas.selectCom && canvas.selectCom.id == item.id}">
							<div class="move" :class="{'move-enable':!isHeaderCom(item.name)}">
								<div title="拖动" v-if="!isHeaderCom(item.name)">
									<i class="el-icon-rank"></i>
								</div>
							</div>
							<div class="label">
								{{index+1}} {{item.label}}
							</div>
							<div v-if="!isHeaderCom(item.name)" class="operate">
								<i title="删除" class="btn el-icon-delete el-icon--left"
									@click="removeCanvasCom(item.id)"></i>
								<i title="复制" class="btn el-icon-copy-document" @click="copyCanvasCom(item.id)"></i>
							</div>
						</div>
					</draggable>
				</div>
				<div class="curr-com-bottom">
					<el-button icon="el-icon-s-tools" size="small" @click="canvas.selectCom=null">页面设置</el-button>
				</div>
			</template>
		</div>
		<div class="control">
			<template v-if="!loading">
				<div v-for="item in canvas.comList" :key="item.id"
					v-show="canvas.selectCom && canvas.selectCom.id == item.id">
					<div class="control-header">
						{{item.label}}
					</div>
					<div class="control-content">
						<component :ref="'comControl'+item.id" :is="item.controlFile" :com-id="item.id"></component>
					</div>
				</div>
				<div v-show="!canvas.selectCom">
					<div class="control-header">
						页面设置
					</div>
					<div class="control-content">
						<pageControl ref="pageControl" :page-info="pageInfo"></pageControl>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import {
		nanoid
	} from 'nanoid'
	import pageControl from './coms/control/Page'
	import lodashFp from 'lodash/fp'
	import {
		throttle
	} from 'lodash';
	import {comConfig} from './comConfig'

	export default {
		props: {
			comLibs: {},
			loading: {
				default () {
					return false
				}
			}
		},
		components: {
			draggable,
			pageControl
		},
		computed: {},
		watch: {
			pageInfo: {
				immediate: true,
				handler: function(value) {
					this.$emit('update:page-info', value)
				}
			}
		},
		data() {
			return {
				comConfig,
				pageInfo: {
					id: null,
					typeId: null,
					name: '',
					desc: '',
					remark: '',
					bgColor: '#F5F5F5',
					status: true
				},
				dragCom: null,
				showDefaultDragArea: false,
				canvas: {
					comList: [],
					selectCom: null,
					lastOverCom: {
						index: null,
						event: null
					}
				}
			}
		},
		created() {},
		methods: {
			load(pageInfo, coms) {
				if (pageInfo)
					this.pageInfo = pageInfo
				if (coms)
					coms.forEach((com) => {
						this.addCanvasCom(com.name, false, com.attrs)
					})
				this.$emit('update:page-info', pageInfo)
			},
			//各组件表单验证
			validateForm() {
				var result = true
				var validateList = []
				var errorCom = null
				for (var i in this.canvas.comList) {
					validateList.push({
						com: this.canvas.comList[i],
						control: this.$refs['comControl' + this.canvas.comList[i].id][0],
					})
				}
				validateList.push({
					com: null,
					control: this.$refs['pageControl']
				})
				for (var i in validateList) {
					if (validateList[i].control.validate) {
						result = validateList[i].control.validate()
						if (!result) {
							errorCom = validateList[i].com
							break
						}
					}
				}
				if(!result){
					!errorCom?this.canvas.selectCom = null:this.selectCanvasCom(errorCom)
				}
				return {
					valid: result,
					com: errorCom
				}
			},
			//生成各组件表单数据
			createFormData(status) {
				var coms = []
				for (var i in this.canvas.comList) {
					var comObj = this.$refs['canvas-com' + this.canvas.comList[i].id] ? this.$refs['canvas-com' + this
						.canvas.comList[i].id][0] : null
					var comItem = {
						name: this.canvas.comList[i]['name'],
						attrs: null
					}
					if (comObj)
						comItem['attrs'] = comObj.comAttrs
					coms.push(comItem)
				}
				return JSON.stringify(coms)
			},
			//检查是否可移动到此位置，如果当前位置为页面头部组件，则不可移动
			checkMove(e) {
				if (this.isHeaderCom(e.relatedContext.element.name)) {
					return false
				}
				return true
			},
			//判断传入的name是否为页面头部组件
			isHeaderCom(name) {
				if (name == 'header') {
					return true
				}
				return false
			},
			//获取画布组件对象
			getCanvasComObject(comId) {
				return this.$refs['canvas-com' + comId][0]
			},
			//创建画布新组件
			createCanvasCom(name, defaultAttrs) {
				var id = nanoid()
				return {
					id: id,
					name: name,
					label: this.comConfig[name].label,
					file: this.comConfig[name].file.default,
					controlFile: this.comConfig[name].controlFile.default,
					showDragArea: {
						top: false,
						bottom: false
					},
					defaultComAttrs: defaultAttrs,
					hasActive: false
				}
			},
			//添加画布新组件
			addCanvasCom(name, defaultSelect, defaultAttrs) {
				var com = this.createCanvasCom(name, defaultAttrs)
				this.canvas.comList.push(com)
				if (defaultSelect)
					this.selectCanvasCom(com)
			},
			//复制画布新组件
			copyCanvasCom(id) {
				var index = this.canvas.comList.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				var newCom = lodashFp.cloneDeep(this.canvas.comList[index])
				newCom.id = nanoid()
				newCom.defaultComAttrs = lodashFp.cloneDeep(this.$refs['canvas-com' + this.canvas.comList[index].id][0]
					.comAttrs)
				this.canvas.comList.splice(index + 1, 0, newCom)
			},
			//删除画布组件
			removeCanvasCom(id) {
				var isRemoveSelect = false
				var index = this.canvas.comList.findIndex((item) => {
					if (this.canvas.selectCom.id == item.id)
						isRemoveSelect = true
					return item.id == id
				})
				if (index < 0)
					return
				this.canvas.comList.splice(index, 1)
				if (isRemoveSelect) {
					var newSelect = this.canvas.comList[index]
					if (!newSelect)
						newSelect = this.canvas.comList[index - 1]
					this.canvas.selectCom = newSelect
				}
			},
			//选中画布组件
			selectCanvasCom(select) {
				var index = this.canvas.comList.findIndex((item) => {
					return item.id == select.id
				})
				if (index >= 0)
					this.canvas.selectCom = select
			},
			//移动画布组件顺序
			moveCanvasCom(id, targetIndex) {
				var index = this.canvas.comList.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				if (!this.canvas.comList[targetIndex])
					return
				var temp = this.canvas.comList[index]
				for (; targetIndex < this.canvas.comList.length; targetIndex++) {
					if (!this.isHeaderCom(this.canvas.comList[targetIndex].name)) {
						break
					}
				}
				this.canvas.comList.splice(index, 1)
				this.canvas.comList.splice(targetIndex, 0, temp)
			},
			//下方代码为从左侧组件库拖拽至画布生成画布组件逻辑
			onComDragStart(event, name) {
				this.dragCom = name
			},
			onComDragEnd(event, com) {
				this.dragCom = null
			},
			renderDrawArea: throttle(function() {
				this.showDefaultDragArea = false
				for (var i in this.canvas.comList) {
					this.canvas.comList[i].showDragArea.bottom = false
					this.canvas.comList[i].showDragArea.top = false
				}
				if (this.canvas.lastOverCom.index != null) {
					if (this.canvas.lastOverCom.index == -1) {
						this.showDefaultDragArea = true
					} else if (this.canvas.lastOverCom.index >= 0) {
						if (this.canvas.lastOverCom.index == 0 && this.canvas.lastOverCom.event && this.canvas
							.lastOverCom.event.offsetY < this.canvas.lastOverCom.event.target.offsetHeight /
							2) {
							if (!this.isHeaderCom(this.canvas.comList[this.canvas.lastOverCom.index].name)) {
								this.canvas.comList[this.canvas.lastOverCom.index].showDragArea.top = true
							} else {
								this.canvas.comList[this.canvas.lastOverCom.index].showDragArea.bottom = true
							}
						} else {
							this.canvas.comList[this.canvas.lastOverCom.index].showDragArea.bottom = true
						}
					}
				}
			}, 40),
			onCanvasOver(event) {
				if (!this.dragCom)
					return
				event.preventDefault()
				event.dataTransfer.dropEffect = "copy"
				if (this.canvas.comList.length <= 0) {
					this.canvas.lastOverCom.index = -1
				} else if (this.canvas.lastOverCom.index == null) {
					this.canvas.lastOverCom.index = this.canvas.comList.length - 1
				}
				this.renderDrawArea()
			},
			onCanvasLeave(event) {
				if (!this.dragCom)
					return
				this.canvas.lastOverCom.index = null
				this.renderDrawArea()
			},
			onCanvasDrop(event) {
				if (!this.dragCom)
					return
				this.canvas.lastOverCom.index = null
				this.canvas.lastOverCom.event = null
				var newCom = this.createCanvasCom(this.dragCom)
				if (this.showDefaultDragArea) {
					this.canvas.comList.push(newCom)
				} else {
					for (var i = 0; i < this.canvas.comList.length; i++) {
						if (this.canvas.comList[i].showDragArea.top) {
							this.canvas.comList.splice(0, 0, newCom)
							break
						} else if (this.canvas.comList[i].showDragArea.bottom) {
							this.canvas.comList.splice(i + 1, 0, newCom)
							break
						}
					}
				}
				this.selectCanvasCom(newCom)
				this.renderDrawArea()
			},
			onCanvasComOver(event, index) {
				if (!this.dragCom)
					return
				event.preventDefault()
				event.dataTransfer.dropEffect = "copy"
				this.canvas.lastOverCom.event = event
				this.canvas.lastOverCom.index = index
				this.renderDrawArea()
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@public/styles/page-editor/style.scss";

	.header {
		z-index: $--index-top;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $header-background-color;
		height: $header-menu-height;
		position: absolute;
		top: 0px;
		right: 0px;
		left: 0px;

		.logo {
			padding-left: 15px;
			height: 35px;
			display: inline-block;
			vertical-align: middle;
		}

		&-center {
			font-size: $--font-size-base;
			color: $--color-white;
		}

		&-left,
		&-right,
		&-btn {
			height: 100%;
			display: flex;
			align-items: center;
		}

		&-left {
			margin-left: 10px;
		}

		&-right {
			margin-right: 10px;
			padding-right: 10px;
		}

	}

	.com-lib {
		overflow-y: auto;
		position: absolute;
		top: $header-menu-height;
		left: 0;
		width: 308px;
		bottom: 0;
		background: $--color-white;
		box-shadow: -5px 0 10px 5px rgba($--color-black, .1);

		&-header {
			height: 57px;
			line-height: 57px;
			text-align: center;
			font-size: $--font-size-medium;
			border-bottom: $--border-base;
		}

		&-type {
			position: absolute;
			top: 58px;
			bottom: 0px;
			width: 100%;
			border: none;
			overflow: auto;

			::v-deep .el-collapse-item__header {
				border-bottom: none;
				font-size: $--font-size-base;
				font-weight: $font-weight-large;
			}

			::v-deep .el-collapse-item__wrap {
				border-bottom: none;
			}

			::v-deep .el-collapse-item__content {
				padding-bottom: 15px;
			}

			::v-deep .el-collapse-item__header {
				padding: 4px 20px;
			}
		}

		&-item {
			margin-left: 8px;
			display: inline-block;
			width: 92px;
			height: 100px;
			font-size: $--font-size-extra-small;
			margin-bottom: 8px;
			vertical-align: top;
			cursor: pointer;
			border-radius: $--border-radius-base;

			&:hover {
				background-color: $--color-primary;

				.label,
				.icon {
					color: $--color-white;
				}

				.icon {
					transform: scale(1);
				}
			}

			.item-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}

			.center {
				text-align: center;
				line-height: initial;
			}

			.label {
				margin-top: 10px;
				font-size: $--font-size-base;
			}

			.icon {
				transform: scale(0.8);
				transition: transform .1s;
				color: $--color-text-placeholder;

				i {
					font-size: 46px;
				}
			}

		}
	}

	.preview {
		position: absolute;
		left: 308px;
		right: 610px;
		top: $header-menu-height;
		bottom: 0;
		overflow-y: auto;
		padding: 35px 0px;
	}

	.canvas {

		@mixin comActiveBorder {
			border: 1px solid $selected-color-deep;
			content: "";
			position: absolute;
			width: 377px;
			height: 100%;
			left: -1px;
			top: 0;
			box-sizing: border-box;
			z-index: 110;
		}

		position: relative;
		width: 375px;
		margin: 0 auto;
		min-height: 825px;
		box-shadow: $--box-shadow-light;
		background-color: $--color-white;

		.height-tag {
			position: absolute;
			left: 375px;
			top: 769px;
			text-align: right;
			width: 130px;
			color: $--color-text-secondary;
			border-bottom: $--border-base;
			font-size: $--font-size-extra-small;
			padding-bottom: 6px;
			padding-right: 6px;
			font-weight: $font-weight-large;
			user-select: none;
		}

		.dragarea {
			position: relative;
			width: 100%;
			background-color: $selected-color-deep;
			color: $--color-white;
			padding: 10px 0px;
			text-align: center;
			font-size: $--font-size-base;

			&:before {
				@include comActiveBorder;
			}
		}

		.com-item {
			position: relative;
		}

		.com-content {
			position: relative;
			width: 100%;
			min-height: 15px;
			cursor: move;

			&:hover:before,
			&.select:before {
				@include comActiveBorder;
			}

			&:hover:before {
				border: 2px dashed $selected-color-deep;
			}

			&.select:before {
				border: 2px solid $selected-color-deep;
			}
		}

		.widget {
			position: absolute;
			left: -106px;
			top: 0;
			width: 80px;

			.label {
				position: absolute;
				right: 0px;
				display: inline-block;
				white-space: nowrap;
				border: $--border-base;
				padding: 8px 12px;
				background-color: $--color-white;
				font-size: $--font-size-base;

				&:before {
					content: " ";
					position: absolute;
					top: 12px;
					right: -7px;
					width: 0;
					height: 0;
					border-top: 7px solid transparent;
					border-left: 7px solid $--border-color-base;
					border-bottom: 7px solid transparent;
				}

				&:after {
					content: " ";
					position: absolute;
					top: 13px;
					right: -6px;
					width: 0;
					height: 0;
					border-top: 6px solid transparent;
					border-left: 7px solid $--color-white;
					border-bottom: 6px solid transparent;
				}
			}
		}

		.operate {
			position: absolute;
			top: 0;
			right: -58px;
			background: $--color-white;
			box-shadow: $--box-shadow-light;
			border-radius: $--border-radius-small;
			padding: 6px;
			box-sizing: border-box;
			text-align: center;
			z-index: 100;

			&-btn {
				padding: 6px 8px;
				margin-bottom: 10px;
				cursor: pointer;
				border-radius: $--border-radius-small;

				&:hover {
					background-color: rgba($--color-black, .1);
				}

				&:last-child {
					margin-bottom: 0px;
				}
			}
		}
	}

	.control {
		position: absolute;
		right: 0px;
		width: 400px;
		top: $header-menu-height;
		bottom: 0;
		overflow-y: auto;
		background-color: $--color-white;
		border-left: $--border-base;

		&-header {
			padding: 25px;
			font-size: $--font-size-large;
			font-weight: $font-weight-large;
			border-bottom: $--border-base;
		}

		&-content {
			padding: 25px;
		}
	}

	.curr-com {
		position: absolute;
		right: 400px;
		width: 210px;
		top: $header-menu-height;
		bottom: 0;
		overflow-y: auto;
		background-color: $--color-white;
		box-shadow: -5px 0 10px -5px rgba($--color-black, .1);

		&-header {
			height: 57px;
			line-height: 57px;
			text-align: center;
			font-size: $--font-size-medium;
			background-color: $background-color-deep;
			top: 0px;
		}

		&-list {
			position: absolute;
			top: 57px;
			bottom: 60px;
			width: 100%;
			overflow: auto;
		}

		&-bottom {
			position: absolute;
			bottom: 0px;
			left: 0px;
			right: 0px;
			height: 60px;
			line-height: 60px;
			padding: 0px 14px;
			border-top: $--border-base;
			text-align: center;
		}

		&-item {
			font-size: $--font-size-base;
			display: flex;
			height: 50px;
			padding: 6px 14px;
			background-color: $--color-white;
			transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
			transition-property: color, background-color, border-color;
			border-bottom: $--border-base;
			cursor: pointer;

			.move {
				line-height: 50px;
				width: 30px;
				text-align: center;
				font-size: $--font-size-medium;
				cursor: default;

				&-enable {
					cursor: grab;
				}
			}

			.label {
				line-height: 50px;
				float: right;
				flex: 1;
			}

			.operate {
				visibility: hidden;
				text-align: right;
				width: 60px;
				line-height: 50px;
				font-size: $--font-size-medium;

				.btn {
					padding: 4px;
					border-radius: $--border-radius-small;

					&:hover {
						background-color: rgba($--color-black, .1);
					}
				}
			}

			&.select,
			&:hover {
				background-color: $--color-primary-light-8;
			}

			&:hover {
				.operate {
					visibility: visible;
				}
			}
		}
	}

	.page-editor {
		::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
	}

	.pointer-events * {
		pointer-events: none;
	}
</style>
