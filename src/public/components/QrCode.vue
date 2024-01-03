<!-- 二维码展示 -->
<template>
	<div class="qrcode">
		<div v-if="$slots['title']" class="title">
			<slot name="title"></slot>
		</div>
		<div class="qrcode-img">
			<div v-loading="loading" class="img">
				<img v-if="src" v-img-src="src"/>
				<template v-if="!src && url">
					<canvas id="QRCodeCanvas"></canvas>
				</template>
			</div>
			<div v-if="$slots['operate']" class="operate">
				<slot name="operate"></slot>
			</div>
		</div>
		<div v-if="$slots['desc']" class="desc">
			<slot name="desc"></slot>
		</div>
	</div>
</template>

<script>
	import QRCode from 'qrcode';

	export default {
		props: {
			src: {},
			url: {},
			loading:false,
			//传入checkApi则会轮训调用该api检查扫码结果
			checkApi:{},
			//远程加载二维码地址
			loadApi:{}
		},
		data() {
			return {
				checkTime : 3*1000,
				clearAutoCheckResult:false
			}
		},
		watch: {
			url: {
				immediate: true,
				handler: function(value) {
					this.renderQrCode(value)
				}
			}
		},
		mounted() {},
		beforeDestroy(){
			this.clearAutoCheckResult = true
		},
		methods: {
			//轮询检查扫码结果
			autoCheckResult(){
				if(this.clearAutoCheckResult)
					return
				this.$request.load(this.checkApi({
					success: (response) => {
						if(response.data.success){
							this.$emit('scan-success')
						}else{
							setTimeout(()=>{
								this.autoCheckResult()
							},this.checkTime)
						}
					}
				}))
			},
			renderQrCode(url){
				if(!url)
					return
				let opts = {
					errorCorrectionLevel: "H", //容错级别
					type: "image/png", //生成的二维码类型
					margin: 0, //二维码留白边距
					width: 200, //宽
					height: 200, //高
				}
				this.$nextTick(()=>{
					let QRCodeCanvas = document.getElementById("QRCodeCanvas");
					QRCode.toCanvas(QRCodeCanvas, url, opts)
				})
				if(this.checkApi)
					setTimeout(()=>{
						this.autoCheckResult()
					},this.checkTime)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qrcode-img {
		padding: 20px 0px;
		text-align: center;

		.img {
			width: 200px;
			height: 200px;
			margin: auto;

			img {
				width: 100%;
				height: 100%;
			}

			#QRCodeCanvas {
				width: 100%;
				height: 100%;
			}
		}
	}

	.title {
		color: $--color-text-primary;
		text-align: center;
	}
	
	.operate{
		margin-top: 8px;
		text-align: center;
	}

	.desc {
		display: block;
		text-align: center;
		color: $--color-text-secondary;
	}
</style>
