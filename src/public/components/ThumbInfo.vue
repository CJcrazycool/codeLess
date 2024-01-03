<template>
	<div class="thumb-info">
		<div class="thumb-box" :class="{circle:circle}">
			<div v-if="!imageUrl && showEmpty" class="empty">?</div>
			<template v-if="imageUrl">
				<a v-if="preview" :href="getImageResourceUrl(imageUrl)" target="_blank"><img v-img-src="{url:imageUrl,thumbnail:'100'}" :style="{'object-fit':imgFit}"/></a>
				<img v-else v-img-src="{url:imageUrl,thumbnail:'100'}" :style="{'object-fit':imgFit}"/>
			</template>
		</div>
		<div class="text-content">
			<div class="thumb-title">
				<slot name="title"></slot>
			</div>
			<div class="thumb-desc">
				<slot name="desc"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	import {getImageResourceUrl} from '@public/js/util'
	
	export default {
		props:{
			showEmpty:{
				default(){
					return true
				}
			},
			preview:{
				default(){
					return false
				}
			},
			imageUrl:'',
			circle:{
				default(){
					return false
				}
			},
			imgFit:{
				default(){
					return 'contain'
				}
			}
		},
		components: {},
		data() {
			return {}
		},
		computed: {},
		created() {},
		methods: {
			getImageResourceUrl
		}
	}
</script>

<style lang="scss" scoped>
	.thumb-info{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.empty,.thumb-box img{
		width: 45px;
		height: 45px;
		box-shadow: $--box-shadow-base;
		object-fit: contain;
		background-color: $--background-color-base;
	}
	
	.thumb-box{
		border-radius:$--border-radius-base;
		overflow: hidden;
		
		&.circle{
			border-radius: 50%;
		}
	}
	
	.text-content{
		flex:1;
	}
	
	
	.empty{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: $--background-color-base;
		font-size: $--font-size-base;
		text-align: center;
		color: $--color-text-placeholder;
	}
	
	.thumb-box{
		margin-right: 8px;
		border:1px $--border-color-lighter solid;
		box-sizing: border-box;
		img{
			display: block;
		}
	}
	
	.thumb-title{
		padding: 0px;
		margin-right:4px;
	}
	
	.thumb-desc{
		font-size: $--font-size-extra-small;
		color: $--color-text-secondary;
	}
</style>
