<script>
	import P from '$components/defaults/P.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import { CardLink, CodeOfEthics } from '$lib';
</script>

<div class="m-2 p-2">
	<span class="font-serif italic sm:text-xl tracking-tight select-none">A question...</span>
	<PageHeader>Who are we?</PageHeader>
	<div class="p-4 mb-4 center w-fit">
		<div class="flex flex-col w-fit max-w-2xl mb-16">
			<P>
				Founded in 2014, On Magnolia Square, or OMS, is a student journalism organization
				maintaining an active archive and living record of student life at NYU Shanghai. <em
					class="font-bold font-serif">We keep time.</em
				>
				Learn about
				<a class="text-nyu-purple-400 hover:underline" href="/about/staff">our staff</a>.
			</P>
		</div>
		<div>
			<section>
				<h2 class="text-2xl sm:text-3xl mb-8 font-display font-semibold tracking-normal">
					✑ Mission Statement
				</h2>
				<div class="">
					<span class="font-display font-stretch-condensed">
						<P
							class="text-4xl sm:text-6xl lg:text-7xl leading-10 sm:leading-16 lg:leading-20 tracking-normal mb-8 max-w-6xl"
						>
							On Magnolia Square produces truthful, balanced, timely, and engaging news and
							information to better serve the community at <a
								href="https://shanghai.nyu.edu"
								class="text-nyu-purple-400 hover:underline">NYU Shanghai</a
							>.
						</P>
					</span>
				</div>
			</section>
		</div>
	</div>
	<CodeOfEthics />
	<div class="center w-full">
		<ul class="m-4 flex flex-wrap space-x-4 align-center items-start">
			<li>
				<CardLink title="Staff" link="/about/staff">Learn more about our staff</CardLink>
			</li>
			<!-- <li>
				<CardLink title="Transition" link="/about/transition" bgColor="green"
					>Learn more about our transition from OCA to OMS</CardLink
				>
			</li> -->
		</ul>
	</div>
</div>
