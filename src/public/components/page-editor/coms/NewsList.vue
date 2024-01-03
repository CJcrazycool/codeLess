<!-- 文章列表组件 -->
<template>
	<div class="com-news-list" v-if="rows && rows.length>0" :class="{'enable-shadow':comAttrs.style.shadow=='shadow',
		'title-weight':comAttrs.style.titleWeight,'title-bg':comAttrs.style.titleBg,
		'enable-radio-1':comAttrs.style.radius=='round','enable-radio-2':comAttrs.style.radius=='mini'}" :style="{
				'padding-left':comAttrs.style.padding.left+'px',
				'padding-right':comAttrs.style.padding.right+'px',
				'padding-top':comAttrs.style.padding.top+'px',
				'padding-bottom':comAttrs.style.padding.bottom+'px'}">
		<div v-for="row in rows" class="news-item" :key="row.id" :style="{'margin-bottom':comAttrs.style.marginBottom+'px'}">
			<div class="img">
				<img v-img-src="{url:row.image,thumbnail:'750'}">
			</div>
			<div class="title">{{row.title}}</div>
		</div>
	</div>
</template>

<script>
	import baseCom from './BaseCom'
	import newsApi from '@shop/api/news'
	import {
		debounce
	} from 'lodash';
	
	export default {
		mixins: [baseCom],
		data() {
			return {
				rows:[]
			};
		},
		watch:{
		},
		created(){
			this.loadData()
			this.$on('reloadData',debounce(this.loadData,1000))
		},
		methods: {
			loadData:function() {
				this.$request.load(newsApi.pageList({
					data:{
						pageNo:1,
						pageSize:this.comAttrs.data.size,
						groupId:this.comAttrs.data.from=='group' && this.comAttrs.data.groupId?this.comAttrs.data.groupId:null,
						state:true
					},
					showErrorMessage:false,
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.rows = response.data.result.records
					}
				}))
			},
			getDefaultComAttrs() {
				return {
					data:{
						from:'all',
						size:10,
						groupId:null
					},
					style:{
						radius:'mini',
						shadow:'none',
						marginBottom:15,
						titleWeight:true,
						titleBg:true,
						padding: {
							left: '15',
							right: '15',
							linkX:true,
							top: '15',
							bottom: '15',
							linkY:true,
						}
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@public/styles/page-editor/var.scss";
	
	.enable-shadow .news-item{
		box-shadow: $com-newsList-shadow;
	}
	
	.enable-radio-1 .news-item{
		border-radius: $com-newsList-round;
		.img img{
			border-radius: $com-newsList-round;
		}
	}
	
	.enable-radio-2 .news-item{
		border-radius: $com-newsList-round-mini;
		.img img{
			border-radius: $com-newsList-round-mini;
		}
	}
	
	.title-weight .title{
		font-weight: $font-weight-large;
	}
	
	.title-bg {
		.title{
			background-color: $--color-white;
			padding-left: 10px;
			padding-right: 10px;
		}
		
		.img img{
			border-radius:0px !important;
		}
	}
	
	.news-item{
		overflow: hidden;
		margin-bottom: 12px;
		
		&:last-child{
			margin-bottom: 0px !important;
		}
	}
	
	.img{
		img{
			width: 100%;
			height: 150px;
			object-fit: cover;
			display: block;
		}
	}
	
	.title{
		font-size: 14px;
		padding-top: 8px;
		padding-bottom: 8px;
	}
</style>
