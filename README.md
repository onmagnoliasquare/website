# On Magnolia Square

Monorepo for the On Magnolia Square website.

## 🚧 Website Under Construction 🚧

Our current website exists at a Wordpress host on GoDaddy. We are in the process of moving to Sanity.io for the Content Management System (CMS), and SvelteKit for the frontend.

## Good Habits

Commits in this repository follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Here's a [ChatGPT chat about what they are](https://chat.openai.com/share/475c34ae-1ce2-47cd-85a9-16045a550011).

## Technical Specifications

### Yarn

Our package manager is the latest version of ```yarn```. The version is using the command [```yarn set version stable```](https://yarnpkg.com/cli/set/version#details), run in the root directory. Since this is a monorepo, yarn is also used as the project management tool.

In the ```package.json``` folder, you can find the workspaces field, which defines which folders yarn will look and install modules for.

With that being said, Vite does not yet support Yarn pnp, and therefore in the ```.yarnrc.yml``` file in the root directory, [```nodeLinker: "node-modules"```](https://yarnpkg.com/configuration/yarnrc#nodeLinker) line is appended. In the future, we may remove this in case of ghost-dependency creep, or if Vite begins support for pnp.

### VS Code

For VS Code, we recommend using the [Svelte Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
