import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...pluginVue.configs['flat/recommended'],
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			// ESLint 内置规则
			eqeqeq: ['error', 'always'],

			// Prettier 插件规则
			'prettier/prettier': ['off', 'always'],

			// Vue 插件规则
			'vue/attribute-hyphenation': ['error', 'ignore'],
		},
		ignores: ['node_modules', '/build', '/project/website/hexo-theme-scifluo/source'],
	},
];
