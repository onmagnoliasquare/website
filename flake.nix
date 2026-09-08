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
        # To retrieve the hash of the packages, use:
        # nix store prefetch-file --hash-type sha256 --json <github_artifact_url>
        ratchet = prev.stdenv.mkDerivation rec {
          pname = "ratchet";
          version = "0.12.0";

          src = prev.fetchurl (
            if prev.stdenv.hostPlatform.isDarwin then
              {
                url = "https://github.com/sethvargo/ratchet/releases/download/v${version}/ratchet_${version}_darwin_arm64.tar.gz";
                hash = "sha256-VCiJ2WzdfwhDFK1a3Hu+EKxCtW0GaLlxQ2Hl46jz+Zo=";
              }
            else
              {
                url = "https://github.com/sethvargo/ratchet/releases/download/v${version}/ratchet_${version}_linux_amd64.tar.gz";
                hash = "sha256-4fsCbZPYQCDMQ1TdP9xmf24D8E0BftzEor3fx4we+1Y=";
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
          pkgs.ratchet
          nodejs_26
          yarn-berry
          typescript
          typescript-language-server
          nixfmt
          nixd
          prettierd
          nil
          svelte-language-server

          # Data tools.
          imagemagick # manipulate images.
          jq # manipulate JSON.
          yq # manipulate YML.
        ];
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = pkgs.lib.flatten [ commonPackages ];
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
