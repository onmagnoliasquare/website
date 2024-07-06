# Actions

This discusses the actions section of the repository.

## Commands

What the hell is

```shell
grep 'packageManager' package.json | awk -F: '{gsub(/[", ]/, "", $2); print $2}' | xargs -I {} echo "YARN_VERSION="{} >> "$GITHUB_ENV"
```

Using the linux command line programs `grep` and `awk`, it retrieves the yarn version from the `package.json` file in the root directory. It then exports it to the environment variable `$GITHUB_ENV`
