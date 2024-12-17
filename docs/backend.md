# Backend

The backend is built using Sanity CMS. Sanity CMS provides their own framework for the backend that can be used to bootstrap a new project. Check out [this link about the CLI tool](https://www.sanity.io/docs/cli) for more information.

## Getting Started

The backend is self-explanatory if you follow the Sanity documentation. Here are a few points though that may help you understand why certain things are the way they are.

### `.tsx` files

Some files use `.tsx` instead of just `.ts`. This is because Sanity lets us use react to embed more functionality and styling into their default schema objects.

## Troubleshooting

### Structure tool crashed

Have you...

- Added the new schema type to `index.ts` in schemaTypes?
