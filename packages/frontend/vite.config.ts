import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineProject } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineProject({
	//@ts-ignore ts(2741)
	plugins: [tailwindcss(), sveltekit(), svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'node',
		setupFiles: ['./vitest-setup.js'],
		restoreMocks: true,
		pool: 'forks',
		isolate: false,
		poolOptions: {
			forks: {
				singleFork: true
			}
		},
		server: {
			deps: {
				inline: [`@sveltejs/kit`]
			}
		}
	}
});
