import pangu from 'pangu';
import './styles/main.less';
import '@fontsource/lxgw-wenkai';
import '@fontsource/hina-mincho';
import utils from './js/utils.js';
import vuePages from './vue/main';
import toc from './async_modules/toc';
import '@fontsource/noto-color-emoji';
import 'vue3-toastify/dist/index.css';
import '@fontsource-variable/ysabeau';
import LazyLoad from 'vanilla-lazyload';
import { Fancybox } from '@fancyapps/ui';
import Config from './js/utils/config.js';
import 'overlayscrollbars/overlayscrollbars.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Scrollbars from './async_modules/scrollbars';
import GiscusWidget from './async_modules/giscus-widget/main';
import compatibilityCheck from './async_modules/compatibilityCheck';
import changeTheme from './async_modules/change_theme';
import { zh_CN as Fancybox_zh_CN } from '@fancyapps/ui/dist/fancybox/l10n/zh_CN.esm.js';

Promise.all([
	changeTheme(), // 界面主题
	toc(), // 目录
	vuePages(), // Vue 页面
	Scrollbars(), // 自定义滚动条
	GiscusWidget(), // Giscus 评论系统
	compatibilityCheck(), // 兼容性检查
	new Promise<void>((resolve, reject) => {
		// 初始化 Wiki 和 Book 页面
		if (utils.isURL('/wiki/*') || utils.isURL('/book/*')) {
			if (Config.fast['settings.toc.scroll_change_url.enable']()) {
				pangu.spacingElementById('wiki-content');
			}

			// 初始化 Vanilla LazyLoad
			let lazyLoadInstance = new LazyLoad({});
			lazyLoadInstance.update();

			// 初始化 Fancybox
			Fancybox.bind('[data-fancybox]', {
				l10n: Fancybox_zh_CN,
				contentClick: 'toggleCover',
				Images: {
					Panzoom: {
						panMode: 'mousemove',
						mouseMoveFactor: 1.1,
						mouseMoveFriction: 0.12,
					},
				},
				Toolbar: {
					display: {
						left: ['infobar'],
						middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW', 'flipX', 'flipY'],
						right: ['thumbs', 'close'],
					},
				},
			});
		}
		resolve();
	}),
]);