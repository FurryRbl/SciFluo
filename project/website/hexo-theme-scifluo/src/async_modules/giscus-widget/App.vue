<template>
	<Giscus
		repo="FurryRbl/SciFluo-Discussions"
		repoId="R_kgDOL3ss4w"
		category="Giscus"
		categoryId="DIC_kwDOL3ss484CfKye"
		mapping="pathname"
		strict="0"
		reactionsEnabled="1"
		emitMetadata="0"
		inputPosition="top"
		:theme="theme"
		lang="zh-CN" />
</template>

<script lang="ts">
import Giscus from '@giscus/vue';
import { getTheme, Theme as ThemeType } from '../change_theme';

const getThemeGiscus = (theme: string): ThemeType => {
	return theme === 'dark' ? 'transparent_dark' : 'light';
};

export default {
	name: 'GiscusWidget',
	components: {
		Giscus: Giscus,
	},
	data() {
		return {
			theme: getThemeGiscus(getTheme()),
		};
	},
	mounted() {
		window.addEventListener('theme-change', event => {
			const customEvent = event as CustomEvent;
			this.theme = getThemeGiscus(customEvent.detail.theme);
		});
	},
};
</script>
