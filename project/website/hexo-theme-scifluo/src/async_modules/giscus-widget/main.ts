import App from './app.vue';
import { createApp } from 'vue';

export default () => {
	if (document.getElementById('giscus-widget')) {
		const app = createApp(App);
		app.mount('#giscus-widget');
	}
};
