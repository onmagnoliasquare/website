<script>
	import { CardLink, CodeOfEthics } from '$lib';
</script>

<div class="mw9 center mt4">
	<h1 class="ma0 tc f-4 f-5-l fw5 tracked-tight-4">About</h1>
	<div class="flex justify-center items-center">
		<div class="mv2 mv4-l">
			<p class="serif f4 fw4 tracked-tight-1 measure pa0 lh-title">
				On Magnolia Square, or OMS, is a student journalism organization maintaining an active
				archive and living record of student life at NYU Shanghai. We keep time.
			</p>
		</div>
	</div>
	<!-- <div class="grid1">
		<div class="div1 flex justify-center"></div>
		<div class="div2"></div>
	</div> -->
	<section class="mw9 center flex flex-column mt2 mt4-l">
		<div class="flex flex-wrap items-left justify-center mb4">
			<div class="mw6 pa2">
				<h2 class="f2 f1-l ma0 pa0 fw6 tracked-tight-2">Mission Statement</h2>
				<p class="serif fw3 i f3 f2-l lh-title">
					On Magnolia Square produces truthful, balanced, timely, and engaging news and information
					to better serve the community at NYU Shanghai.
				</p>
			</div>
			<CodeOfEthics />
		</div>
		<div class="flex flex-wrap items-center justify-around">
			<CardLink title="Staff" link="/about/staff">Learn more about our staff</CardLink>
			<CardLink title="Transition" link="/about/transition" bgColor="green"
				>Learn more about our transition from OCA to OMS</CardLink
			>
		</div>
	</section>
</div>

<style>
	/* .grid1 {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 1fr;
		column-gap: 0px;
		row-gap: 0px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 3;
	} */
</style>
