<!-- 富文本编辑器 -->
<template>
	<div class="editor" :class="{focus:isFocus}">
		<Toolbar class="toolbar" :editor="editor" :defaultConfig="toolbarConfig" mode="default"/>
		<Editor class="editor-inner" :style="{height:height}" :defaultConfig="editorConfig" mode="default" @onFocus="onFocus"
            @onBlur="onBlur" @onCreated="onCreated" v-bind="$attrs" v-on="$listeners" v-model="txt"/>
		<imageZoneDialog ref="imageZone"></imageZoneDialog>
	</div>
</template>

<script>
	import {
		getImageResourceUrl
	} from '@public/js/util'
	import {
		Editor,
		Toolbar
	} from '@wangeditor/editor-for-vue'
	import imageZoneDialog from '@public/components/select-dialog/ImageZoneDialog'

	export default {
		components: {
			Editor,
			Toolbar,
			imageZoneDialog
		},
		props: {
			mode: {},
			height: {
				default () {
					return '500px'
				}
			},
			value:{},
			placeholder:{}
		},
		watch: {
			value(newValue){
				if(this.isUpdatingValue)
				{
					this.isUpdatingValue = false
				}else{
					this.txt = newValue
				}
			},
			txt:{
				handler(value){
					if(value=="<p><br></p>"){
						//空值
						value = ''
					}
					this.isUpdatingValue = true
					this.$emit('input',value)
				}
			}
		},
		created() {},
		data() {
			return {
				editor: null,
				isUpdatingValue:false,
				txt:this.value,
				isFocus:false,
				toolbarConfig: this.getToolbarConfig(),
				editorConfig: {
					placeholder: this.placeholder,
					autoFocus: false
				}
			}
		},
		mounted() {},
		methods: {
			getToolbarConfig() {
				//简易版编辑器
				if (this.mode == 'simple') {
					return {
						toolbarKeys: ["bold", "underline", "italic", {
								"key": "group-more-style",
								"title": "更多",
								"iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
								"menuKeys": [
									"through",
									"code",
									"sup",
									"sub",
									"clearStyle"
								],

							}, "color",
							"bgColor",
							"|",
							"fontSize", "lineHeight"
						]
					}
				} else {
				//完整版编辑器
					return {
						insertKeys: {
							index: 1, // 插入图片选择
							keys: ["resource"]
						},
						//去掉部分菜单
						excludeKeys: ["group-image", "group-video", "blockquote", "fontFamily", "todo", "group-indent",
							"emotion", "insertLink", "codeBlock", "fullScreen"
						],
					}
				}
			},
			onCreated(editor) {
				this.editor = Object.seal(editor)
				editor.on('ImageMenuClick', () => {
					this.$refs['imageZone'].open((images) => {
						images.forEach((url) => {
							this.editor.insertNode({
								type: 'image',
								src: getImageResourceUrl({
									url
								}),
								children: [{
									text: ''
								}]
							})
						})
					})
				})
			},
			onFocus(){
				this.isFocus = true
			},
			onBlur(){
				this.isFocus = false
			}
		},
		beforeDestroy() {
			this.editor.destroy()
		}
	}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
	.editor,
	::v-deep .w-e-toolbar,
	::v-deep .w-e-text-container {
		border-radius: $--border-radius-base;
	}

	.editor {
		border: $--border-base;
		transition: $--border-transition-base;
		
		&.focus{
			border-color: $--color-primary;
		}
	}

	.toolbar {
		border-bottom: $--border-base;
	}

	.editor-inner {
		overflow-y: hidden;
	}
</style>
