'use strict';

var hexo = hexo || {};

// 首页
hexo.extend.generator.register('home', () => {
	return {
		path: 'index.html',
		data: {},
		layout: 'pages/index',
	};
});

// 百科首页
hexo.extend.generator.register('wiki', () => {
	return {
		path: 'wiki/index.html',
		data: {
			title: '百科',
		},
		layout: 'pages/wiki/index',
	};
});

// 地图
hexo.extend.generator.register('map', () => {
	return {
		path: 'map/index.html',
		data: {
			title: '地图',
		},
		layout: 'pages/vue',
	};
});

// 设置
hexo.extend.generator.register('settings', () => {
	return {
		path: 'settings/index.html',
		data: {
			title: '设置',
		},
		layout: 'pages/vue',
	};
});

// 404
hexo.extend.generator.register('404', () => {
	return {
		path: '404.html',
		data: {
			title: '找不到页面',
		},
		layout: 'pages/404',
	};
});
