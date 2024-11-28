/**
 * Currently non-functional. See:
 * https://github.com/onmagnoliasquare/website/issues/166#issuecomment-2496564881
 */

// @vitest-environment jsdom
import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

test('ArticleBox can render all props', () => {
	render(ArticleBoxC, {
		article: {
			_type: 'article',
			_createdAt: '',
			updatedDate: '',
			title: 'Test Article',
			subtitle: 'Some kinda something',
			date: '2024-11-25',
			slug: {
				_type: 'slug',
				current: 'test-article'
			},
			category: {
				_type: 'category',
				_createdAt: '',
				name: '',
				slug: {
					_type: 'slug',
					current: 'news'
				},
				description: '',
				metaInfo: {}
			},
			tags: [],
			authors: [
				{
					_type: 'member',
					name: '',
					slug: {
						current: 'neo-alabastro',
						_type: 'slug'
					},
					metaInfo: {}
				}
			],
			metaInfo: {}
		}
	});

	expect(screen.queryByText('Test Article')).toBeInTheDocument();
});
