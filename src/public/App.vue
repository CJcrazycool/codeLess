<template>
	<div id="app" v-loading="pageLoading==1">
		<template v-if="pageLoading == 2">
			<!-- 页面加载成功就显示页面内容 -->
			<router-view v-if="!pageError" :key="appViewKey"></router-view>
			<!-- 加载失败，或者无权操作则显示错误页面 -->
			<error v-else :code="pageError"></error>
		</template>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapState} from 'vuex';
	import dataDict from './js/dataDict'
	import error from './views/Error'

	export default {
		components:{
			error
		},
		name: 'app',
		data() {
			return {
			}
		},
		computed: {
			...mapState('public',['appViewKey','pageError','pageLoading'])
		},
		watch: {},
		created() {
			//刷新router-view窗口
			Vue.prototype.$reloadView = () => {
				this.$store.commit('public/updateAppViewKey')
			}
			//窗体大小改变的时候触发全局事件
			window.onresize = () => {
				this.$eventBus.$emit('windowResize')
			}
		},
		mounted() {},
		methods: {
		}
	}
</script>

<style>
</style>
