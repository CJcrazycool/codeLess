<!-- 设置热区按钮 -->
<template>
	<div class="set-img-hot-area-button">
		<div class="body-wrap">
			<template v-if="hotAreas && hotAreas.length>0">
				<el-button class="action result-content" v-bind="buttonAttrs" v-on="buttonListeners" @click="setImgHotArea">已选{{hotAreas.length}}个热区</el-button>
				<el-button class="remove btn-text-info" @click="removeImgHotArea" icon="el-icon-close" type="text"></el-button>
			</template>
			<el-button v-else v-bind="buttonAttrs" v-on="buttonListeners" @click="setImgHotArea"><slot></slot></el-button>
		</div>
		<setImgHotAreaDialog ref="setImgHotArea"></setImgHotAreaDialog>
	</div>
</template>

<script>
	import setImgHotAreaDialog from './SetImgHotAreaDialog'
	
	export default {
		props:{
			value:{},
			buttonAttrs:{
				default () {
					return null
				}
			},
			buttonListeners:{
				default () {
					return null
				}
			},
			src: {
				default () {
					return null
				}
			},
		},
		components: {
			setImgHotAreaDialog	
		},
		computed: {
		},
		watch:{
			value:{
				immediate:true,
				handler(value){
					if(this.value){
						this.hotAreas = this.value
						this.$emit('input',this.hotAreas)
					}
				}
			}
		},
		created(){
			
		},
		data() {
			return {
				hotAreas:[],
				imgHotAreaEditAlive:false
			};
		},
		methods: {
			setImgHotArea(){
				this.$refs['setImgHotArea'].load(this.src,this.hotAreas,(hotAreas)=>{
					this.hotAreas = hotAreas
					this.$emit('input',this.hotAreas)
				})
			},
			removeImgHotArea(){
				this.hotAreas = []
				this.$emit('input',this.hotAreas)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@public/styles/page-editor/style.scss";
</style>
