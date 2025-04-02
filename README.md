# On Magnolia Square

On Magnolia Square website monorepo for frontend and backend.

## Getting Started

There are two ways to setup a development environment to get started.

### Using Nix

It is highly recommended to use the Nix flake in this repository to setup the development environment. _For your convenience, there is also a `.envrc` file ready to go (but you might've noticed that already)._

Using a Nix flake requires the [`nix` package manager](https://nixos.org/download/) and experimental flakes in the nix configuration **enabled**. (If you use MacOS, the [nix determinate installer](https://zero-to-nix.com/concepts/nix-installer/) is effective)

Run this command in the repository.

```bash
nix develop
```

This will install all required development tools, like yarn, as well as `node_modules` for web dependencies.

If you don't have `direnv` install, you need to rerun the `nix develop` command every time you re-enter this repository.

### Manual Steps

Prerequisite dependencies:

- Node version >= 22.x.x
- Yarn version >= 4.7.x

`yarn` is our package manager of choice. Here is the
[yarn documentation for installing it on your system](https://yarnpkg.com/corepack#installation).

#### MacOS with `brew`

If you're using MacOS the brew package `corepack` is needed. Corepack ships with
Node, but zsh does not find this linkage in the shell. Therefore, since we are
using brew, corepack can be installed with:

`brew install corepack`

Brew may error and say that you must remove the symlink for `yarn` if you used
brew to install yarn. Do not fret, run this command:

`brew unlink yarn`

Then, rerun `brew install corepack`.

Now, run `corepack enable`. This will enable corepack globally. Optionally, one
can run `corepack install --global yarn@stable` to install the latest yarn
version globally using corepack.

#### Windows

Install `node` on Windows and enable corepack. Make sure to run powershell in administrator mode.

An error may occur when using yarn, something along the lines of `yarn.ps1 cannot be loaded`.

To fix this, input this command into the current powershell terminal session:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Linux

If you're using Linux, make sure you have the prerequisite dependencies installed.

### Setup

In the repository's root directory, run the following commands:

```bash
# Install yarn dependencies
yarn

# !! IMPORTANT !!
# Setup husky, a git hook modifier
yarn run postinstall
```

## Development

The frontend and backend directories have `.env.example` files that must be
duplicated and renamed into `.env` files. Fill in the template with appropriate,
legitimate values.

To start development for either backend or frontend, run `yarn dev:front` or
`yarn dev:back` in the root directory.

Keep in mind that for backend work, one must be logged into the OMS Sanity
account to interact with Sanity Studio.

## Good Habits

### Commits

Commits in this repository follow
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), with
some minor changes fit for our project. Here's a
[ChatGPT chat about what they are](https://chat.openai.com/share/475c34ae-1ce2-47cd-85a9-16045a550011).

When making a commit, one must specify the affected package (the scope) next to
the `type`:

- f(rontend)
- b(ackend)
-

The third type is `null`, i.e. something that is not a package specific change.
Here is an example of what this looks like:

```bash
# (b) indicates a backend commit
git commit -m "refactor(b): remove whitespace"

# (f) indicates a frontend commit
git commit -m "fix(f): Component.svelte state logic"

# null type
git commit -m "chore: bump yarn version"
```

### Code Attribution

Proper code attribution is to be followed.

### Branching

The main branch is `dev`. The production branch is `main`. The deployment
pipeline is as follows:

`dev` to `staging` then finally to `main`.

This pipeline is enforced by the `enforcer.yml` GitHub action.

Staging is a pre-release branch. This is where we test the dataset against any
new releasable changes from dev. It is not publicly viewable.

## Technical Specifications

### Yarn

Our package manager is the latest version of `yarn`. The version is using the
command
[`yarn set version stable`](https://yarnpkg.com/cli/set/version#details), which,
during version updates, is executed in the root directory. Since this is a
monorepo, yarn is also used as the project management tool.

In the `package.json` folder, you can find the workspaces field, which defines
which folders yarn will look and install modules for.

With that being said, Vite does not yet support Yarn pnp, and therefore in the
`.yarnrc.yml` file in the root directory,
[`nodeLinker: "node-modules"`](https://yarnpkg.com/configuration/yarnrc#nodeLinker)
line is appended. In the future, we may remove this in case of ghost-dependency
creep, or if Vite begins support for pnp.

#### What is `run -T (command)`?

It's used to share commands between workspaces. Since a project like `frontend`
does not have any dependencies inside (all of the dependencies are in the root
dir), we must use `run -T (command)` to access the correct command. In this
case, its either `vite` or `sanity` or any other that requires use like
`playwright`.

### VS Code

Below are VS Code extensions used in this project.

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- Sanity.io GROQ extension
- Code Spell Checker (by Street Side Software)
- Codeium
- Prettier

## Development

### Useful Commands

#### Convert `.ndjson` to `.json`

Required software: `jq`

```bash
jq --slurp '.' in.json > out.json
```

Retrieved from: <https://stackoverflow.com/questions/45456414/convert-json-lines-to-json-array-using-jq>

### Route Enforcement

To enforce categories and routes, we are using `src/params` to enforce only
certain route categories. This is an example of the
[Route Matching](https://kit.svelte.dev/docs/advanced-routing#matching) and
[Route Rest Parameters](https://kit.svelte.dev/docs/advanced-routing#rest-parameters)
of SvelteKit.

### Page Server Loading

[Load Server Page for Sanity](https://kit.svelte.dev/docs/load#page-data)

## Deployment

CI requires unit tests and perhaps integration tests if you could secure a
development key. This comes with managing the secret on GitHub, though.

The frontend is deployed to Cloudflare pages. The backend is deployed via the Sanity CLI deploy command. The frontend requires the environment variables to be injected at build time in order to build and deploy successfully. These can be accessed in either Cloudflare page's or Vercel's appropriate deploy configuration settings. Make sure all of the .env.example fields are used in the deployment environment.

## Useful Links

### Build

- [Yarn workspace tutorial and cheatsheet](https://www.chandankumar.com/blog/yarn-workspace-tutorial)
- [Using yarn workspaces to create a monorepo](https://medium.com/tribalscale/using-yarn-workspaces-to-create-a-monorepo-33203152d0c6)

### Testing

- [SvelteKit testing with Vitest](https://www.tejusparikh.com/2023/sveltekit-testing-with-vitest.html)
- [Vite Testing Data Driven Tests Parameterization](https://www.the-koi.com/projects/parameterized-data-driven-tests-in-vitest-example/)

### GitHub Actions

- [Filter Pattern Cheat Sheet](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#patterns-to-match-branches-and-tags)
- [Vitest Coverage](https://vitest.dev/guide/coverage)
- [Vitest Workspace](https://vitest.dev/guide/workspace.html#workspace)
- [Add formatting and styles to JS console log](https://levelup.gitconnected.com/add-styles-and-formatting-to-your-console-log-messages-in-javascript-5f14819b1c5d)
- [Vitest - Vitest hangs tests, close timed out after 1000ms](https://github.com/vitest-dev/vitest/issues/2008)

### GitHub

- [Git Merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge)

#### Actions

- [act - Local GitHub action runner](https://nektosact.com/usage/index.html)
- [Prevent File Change](https://github.com/marketplace/actions/prevent-file-change)
- [Auto Assign](https://github.com/marketplace/actions/auto-assign-action)
- [Require Labels](https://github.com/marketplace/actions/require-labels)
- [Google Sheet](https://github.com/marketplace/actions/gsheet-action)
- [Building a CI/CD environment with eslint and prettier](https://t-i-show.medium.com/build-a-ci-cd-environment-with-github-actions-eslint-prettier-ee725c5fe2ab)
- [Integrating and Enforcing ESLint and Prettier with Husky](https://silvenon.com/blog/integrating-and-enforcing-prettier-and-eslint)

### Sanity

- [Sanity and Algolia](https://www.sanity.io/technology-partners/algolia)
- [Pagination with Groq](https://www.sanity.io/docs/paginating-with-groq)

### Troubleshooting

#### Vitest

**--no-threads command not found**

- [It was converted to --pool forks --poolOptions.forks.singleFork](https://vitest.dev/guide/migration.html#pools-are-standardized-4172)

### Design

- [Magnolia in Shanghai](https://wapbaike.baidu.com/tashuo/browse/content?id=24921b1a0cbe87e07289d90b)
- [Social Icons SVGs](https://github.com/gauravghongde/social-icons)

### Prettier

- [Prettier prose-wrap](https://prettier.io/docs/en/options.html)
- [Markdown callout for GitHub Prettier](https://github.com/prettier/prettier/issues/15479)
