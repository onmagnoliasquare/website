// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

import GeneralObserver from './GeneralObserver.svelte';

describe('General Observer', () => {
	afterEach(() => cleanup());

	it('mounts', () => {
		const { container } = render(GeneralObserver);
		expect(container).toBeTruthy();
	});
});
