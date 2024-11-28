import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// TODO Change to project
export default defineConfig({
	//@ts-ignore ts(2741)
	plugins: [sveltekit()],
	//@ts-ignore ts(2769)
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'node',
		setupFiles: ['./vitest-setup.js'],
		restoreMocks: true,
		pool: 'forks',
		isolate: false,
		fileParallelism: false,
		threads: false,
		poolOptions: {
			forks: {
				singleFork: true
			}
		},
		coverage: {
			enabled: false
		},
		reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose'],
		resolve: process.env.VITEST
			? {
					conditions: ['browser']
				}
			: undefined
	}
});
