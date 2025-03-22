import type Hexo from 'hexo';

declare global {
	const hexo: Hexo;
}

declare module '@fancyapps/ui/dist/fancybox/l10n/zh_CN.esm.js' {
	export const zh_CN: Record<string, string>;
}
