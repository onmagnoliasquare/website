<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<li class="lh-copy f5 f4-l tracked-02 fw4 pa0 mt0 mb3 tl">{@render children?.()}</li>
