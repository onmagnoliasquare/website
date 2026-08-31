# Updates

## Update Checklists

### Nix Flake

For general maintenance updates that are not major version jumps for Node:

```bash
nix flake update
```

Ensure that:

- The root `package.json` has the `engine` updated to reflect the new minor/patch version of Node.
- The root `package.json` package manager reflects any updates to `yarn`.
- Ratchet CLI is pinned to latest version in the overlay.

### GitHub Actions

- Use `ratchet` to **update** actions and workflows files, **NOT** upgrade.

### Yarn dependencies

- Use `yarn upgrade-interactive` to update `package.json` dependencies. Ensure to re-lint and re-test files, as changes in dependencies may cause a build failure, especially major version bumps.

### Major Node versions

Should Node be updated to the next major version:

- Use `ratchet` **upgrade** on GitHub actions files. Some GitHub actions may use `node`, especially the `actions/setup-node/action.yml` file.
- Update the entry for `node` in the Nix flake. For instance, changing the version from `node_26` to `node_27`.
- Update the root `package.json`'s `engine` to reflect the new version of node.
