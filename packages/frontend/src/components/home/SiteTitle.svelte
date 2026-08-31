<style>
/* Fluid font sizing */
/* See: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ */
/* As well as:  */
/* https://modern-fluid-typography.vercel.app/ */
#bigText {
    font-family: var(--font-display), serif;
    font-size: clamp(2.423rem, 3vw + 1.875rem, 6.612rem);
    /* line-height: clamp(4.819rem, 2.25vw + 1.4rem, 7.211rem); */
    line-height: clamp(2.423rem, 3vw + 1.875rem, 6.612rem);
    font-weight: 200;
}
</style>

<script>
import { site } from '$lib/constants'
</script>

<div class="border-double border-4">
	<div class="size-fit">
		<h1 id="bigText" class="font-stretch-condensed">
			{site.title}
		</h1>
	</div>
	<p class="size-fit mt-2 text-lg font-display font-stretch-condensed text-neutral-700 font-semibold ml-2">
		Student journalism and writing at NYU Shanghai
	</p>
</div>
