<!-- 地图定位 -->
<template>
	<div class="map-position">
		<div class="top">
			<el-form class="form" @submit.native.prevent :inline="true" size="small">
				<el-form-item>
					<el-input v-model="form.position" placeholder="可输入具体地址进行定位"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :disabled="!form.position" type="primary" @click="convert">定位</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div id="map" :style="{height:height}"></div>
		<div v-if="defaultLatLng" class="bottom">
			<div>
				<span v-if="!defaultLatLng">请点击地图位置拾取坐标</span><span v-else>拾取坐标：{{this.defaultLatLng.lat}},{{this.defaultLatLng.lng}}</span>
			</div>
			<div>
				<el-button v-if="defaultLatLng" class="span_left" type="success" @click="change">确认选择</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import txMap from '../js/tencentMap'

	export default {
		props: {
			position:{},
			height: {}
		},
		watch: {},
		created() {
			txMap.init().then((TMap) => {
				
				if(this.position){
					var position = this.position.split(",")
					var lat = position[0]
					var lng = position[1]
					try{
						this.defaultLatLng = new TMap.LatLng(lat, lng)
					}catch(e){console.log(e)}
				}
					
				// 新建一个正逆地址解析类
				this.geocoder = new TMap.service.Geocoder()
				
				this.tMap = new TMap.Map("map", {
					zoom: 15, 
					viewMode: "2D"
				});
				
				
				this.markers = new TMap.MultiMarker({
				  map: this.tMap,
				  geometries: [],
				})
				
				if(this.defaultLatLng){
					//地图居中显示
					this.tMap.setCenter(this.defaultLatLng)
					//默认标记
					this.markers.updateGeometries([
						this.createGeometrie()
					])
				}
				//绑定点击事件
				this.tMap.on("click", (evt) => {
					this.defaultLatLng = new TMap.LatLng(evt.latLng.getLat().toFixed(6), evt.latLng.getLng().toFixed(6))
					// 将得到的坐标位置用点标记标注在地图上
					this.markers.updateGeometries([
						this.createGeometrie()
					])
				})
				
			})
		},
		beforeDestroy() {
			this.tMap.destroy()
		},
		data() {
			return {
				tMap: null,
				markers:null,
				geocoder: null,
				defaultLatLng:null,
				form: {
					position: ''
				}
			};
		},
		mounted() {},
		methods: {
			createGeometrie(){
				return {
				  id: 'main',
				  position: this.defaultLatLng, 
				}
			},
			convert() {
				this.geocoder.getLocation({
						address: this.form.position
					})
					.then((result) => {
						this.tMap.setCenter(result.result.location);
						console.log(result.result.location.toString())
					});
			},
			change(){
				this.$emit('change',this.defaultLatLng?{
					lat:this.defaultLatLng.lat,
					lng:this.defaultLatLng.lng
				}:null)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map-position{
		position: relative;
	}
	
	.top {
		z-index: 9999999;
		left:20px;
		top:20px;
		width: 600px;
		position: absolute;
	}
	
	.bottom{
		box-shadow: $--box-shadow-light;
		width: 60%;
		position: absolute;
		height:60px;
		bottom: 30px;
		z-index: 9999999;
		left: 50%;  
		transform: translate(-50%, 0%);
		border-radius: $--border-radius-small;
		backdrop-filter: blur(2px); 
		background-color: rgba($--color-white, 0.85);
		display: flex;
		align-items: center;
		justify-content:  space-between;
		padding: 0px 20px;
	}
	
	
</style>
