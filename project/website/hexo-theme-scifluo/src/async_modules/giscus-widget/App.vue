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
		lang="zh-CN"
		loading="lazy" />
</template>

<script lang="ts">
import Giscus from '@giscus/vue';
import { getTheme } from '../change_theme';

export default {
	name: 'GiscusWidget',
	components: {
		Giscus: Giscus,
	},
	data() {
		return {
			theme: getTheme(),
		};
	},
	mounted() {
		window.addEventListener('theme-change', event => {
			const customEvent = event as CustomEvent;
			this.theme = customEvent.detail;
		});
	},
};
</script>
