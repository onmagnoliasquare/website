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
    let
      overlay = final: prev: {
        ratchet = prev.stdenv.mkDerivation rec {
          pname = "ratchet";
          version = "0.11.4";

          src = prev.fetchurl (
            if prev.stdenv.isDarwin then
              {
                url = "https://github.com/sethvargo/ratchet/releases/download/v${version}/ratchet_${version}_darwin_arm64.tar.gz";
                hash = "";
              }
            else
              {
                url = "https://github.com/sethvargo/ratchet/releases/download/v${version}/ratchet_${version}_linux_amd64.tar.gz";
                hash = "sha256-cUEjbFUA3ORAu3ZKlkydnYEwo6QhYEx1t/f7qlXPifU=";
              }
          );

          nativeBuildInputs = [ prev.installShellFiles ];

          sourceRoot = ".";

          installPhase = ''
            runHook preInstall
            install -Dm755 ratchet $out/bin/ratchet
            runHook postInstall
          '';

          meta = with prev.lib; {
            description = "A tool for securing CI/CD workflows with version pinning.";
            homepage = "https://github.com/sethvargo/ratchet";
            license = licenses.asl20;
            maintainers = [ ];
            platforms = platforms.darwin ++ platforms.linux;
          };
        };
      };
    in
    {
      overlays.default = overlay;
    }
    // flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
          overlays = [ overlay ];
        };

        commonPackages = with pkgs; [
          # Development related
          # Node version matches that on the CI runners.
          pkgs.ratchet
          nodejs_24
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
