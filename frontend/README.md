# Frontend

## Developing

Run `yarn dev` in this directory to start a development server.

## Building

To create a production version of your app:

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Common Issues

Sometimes during development or build, there may be an error where './$types' is an import that cannot be found. Do not fret. In the directory of this project, type:

`yarn check`

This will run a check and take note of all files in the directory to import to. The error should go away now.

## Architecture

Every post must have a tag and a category.

A series takes precedence over a category, a category takes precedence over a tag.

A post can be labeled under a category and have a series, but it will always redirect to the `series` slug.

A post can be labeled under a category and have a tag, but it will always redirect to the `category` slug.

A post can be labeled under a category, have a tag, and have a series, but it will always redirect to the `series` slug.

A post that has a category or a series accessed from a URL using the `tag/[name]` format will redirect to the category or series slug. *this will need to be added soon!*

## Testing

[Svelte Testing Setup](https://testing-library.com/docs/svelte-testing-library/setup/#jest)

### Frontend

Testing for the frontend consists of two frameworks: Vitest and Playwright. Vitest is used for unit testing, Playwright is used for end to end tests.

Tests for Vitest exist in `frontend/src/index.test.ts`. Playwright tests exist in `frontend/tests`.

A dependency installed is `vitest-ui`, which lets you view tests running in browser. Check frontend `package.json` to view its usage.
