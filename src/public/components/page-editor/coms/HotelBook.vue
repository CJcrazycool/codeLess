<!-- 客房预订组件 -->
<template>
	<div class="com-hotelbook" :class="{
		'enable-shadow':comAttrs.style.shadow=='shadow',
		'enable-radio-1':comAttrs.style.radius=='round',
		'enable-button-radio-1':comAttrs.style.buttonRadius=='mini',
		'enable-button-radio-2':comAttrs.style.buttonRadius=='round',
		'hide-type':comAttrs.type.length<=1
		}" :style="{
			'padding-left':comAttrs.style.padding.left+'px',
			'padding-right':comAttrs.style.padding.right+'px',
			'padding-top':comAttrs.style.padding.top+'px',
			'padding-bottom':comAttrs.style.padding.bottom+'px',
			'margin-top':'-'+comAttrs.style.overHeight+'px'
		}">
		<div class="book-card">
			<div class="book-card-wrap">
				<div class="box">
					<svg class="svg-image-left" :class="[tabIdx == 2 ? 'svg-image-right' : '']" width="100%"
						height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8 0C3.58172 0 0 3.61798 0 8.08098V56H351V55.5568H268.5H198.868C191.354 55.5568 184.852 50.3274 183.241 42.9877L176.583 12.6629C174.959 5.26488 168.465 0 160.963 0H8Z"
							:fill="tabSvgColor" />
					</svg>
					<div class="info">
						<div class="left flex flex-center" :class="[tabIdx == 1 ? 'act' : '']" @click="tab1">
							全天房
						</div>
						<div class="right flex flex-center" :class="[tabIdx == 2 ? 'act' : '']" @click="tab2">
							钟点房
						</div>
					</div>
				</div>
				<div class="search-box flex-column" :style="{ backgroundColor: tabSvgColor }">
					<!-- <div v-if="method=='appoint'" class="search-appoint search-item flex">
						<div class="appoint">
							<span class="appoint-label">酒店名称</span><span class="appoint-name">{{appointHotel?appointHotel.anotherName:''}}</span>
						</div>
					</div> -->
					<div v-if="method == 'search'" class="search-site search-item flex">
						<div>
							<div class="site flex">
								<span>{{ selectCity }}</span>
								<img src="@public/assets/img/page-editor/jt.png" alt="" />
							</div>
						</div>
						<div class="search-name">
							<input placeholder="搜索酒店名称" v-model="name" />
						</div>
						<div class="search-positon flex-column flex-center">
							<img src="@public/assets/img/page-editor/positon.png" alt="" />
							<p>当前位置</p>
						</div>
					</div>
					<div v-show="comAttrs.type[0] == 'day'" class="search-date search-item flex flex-sb">
						<div class="date flex-column">
							<span class="date-top">今天入住</span>
							<span class="day" :style="{color:themeColor}">9月13日</span>
						</div>
						<div class="num flex flex-center"
							:style="{color:secondaryColor,'border-color':secondaryColor}">共1晚
						</div>
						<div class="date flex-column">
							<span class="date-top">明天离店</span>
							<span class="day" :style="{color:themeColor}">9月13日</span>
						</div>
					</div>
					<div v-show="comAttrs.type[0] == 'hour'" class="search-date zd-room search-item flex flex-sb">
						<div class="date date-start flex-column">
							<span class="date-top">今天入住</span>
							<span class="day" :style="{color:themeColor}">9月13日</span>
						</div>
						<div class="date date-end flex-column">
							<span class="date-top" :style="{color:themeColor}">到点离店</span>
						</div>
					</div>
					<div class="search-btn flex flex-center" :style="{background:themeColor,
						color:comAttrs.style.buttonColor}">{{method=='appoint'?'预订酒店':'查询酒店'}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseCom from './BaseCom'
	import {envConfig} from '@public/components/env'
	import {mapState} from 'vuex'

	export default {
		mixins: [baseCom],
		data: function() {
			return {
				appointHotel:null,
				style: {},
				name: "",
				selectCity: "全部",
				cityArr: ["全部"],
				tabSvgColor: "#fff",
				tabIdx: 1,
			};
		},
		computed: {
			...mapState('public',['componentsEnvConfig']),
			themeColor(){
				return this.componentsEnvConfig.pageEditor.theme.colorPrimary?this.componentsEnvConfig.pageEditor.theme.colorPrimary:null
			},
			secondaryColor(){
				return this.componentsEnvConfig.pageEditor.theme.colorSecondary?this.componentsEnvConfig.pageEditor.theme.colorSecondary:null
			},
			method(){
				return this.comAttrs.method
			}
		},
		created(){
			this.$on('updateAppointHotel',(data)=>{
				this.appointHotel = data
			})
		},
		destroyed(){
			this.$off('updateAppointHotel')
		},
		methods: {
			tab1() {
				this.tabIdx = 1;
			},
			tab2() {
				this.tabIdx = 2;
			},
			getDefaultComAttrs() {
				return {
					type: ['day', 'hour'],
					method:'search',
					appointHotel:null,
					style: {
						// themeColor: '#02388b',
						buttonColor: '#FFFFFF',
						radius: 'default',
						buttonRadius: 'default',
						shadow: 'none',
						overHeight: 0,
						padding: {
							left: '15',
							right: '15',
							linkX: true,
							top: '15',
							bottom: '15',
							linkY: true
						}
					}
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@public/styles/page-editor/var.scss";
	
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	
	.search-appoint{
		
		.appoint{
			line-height: 33px;
			width: 100%;
			overflow: hidden;
			white-space: nowrap; 
			text-overflow: ellipsis; 
		}
		
		.appoint-label{
			margin-right: 14px;
			font-size: 10px;
			color:#999999;
		}
		
		.appoint-name{
			font-size: 18px;
			font-weight: 700;
		}
	}
		

	.com-hotelbook {

		&.enable-shadow {
			.book-card-wrap {
				border-radius: 10px;
				box-shadow: $com-hotelBook-shadow;

			}
		}

		&.enable-radio-1 {
			.book-card {
				border-radius: $com-hotelBook-round;
			}

			.search-box {
				border-radius: 0px 0px $com-hotelBook-round $com-hotelBook-round;
			}

			&.hide-type {
				.search-box {
					border-radius: $com-hotelBook-round;
				}
			}
		}

		&.enable-button-radio-1 {
			.search-btn {
				border-radius: $com-hotelBook-button-mini;
			}
		}

		&.enable-button-radio-2 {
			.search-btn {
				border-radius: $com-hotelBook-button-round;
			}
		}

		&.hide-type {
			.box {
				display: none;
			}
			
			.book-card{
				padding-top: 0px;
			}

			.search-box {
				padding: 16px;
			}
		}

	}

	.book-card {
		position: relative;
		z-index: 99;
		padding-top: 10px;
	}

	.box {
		height: 47px;
		font-size: 18px;
		font-weight: 700;
		color: #fff;
		width: 100%;
		position: relative;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		background: rgba(218, 223, 230, 0.7);
		backdrop-filter: blur(8px);
		// -webkit-filter: blur(5px);  /* 兼容webkit内核浏览器，如Safari */
		// filter: blur(5px);

	}

	.box .svg-image-left {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
	}

	.box .svg-image-right {
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 1;
	}

	.box .leftbg {
		width: 55%;
		height: 0;
		border-bottom: 56px solid #fff;
		border-left: 0px solid transparent;
		border-right: 20px solid transparent;
		border-radius: 0 36px 0 0;
		border-top-left-radius: 8px;
		// transform: rotateX(180deg);
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
	}

	.box .rightbg {
		width: 55%;
		height: 0;
		// border-bottom: 47px solid #0068f0;
		border-left: 50px solid transparent;
		border-right: 0 solid transparent;
		border-radius: 66px 0 0 16px;
		transform: rotateX(180deg);
		border-top-right-radius: 8px;
		position: absolute;
		top: 0;
		right: 0;
	}

	.box .info {
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 1;
		position: relative;
	}

	.box .left,
	.box .right {
		color: #333;
		height: 100%;
		position: relative;
		width: 50%;
		font-weight: 400;

		&.act {
			font-weight: 700;
		}
	}

	.search-box {
		width: 100%;
		padding: 16px;
		padding-top: 0;
		position: relative;
		// transform: translateY(-1px);
		z-index: 2;

		.search-site {
			align-items: center;
			font-size: 18px;
			font-weight: 700;
		}

		.search-item {
			padding: 16px 0;
			//   height: 56px;
			border-bottom: 1px solid #ebebeb;

			.site {
				width: 100%;
				align-items: center;
				justify-content: space-between;
				font-size: 18px;
				font-weight: 700;
				color: #333333;

				span {
					margin-right: 8px;
				}

				img {
					vertical-align: middle;
				}
			}

			.search-name {
				margin-left: 8px;
				flex: 1;
				font-size: 18px;
				color: #333333;
				height: 25px;
				border-left: 1px solid #ebebeb;
				padding-left: 8px;

				input {
					border: 0 none;
					background: transparent;
					width: 100%;
					height: 25px;
					display: block;
					padding: 0;

					&::placeholder {
						color: #cccccc;
						font-size: 16px;
						line-height: 25px;
						display: flex;
						align-items: center;
					}
				}
			}

			.search-positon {
				img {
					width: 20px;
					height: 20px;
				}

				p {
					font-size: 12px;
					font-weight: 400;
					color: #666666;
				}
			}
		}

		.search-date {
			position: relative;

			&.zd-room {

				// .date-start .date-top{
				//   margin-left: 8px;
				// }
				.date-end .date-top {
					font-size: 16px;
					color: #333;
				}
			}

			.date {
				.date-top {
					font-size: 10px;
					line-height: 16px;
					color: #999999;
					margin-bottom: 4px;
				}

				.day {
					font-size: 16px;
					line-height: 16px;
					font-weight: 700;
					color: #02388b;
				}
			}

			.num {
				padding: 0 10px;
				border: 1px solid #02388b;
				height: 24px;
				font-size: 14px;
				color: #02388b;
				border-radius: 24px;
			}
		}

		.search-btn {
			margin-top: 24px;
			width: 100%;
			height: 44px;
			line-height: 44px;
			background: #02388b;
			font-size: 18px;
			color: #ffffff;
			margin-bottom: 16px;
		}
	}
</style>