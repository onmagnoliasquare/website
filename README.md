# On Magnolia Square

Monorepo for the On Magnolia Square website.

## 🚧 Website Under Construction 🚧

Our current website exists at a Wordpress host on GoDaddy. We are in the process of moving to Sanity.io for the Content Management System (CMS), and SvelteKit for the frontend.

## Setup

Please first have __yarn__ installed on your computer first before starting development.

### MacOS

If you're using MacOS the brew package ```corepack``` is needed. Corepack ships with Node, but zsh does not find this linkage in the shell. Therefore, since we are using brew, corepack can be installed with:

```brew install corepack```

Brew may error and say that you must remove the symlink for ```yarn``` if you used brew to install yarn. Do not fret, run this command:

```brew unlink yarn```

Then, rerun ```brew install corepack```.

Now, run ```corepack enable```. This will enable corepack globally. Optionally, one can run ```corepack install --global yarn@stable``` to install the latest yarn version globally using corepack.

To set the yarn version in the frontend directory, first ```cd frontend``` then ```corepack use yarn@v```, where ```v``` is the version you want to set. In this project, we are using stable, so the command would be ```corepack use yarn@stable```.

## Development

In the root directory on this repository, run ```yarn```. This will install all necessary files.

To start development for either backend or frontend, run ```yarn dev``` in their respective directories.

Keep in mind that for backend work, one must be signed into the OMS Sanity account to interact with Sanity Studio.

## Good Habits

### Commits

Commits in this repository follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Here's a [ChatGPT chat about what they are](https://chat.openai.com/share/475c34ae-1ce2-47cd-85a9-16045a550011).

### Code Attribution

Proper code attribution is to be followed.

### Branching

The main branch is `dev`. The production branch is `main`. The deployment pipeline is as follows:

`dev` to `staging` then finally to `main`.

Staging is a pre-release branch. This is where we test the dataset against any new releasable changes from dev.

This pipeline is enforced by the GitHub actions labeled `enforcer-`.

## Technical Specifications

### Yarn

Our package manager is the latest version of ```yarn```. The version is using the command [```yarn set version stable```](https://yarnpkg.com/cli/set/version#details), run in the root directory. Since this is a monorepo, yarn is also used as the project management tool.

In the ```package.json``` folder, you can find the workspaces field, which defines which folders yarn will look and install modules for.

With that being said, Vite does not yet support Yarn pnp, and therefore in the ```.yarnrc.yml``` file in the root directory, [```nodeLinker: "node-modules"```](https://yarnpkg.com/configuration/yarnrc#nodeLinker) line is appended. In the future, we may remove this in case of ghost-dependency creep, or if Vite begins support for pnp.

### VS Code

Below are VS Code extensions used in this project.

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- Sanity.io GROQ extension
- Code Spell Checker (by Street Side Software)
- Codeium
- Prettier

---

## Development

### Route Enforcement

To enforce categories and routes, we are using ```src/params``` to enforce only certain route categories. This is an example of the [Route Matching](https://kit.svelte.dev/docs/advanced-routing#matching) and [Route Rest Parameters](https://kit.svelte.dev/docs/advanced-routing#rest-parameters) of SvelteKit.

### Page Server Loading

[Load Server Page for Sanity](https://kit.svelte.dev/docs/load#page-data)
