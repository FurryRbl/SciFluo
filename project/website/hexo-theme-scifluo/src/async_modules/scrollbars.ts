import { getTheme } from './change_theme';
import { OverlayScrollbars } from 'overlayscrollbars';

export default () => {
	// 初始化OverlayScrollbars
	const BodyOverlayScrollbars = OverlayScrollbars(document.body, {
		scrollbars: {
			theme: getTheme() === 'dark' ? 'os-theme-light' : 'os-theme-dark',
		},
	});

	// 监听主题切换事件
	window.addEventListener('theme-change', event => {
		const customEvent = event as CustomEvent;
		BodyOverlayScrollbars.options(
			{
				scrollbars: {
					theme: customEvent.detail === 'dark' ? 'os-theme-light' : 'os-theme-dark',
				},
			},
			true,
		);
	});
};
