// @vitest-environment jsdom

import SpotifyEmbed from './SpotifyEmbed.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('Spotify', () => {
	afterEach(cleanup);

	it('mounts with default props', async () => {
		const { container } = render(SpotifyEmbed);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const spotifyPath = 'playlist/37i9dQZF1E4ZoJ6VjC6TJL';
		const { getByTestId } = render(SpotifyEmbed, {
			spotifyPath,
			disable_observer: true
		});
		const iframe = getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotifyPath}`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(SpotifyEmbed, {
			spotifyPath: 'album/0yL5CjKtIVrWtLZnFJHfjz',
			height: '300px',
			width: '80%',
			disable_observer: true
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.style.height).toBe('300px');
		expect(iframe?.style.width).toBe('80%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(SpotifyEmbed, {
			spotifyPath: 'artist/2ye2Wgw4gimLv2eAKyk1NB',
			disable_observer: false
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});
