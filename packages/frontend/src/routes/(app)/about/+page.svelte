<script>
	import P from '$components/defaults/P.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import { CardLink, CodeOfEthics } from '$lib';
</script>

<PageHeader>Who are we? 我们是谁？</PageHeader>
<div class="p-4 mb-10 center w-fit">
	<div class="flex flex-col w-fit max-w-2xl mb-8">
		<P class="">
			Founded in 2014, On Magnolia Square, or OMS, is a student journalism organization maintaining
			an active archive and living record of student life at NYU Shanghai. <em
				class="font-bold font-serif">We keep time.</em
			>
			Learn about <a class="text-nyu-purple-400 hover:underline" href="/about/staff">our staff</a>.
		</P>
	</div>
	<div>
		<h2 class="text-3xl mb-4 font-display font-semibold tracking-normal">Mission Statement</h2>
		<P class="text-7xl leading-20 tracking-normal font-display font-extralight mb-8 max-w-6xl">
			On Magnolia Square produces truthful, balanced, timely, and engaging news and information to
			better serve the community at <a
				href="https://shanghai.nyu.edu"
				class="text-nyu-purple-400 hover:underline">NYU Shanghai</a
			>.
		</P>
	</div>
</div>
<div class="center w-fit mb-20">
	<CodeOfEthics />
</div>
<div class="center w-fit">
	<ul class="m-4 flex grow space-x-4">
		<li>
			<CardLink title="Staff" link="/about/staff">Learn more about our staff</CardLink>
		</li>
		<li>
			<CardLink title="Transition" link="/about/transition" bgColor="green"
				>Learn more about our transition from OCA to OMS</CardLink
			>
		</li>
	</ul>
</div>
