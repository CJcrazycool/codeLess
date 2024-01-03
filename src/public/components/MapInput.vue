<!-- 地图选择 -->
<template>
	<div class="map-input">
		<el-input v-model="inputValue" v-bind="$attrs" v-on="$listeners">
			<template slot="prepend">地图坐标</template>
			<div class="link select" slot="suffix" @click="mapVisible=true"><i class="el-icon-location el-input__icon icon"></i>选择坐标</div>
		</el-input>
		<el-dialog top="10vh" :append-to-body="true" title="选择坐标" :visible.sync="mapVisible" width="60%" 
			@open="mapAlive=true" @closed="mapAlive=false">
			<mapPosition v-if="mapAlive" :position="inputValue" height="60vh" @change="changePosition"></mapPosition>
		</el-dialog>
	</div>
</template>

<script>
	import mapPosition from './MapPosition'
	
	export default {
		components:{
			mapPosition
		},
		props: {
			value:{}
		},
		watch: {
			value:function (value){
				this.inputValue = value
			},
			inputValue:function (value){
				this.$emit('input',value)
			}
		},
		created() {},
		data() {
			return {
				inputValue:this.value,
				mapVisible:false,
				mapAlive:false
			};
		},
		mounted() {
		},
		methods: {
			changePosition(position){
				this.mapVisible = false
				this.inputValue = position.lat +','+position.lng
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	::v-deep .el-input__inner{
		padding-right: 100px !important;
	}
	
	.select {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 10px;

		.icon {
			font-size: 18px;
		}
	}
</style>
