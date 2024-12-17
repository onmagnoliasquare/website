# Frontend

Please first become acquainted with [SvelteKit](https://svelte.dev/docs/kit/introduction). A basic understanding of SvelteKit's features and approach to rendering webpages will be assumed for the rest of this documentation. There will be language and terms used that relate to this understanding. However, if your learning style is different, feel free to jump into the deep end and learn as you go. That's how I do things.

## Developing

All frontend code exists in `packages/frontend`. In the root directory of this repository, run `yarn dev:front` to start the development server.

## Get Started

As for any codebase, it's good to start your understanding at the entry point. For the frontend, this "entry point" is the top-most `+layout.server.ts` in `src/routes/`. This is where the initial instructions of the client's view of the web page begin. The data in `+layout.server.ts` is then implicitly passed to `+layout.ts`. The code in this file runs on both client and server side. The data from `+layout.ts` is then passed to `+layout.svelte`.

```bash
# The flow of data
response -> +layout.server.ts -> +layout.ts -> +layout.svelte
```

`+layout.svelte` is the main layout for the entire website. Any HTML element defined in `+layout.svelte` propagates downward. They may be overridden in child folders, though.

## Organization and Structure

The frontend package follows typical SvelteKit file organization and hierarchy. However, our test files locations deviate somewhat from the norm. Playwright tests exist in `frontend/tests`. Meanwhile, vite tests exist in `frontend/src/tests`, and vite tests for components are colocated with the component that they test.

## Building

For local building, use `adapter-auto` instead of a specialized adapter, like `adapter-cloudflare`. If a specialized adapter is used, the build will fail.

## Common Issues

Sometimes during development or build, there may be an error where `'./$types'` is an import that cannot be found. Do not fret. In the directory of this project, type:

`yarn check`

This will run a check and take note of all files in the directory to import to. The error should go away now.

## Architecture

Every post must have a tag and a category.

A series takes precedence over a category, a category takes precedence over a tag.

A post can be labeled under a category and have a series, but it will always redirect to the `series` slug.

A post can be labeled under a category and have a tag, but it will always redirect to the `category` slug.

A post can be labeled under a category, have a tag, and have a series, but it will always redirect to the `series` slug.

A post that has a category or a series accessed from a URL using the `tag/[name]` format will redirect to the category or series slug.

## Testing

[Svelte Testing Setup](https://testing-library.com/docs/svelte-testing-library/setup)

Testing for the frontend consists of two frameworks: Vitest and Playwright. Vitest is used for unit and component testing; Playwright is used for integration, functional, and end-to-end testing.

Tests for Vitest exist in `frontend/src/index.test.ts`. Playwright tests exist in `frontend/tests`.

A dependency installed is `vitest-ui`, which lets you interact with Vitest using a UI that can be viewed in your browser. Check frontend `package.json` to view its usage.

## Useful Links

- [SvelteKit use environment variables in different directory](https://github.com/sveltejs/kit/issues/10822#issuecomment-1742971327)
