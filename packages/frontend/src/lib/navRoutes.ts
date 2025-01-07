interface route {
	path: string;
	name: string;
}

const routes: route[] = [
	{ path: '/category/news', name: 'News' },
	{ path: '/category/opinion', name: 'Opinion' },
	{ path: '/category/people', name: 'People' },
	{ path: '/category/culture', name: 'Culture' },
	// { path: '/category/professors', name: 'Professors' },
	{ path: '/category/multimedia', name: 'Multimedia' },
	{ path: '/series', name: 'Series' },
	{ path: '/archive', name: 'Archive' },
	{ path: '/about', name: 'About' }
];

const footerRoutes: route[] = [{ path: '/about/staff', name: 'Staff' }];

export { routes, footerRoutes };
export type { route };
