import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		global: 'globalThis'
	},
	resolve: {
		alias: {
			'node:crypto': 'crypto'
		}
	}
});
