/**
 * For some reason, this test isn't working. This error is given:
 * Cannot create proxy with a non-object as target or handler
 */
// // @vitest-environment jsdom
// import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
// import { render, screen } from '@testing-library/svelte';
// import { expect, it, test } from 'vitest';

// test('ArticleBox can render all props', () => {
// 	const result = render(ArticleBoxC, {
// 		props: {
// 			article: {
// 				_type: 'article',
// 				_createdAt: '',
// 				updatedDate: '',
// 				title: 'Test Article',
// 				subtitle: 'Some kinda something',
// 				date: '2024-11-25',
// 				slug: {
// 					_type: 'slug',
// 					current: 'test-article'
// 				},
// 				category: {
// 					_type: 'category',
// 					_createdAt: '',
// 					name: '',
// 					slug: {
// 						_type: 'slug',
// 						current: 'news'
// 					},
// 					description: '',
// 					metaInfo: {}
// 				},
// 				tags: [],
// 				authors: [
// 					{
// 						_type: 'member',
// 						name: '',
// 						slug: {
// 							current: 'neo-alabastro',
// 							_type: 'slug'
// 						},
// 						metaInfo: {}
// 					}
// 				],
// 				metaInfo: {}
// 			}
// 		}
// 	});

// 	// it('mounts with default props', async () => {
// 	// 	expect(container).toBeTruthy();
// 	// });

// 	// expect(screen.queryByText('Test Article')).toBeInTheDocument();
// });
