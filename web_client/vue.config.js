module.exports = {
	publicPath: './',
	/* 修改html标题 */
	chainWebpack: config => {
		config.plugin('html')
			.tap(args => {
				console.log(args);
				args[0].title = "CloudNote - 云笔记";
				return args;
			})
	},
	
	devServer: {
		port: 8008
	}
}