<script lang="ts">
	const ethicsText = [
		'Ethical journalism should be accurate, fair, and balanced.',
		'All journalists conduct themselves with integrity.',
		'Journalists should be honest and orderly in gathering, reporting, and interpreting	information.',
		'Journalists will not attempt to create unnecessary panic or confusion through their articles.',
		'All journalists treat their sources and colleagues with professionalism and courtesy.',
		'The highest and primary obligation of ethical journalism is to serve the community at NYU Shanghai',
		'All journalists take responsibility for their work and attach their names to their writing completely.',
		"All opinions published reflect the journalist's opinions and not those of the OMS publication.",
		"Non-English articles are translated to the best of our ability, and we strive to maintain the original language's meaning and intent.",
		'We do not tolerate plagiarism and any writer caught plagiarizing will be immediately removed from the staff.',
		'We do not accept anonymous sources and attribution. All attribution must include full names of sources.'
	];
</script>

<div class="m-4 w-4xl border-1 p-6">
	<section>
		<h2 class="text-3xl font-serif font-semibold mb-2 p-2">Code of Ethics</h2>
		<ol class="list-decimal list-inside">
			{#each ethicsText as text}
				<li class="p-2 tracking-wide text-lg">
					{text}
				</li>
			{/each}
		</ol>
	</section>
</div>
