<script lang="ts">
	export let tagName;
</script>

<div class="dib">
	{#if tagName == 'on century avenue'}
		<div class="bg-purple br-pill pa0 pa1-ns ph2">
			<p class="f7 f6-ns ma0 pa0 pb1 pb0-ns tracked-02 fw6 ph1-ns">
				# {tagName}
			</p>
		</div>
	{:else}
		<div class="bg-green br-pill pa0 pa1-ns ph2">
			<p class="f7 f6-ns ma0 pa0 pb1 pb0-ns tracked-02 fw6 ph1-ns">
				# {tagName}
			</p>
		</div>
	{/if}
</div>

<style>
	p {
		color: var(--white);
	}
</style>
