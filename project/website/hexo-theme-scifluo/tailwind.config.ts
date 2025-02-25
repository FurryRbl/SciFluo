import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config as daisyuiConfig } from 'daisyui';
import type { Config as tailwindcssConfig } from 'tailwindcss';

interface Config extends tailwindcssConfig {
	daisyui: daisyuiConfig;
}

export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	content: ['./src/**/*.{js,ts,vue}', './layout/**/*.ejs', './scripts/**/*.js', '../../content/content/**/*.md'],
	plugins: [daisyui],
	theme: {
		extend: {
			colors: {
				src: {
					blue: '#87cefa',
					green: '#66ffe6',
				},
			},
			fontFamily: {
				serif: [
					'Libre Baskerville', // 英文
					'LXGW WenKai', // 简体中文
					'Noto Color Emoji', // Emoji Color
					...defaultTheme.fontFamily.serif,
				],
				jp_serif: ['Hina Mincho', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['winter'],
				},
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dim'],
				},
			},
		],
		darkTheme: 'dark',
	},
} satisfies Config;
