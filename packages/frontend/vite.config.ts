import { sveltekit } from '@sveltejs/kit/vite';
import { defineProject } from 'vitest/config';

// TODO Change to project
export default defineProject({
	//@ts-ignore TS-2769
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js']
	}
});
