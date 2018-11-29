const pathlib=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry:{ //main是默认入口,也可以是多入口
            main:'./src/main.js'
        },
        //出口
        output:{
            filename:'./build.js', //指定js文件
            path: pathlib.join(__dirname,'dist')          //最好是绝对路径
            //代表当前目录的上一级的dist
        },
	  devtool: 'eval-source-map',
	  
	  devServer: {
	    contentBase: "./dist",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	  },
	  module:{
	  	rules:[
		    {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
		  	{//解析vue
		        test:/\.vue$/,
		        loader:'vue-loader'//vue-template-compiler是代码上的依赖
		  	},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					}, {
						loader: "css-loader"
					},{
						loader: "postcss-loader"
					}
				]
			}
	  	]
	  },
	   plugins: [
	   new VueLoaderPlugin(),
	    //插件的执行顺序是依次执行的
		new htmlWebpackPlugin({
			template:'./src/index.html',
		})
		//将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
	   ]
    }
