<!-- 轮播图组件 -->
<template>
	<div class="com-carousel" :class="{tdcard:comAttrs.style.type=='tdcard',
	'enable-shadow':comAttrs.style.shadow == 'shadow',
	'border-round':comAttrs.style.radius == 'round'}" 
	:style="{
		'padding-left':comAttrs.style.padding.left+'px',
		'padding-right':comAttrs.style.padding.right+'px',
		'padding-top':comAttrs.style.padding.top+'px',
		'padding-bottom':comAttrs.style.padding.bottom+'px',
		'height':comAttrs.style.height+'px'
	}">
		<el-empty v-if="!comAttrs.imgs || comAttrs.imgs.length<=0" class="com-content-empty" description="点击设置图片"></el-empty>
		<swiper v-else-if="swiperAlive" ref="mySwiper" :pagination="true" :options="getSwiperOptions">
			<swiper-slide v-for='(item, index) in comAttrs.imgs' :key='item.id'>
				<div class="img-ad-wrap">
					<img v-img-src="{url:item.src,thumbnail:'750'}"/>
					<div v-if="item.desc" class="desc">{{item.desc}}</div>
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination" :style="{display:comAttrs.style.paginationPosition=='hide'?'none':'block','bottom':comAttrs.style.paginationPositionY+'px'}"></div>
		</swiper>
	</div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { throttle } from 'lodash';
import 'swiper/css/swiper.css';
import baseCom from './BaseCom'

export default {
	mixins: [baseCom],
	components: {
		Swiper,
		SwiperSlide
	},
	computed: {
		getSwiperOptions(){
			var options = {
				slidesPerView:this.comAttrs.style.type=='tdcard'?1.3:1,
				spaceBetween:this.comAttrs.style.type=='tdcard'?-15:0,
				centeredSlides:this.comAttrs.style.type=='tdcard'?true:false,
				slideToClickedSlide:true,
				autoplay: true,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable :true
				}
			}
			return options
		}
	},
	watch:{
		'comAttrs.style.type': {
			deep:true,
			handler(value) {
				this.render()
			}
		}
	},
	methods: {
		render(){
			this.swiperAlive = false
			this.$nextTick(()=>{
				this.swiperAlive = true
			})
		},
		getDefaultComAttrs() {
			return {
				style:{
					type:'default',
					height:300,
					paginationPosition:'show',
					paginationPositionX:"0",
					paginationPositionY:"10",
					radius:'default',
					shadow:'none',
					padding: {
						left: '0',
						right: '0',
						linkX:true,
						top: '0',
						bottom: '0',
						linkY:true,
					}
				},
				imgs:[]
			}
		}
	},
	data() {
		return {
			swiperAlive:true
		};
	},
};
</script>


<style lang="scss" scoped>
	@import "@public/styles/page-editor/var.scss";
	
	.com-carousel{
		
		.swiper-container{
			width: 100%;
			height:100%;
		}
		
		&.enable-shadow .swiper-container{	
			box-shadow: $com-imgShadow;
		}
		
		&.border-round{
			.swiper-container{
				border-radius: $com-imgRound;
			}
		}
		
		.img-ad-wrap,img{
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		
		&.tdcard.border-round{
			.img-ad-wrap{
				border-radius: $com-imgRound;
			}
		}
		
		&.tdcard{
			$paddingY:14px;
			
			&.enable-shadow{
				.swiper-container{
					box-shadow:none;
					.img-ad-wrap {
						box-shadow: $com-imgShadow;
					}
				}
			}
			
			.swiper-container{
				padding:$paddingY 0px;
				
				.swiper-pagination-bullets{
					padding-bottom:$paddingY;
				}
			}
			
			.swiper-slide {
				height: 95%;
				text-align: center;
				font-size: $--font-size-large;
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
				transition: transform .3s cubic-bezier(.645,.045,.355,1);
				transform: scale(0.8);
			}
			.swiper-slide-active,
			.swiper-slide-duplicate-active {
				transform: scale(1);
			}
		}
	}
	
	::v-deep .swiper-pagination{
		
		.swiper-pagination-bullet{
			opacity:unset;
			background-color: rgba($--color-white,.25);
		}
		.swiper-pagination-bullet-active{
			background-color: $--color-white;
		}
	}
</style>