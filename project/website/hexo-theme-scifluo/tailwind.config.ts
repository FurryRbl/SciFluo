import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config as daisyuiConfig } from 'daisyui';
import type { Config as tailwindcssConfig } from 'tailwindcss';

interface Config extends tailwindcssConfig {
	daisyui: daisyuiConfig;
}

export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	content: ['./src/**/*.{js,vue}', './layout/**/*.ejs', './scripts/**/*.js', '../../content/content/**/*.md'],
	plugins: [daisyui],
	theme: {
		extend: {
			colors: {
				src: {
					blue: '#87cefa',
					green: '#66ffe6',
					purple: '#7b68ee',
					yellow: '#ffff74',
				},
			},
			fontFamily: {
				serif: [
					'Ysabeau Variable',
					'Noto Color Emoji',
					'LXGW WenKai',
					'Hina Mincho',
					...defaultTheme.fontFamily.serif,
				],
			},
		},
	},
	daisyui: {
		logs: false,
		themes: ['light', 'dark'],
		darkTheme: 'dark',
	},
} satisfies Config;
