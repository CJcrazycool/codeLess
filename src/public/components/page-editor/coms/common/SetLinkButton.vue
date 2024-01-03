<!-- 设置跳转链接按钮 -->
<template>
	<div class="set-link-button">
		<div class="body-wrap">
			<el-popover class="result-content" v-model="showPopover" @show="cascaderAlive=true" @after-leave="cascaderAlive=false" ref="popover"
				trigger="click" popper-class="set-link-popper" v-bind="popoverOptions" v-on="popoverOptions">
				<el-button class="action" slot="reference" v-bind="buttonAttrs" v-on="buttonListeners"
					:title="selectValue?selectValue.label:null">
					<template v-if="selectValue">
						<setLinkText :link="selectValue" :text="selectValueText"></setLinkText>
					</template>
					<template v-else>
						<slot></slot>
					</template>
				</el-button>
				<el-cascader-panel v-if="cascaderAlive" ref="cascader" class="set-link-panel" @expand-change="expandNode"
					:options="options" @change="changeNode"></el-cascader-panel>
			</el-popover>
			<template v-if="selectValue">
				<el-button class="remove btn-text-info" @click="removeLink" icon="el-icon-close" type="text"></el-button>
			</template>
		</div>
		<selectHotelDialog ref="selectHotelDialog" :multiple="false"></selectHotelDialog>
		<selectPageDialog ref="selectPageDialog" :multiple="false"></selectPageDialog>
	</div>
</template>

<script>
	import {envConfig} from '@public/components/env.js'
	import setLinkText from './SetLinkText'
	import selectPageDialog from '@shop/components/select-dialog/SelectPageDialog'
	import selectHotelDialog from '@shop/components/select-dialog/SelectHotelDialog'

	export default {
		props: {
			value: {},
			popoverOptions: {
				default () {
					return null
				}
			},
			buttonAttrs: {
				default () {
					return null
				}
			},
			buttonListeners: {
				default () {
					return null
				}
			},
			updateLoad:{
				default(){
					return true
				}
			}
			
		},
		components: {
			selectHotelDialog,
			selectPageDialog,
			setLinkText
		},
		watch: {
			selectValue: {
				handler(value) {
					this.$emit('input', value)
				}
			},
			value:{
				immediate:true,
				handler(value){
					this.selectValue = this.value
					this.$emit('input',this.selectValue)
				}
			}
		},
		data() {
			return {
				selectNode: null,
				selectValue: null,
				selectValueText:'',
				cascaderAlive: true,
				showPopover: false,
				options: envConfig.pageEditor.setLinkOptions,
				optionEvent: {
					'hotelDetail': () => {
						this.$refs['selectHotelDialog'].open((row) => {
							this.selectValue = {
								route: 'hotelDetail',
								params: {
									id: row.id,
									code: row.code
								}
							}
							this.selectValueText = row.anotherName
						})
					},
					'page': () => {
						this.$refs['selectPageDialog'].open((row) => {
							this.selectValue = {
								route: 'page',
								params: {
									id: row.id
								}
							}
							this.selectValueText = row.name
						})
					}
				}
			};
		},
		created() {
		},
		methods: {
			expandNode() {
				this.$nextTick(() => {
					this.$refs.popover.updatePopper();
				})
			},
			changeNode(value) {
				var node = this.$refs['cascader'].getCheckedNodes()
				if (node && node[0]) {
					this.selectNode = node[0]
				}
				if (this.optionEvent.hasOwnProperty(this.selectNode.value)) {
					this.optionEvent[this.selectNode.value](this.selectNode)
				} else {
					this.selectValue = {
						route: this.selectNode.value,
						label: this.selectNode.label
					}
				}
				this.showPopover = false
			},
			removeLink() {
				this.selectValue = null
			}
		}
	}
</script>

<style lang="scss">
	.set-link-popper {
		padding: 0px;
	}
</style>

<style lang="scss" scoped>
	@import "@public/styles/page-editor/style.scss";
</style>