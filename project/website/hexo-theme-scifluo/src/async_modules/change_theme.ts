export type Theme = 'light' | 'dark';

export default () => {
	// 获取切换主题按钮
	const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;

	// 获取并应用当前保存的主题
	const currentTheme = getTheme();
	themeToggle.checked = currentTheme === 'dark';
	applyTheme(currentTheme);

	themeToggle.addEventListener('change', () => {
		const newTheme = themeToggle.checked ? 'dark' : 'light';
		applyTheme(newTheme);
	});
};

export const getTheme = (): Theme => {
	return (
		(localStorage.getItem('theme') as Theme) ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	);
};

const applyTheme = (theme: Theme) => {
	// 更新本地存储
	localStorage.setItem('theme', theme);

	// 切换页面主题
	document.documentElement.setAttribute('data-theme', theme);

	// 派发主题变化事件
	window.dispatchEvent(
		new CustomEvent('theme-change', {
			detail: theme,
			bubbles: true, // 确保事件能够冒泡
		}),
	);
};
