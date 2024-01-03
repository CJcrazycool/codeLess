<!-- 图片素材选择器 -->
<template>
	<div class="image-zone-selector">
		<uploadImageList ref="imageList" :value="imageList" :limit="!multiple?1:limit"
			@change="updateInput" @upload="selectImage" :after-create-image="afterCreateImage">
			<template v-if="$scopedSlots.default" v-slot:default="scope">
				<slot name="default" :item="scope.item"></slot>
			</template>
		</uploadImageList>
		<imageZoneDialog ref="imageZone" :multiple="multiple" :limit="limit-imageList.length"></imageZoneDialog>
		<div v-if="tip" class="form-item-tip">{{tip}}</div>
	</div>
</template>

<script>
	import uploadImageList from './UploadImageList'
	import uploadFormatter from './UploadFormatter'
	import imageZoneDialog from './select-dialog/ImageZoneDialog'

	export default {
		mixins:[uploadFormatter],
		props: {
			tip:{},
			afterCreateImage:{},
			inputSetter:{},
			value:{},
			multiple:{
				default:()=>{
					return true
				}
			},
			limit:{}
		},
		components: {
			imageZoneDialog,
			uploadImageList
		},
		watch: {
			value:{
				immediate:true,
				handler(value){
					if(this.isUpdatingValue){
						this.isUpdatingValue = false
					}else{
						this.updateImageList(value)
					}
				}
			}
		},
		data() {
			return {
				imageList: [],
				isUpdatingValue:false
			};
		},
		created() {
		},
		methods: {
			updateImageList(value){
				if(!value)
					return
				var value = this.parseValue(value)
				if(!this.multiple && value && typeof(value)=='string')
					value = [value]
				if (value) {
					var imageList = []
					value.forEach((url) => {
						if(typeof(url)=='string'){
							imageList.push({
								url
							})
						}else{
							imageList.push(url)
						}
					})
					this.imageList = imageList
				}
			},
			selectImage(){
				this.$refs['imageZone'].open(this.selectImageDone)
			},
			selectImageDone(images) {
				images = !this.multiple?[images]:images
				images.forEach((url)=>{
					 this.$refs.imageList.add({
					 	url
					 })
				})
			},
			updateInput(images){
				this.imageList = images
				var inputValue = images.map((item) => {
					return this.inputSetter?this.inputSetter(item):item.url
				})
				if(inputValue.length<=0)
					inputValue = ''
				else if (!this.multiple)
					inputValue = inputValue[0]
				this.isUpdatingValue = true
				this.$emit('input', this.encodeValue(inputValue))
				this.$emit('update:image-list', inputValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
