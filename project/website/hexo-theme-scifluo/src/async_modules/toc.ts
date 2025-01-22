import toc from '../js/toc.js';
import { getTheme } from './change_theme';
import { OverlayScrollbars } from 'overlayscrollbars';

export default () => {
	if (!document.getElementById('toc-root')) {
		return;
	}

	toc();
	const TocOverlayScrollbars = OverlayScrollbars(document.querySelector('#toc-root') as HTMLElement, {
		scrollbars: {
			theme: getTheme() === 'dark' ? 'os-theme-light' : 'os-theme-dark',
		},
	});
	// 监听主题切换事件
	window.addEventListener('theme-change', event => {
		const customEvent = event as CustomEvent;
		TocOverlayScrollbars.options(
			{
				scrollbars: {
					theme: customEvent.detail === 'dark' ? 'os-theme-light' : 'os-theme-dark',
				},
			},
			true,
		);
	});
};
