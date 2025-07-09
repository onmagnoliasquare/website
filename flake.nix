# modified from https://github.com/akirak/flake-templates/blob/master/node-typescript/flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };

        commonPackages = with pkgs; [
          # Development related
          # Node version matches that on the CI runners.
          nodejs_22
          yarn-berry
          typescript
          typescript-language-server
          nixfmt-rfc-style
          nixd
          prettierd
          typescript-language-server
          nil
          svelte-language-server

          # Data tools.
          imagemagick # manipulate images.
          jq # manipulate JSON.
          yq # manipulate YML.

          # System tools
          htop
          mprocs
        ];
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [ commonPackages ];
          shellHook = ''
            # Initialize yarn
            yarn

            # Customize the prompt to show we're in a Nix environment
            export PS1='$(printf "\033[01;34m(nix) \033[00m\033[01;32m[%s] \033[01;33m(node $(node -v))\033[00m$\033[00m " "\W")'
          '';
        };
      }
    );
}
