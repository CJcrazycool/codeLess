'use strict'
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	//Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
	//zhengkai.blog.csdn.net
	runtimeCompiler: true,
	lintOnSave: false,
	publicPath:'./',
	transpileDependencies: [
	    'uview-ui'
	],
	configureWebpack: {
	    resolve: {
	      alias: {
			'@public': resolve('src/public'),
			'@shop': resolve('src/shop'),
			'@admin': resolve('src/admin')
	      }
	    }
	  },
	 css: {
	 	loaderOptions: {
	 		sass: {
	 			data: `@import "@public/styles/global-var";`,
	 		}
	 	}
	 },
	pages: {
	    shop: {
	      //商户后台入口
	      entry: 'src/shop/main.js',
		  template:'public/shop.html'
	    },
		admin: {
		  //运营后台入口
		  entry: 'src/admin/main.js',
		  template:'public/admin.html'
		}
	}
}
