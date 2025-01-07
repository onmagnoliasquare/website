<script lang="ts">
	import { dateFormatter } from '$lib/helpers';
	import { baseText } from '$lib/variables';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		locale?: string;
		date: string;
		class?: string;
	}

	let { locale = 'en-US', date, class: classList }: Props = $props();
</script>

<p id="stroked" class={twMerge(baseText, classList)}>
	<time datetime={date}>{dateFormatter(date, locale)}</time>
</p>

<style>
	#stroked {
		-webkit-text-stroke: 1px rgb(11, 10, 10);
		color: white;
		text-shadow:
			1.5px 1.5px 0 #000,
			-0.5px -0.5px 0 #000,
			0.5px -0.5px 0 #000,
			-0.5px 0.5px 0 #000,
			0.5px 0.5px 0 #000;
	}
</style>
