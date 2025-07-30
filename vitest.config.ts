import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'happy-dom',
		setupFiles: ['./src/lib/test-setup.ts'],
		globals: true
	},
	define: {
		'import.meta.vitest': undefined
	}
});