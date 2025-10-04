<!--
@component
Labels the semantic version and commit SHA. Runtime environment shows relevant
information.
-->

<script lang="ts">
import { version as commitSha } from '$app/environment'

const development = import.meta.env.DEV || import.meta.env.MODE === 'development'
const staging = import.meta.env.MODE === 'staging'
const production = import.meta.env.MODE === 'production' || import.meta.env.PROD

// eslint-disable-next-line no-undef
const semver = __ONMAGNOLIASQUARE_FRONTEND_VERSION__
const sha = commitSha.slice(0, 12)
</script>

<div id="site-version" class="font-mono text-sm">
  <!-- Order matters here. -->
  {#if staging}
    <a href={`https://github.com/onmagnoliasquare/website/tree/staging`} target="_blank">
      <span>staging@{sha}</span>
    </a>
  {:else if production}
    <a href={`https://github.com/onmagnoliasquare/website/releases/tag/v${semver}`} target="_blank">
      <span>v{semver}</span>
    </a>
  {:else if development}
    <a href={`https://github.com/onmagnoliasquare/website`} target="_blank">dev@HEAD</a>
  {:else}
    Invalid environment
  {/if}
</div>
