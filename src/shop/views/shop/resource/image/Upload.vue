<template>
	<uploadImageForm class="dialog-form"
		@save="(files)=>$emit('save',files)" @cancel="$emit('cancel')"></uploadImageForm>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import resourceApi from '@shop/api/resource'
	import resourceCategoryApi from '@shop/api/resourceCategory'
	import uploadImageForm from '@shop/components/UploadImageForm'
	
	export default {
		components:{
			uploadImageForm
		},
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
