import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'sanity';

// TODO Change to project
export default defineConfig({
	//@ts-ignore ts(2741)
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js']
	}
});
