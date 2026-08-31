<style>
/* Fluid font sizing */
/* See: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ */
/* As well as:  */
/* https://modern-fluid-typography.vercel.app/ */
#bigText {
    font-family: var(--font-display), serif;
    font-size: clamp(6.423rem, 3vw + 1.875rem, 9.612rem);
    /* line-height: clamp(4.819rem, 2.25vw + 1.4rem, 7.211rem); */
    line-height: clamp(6.423rem, 3vw + 1.875rem, 9.612rem);
    font-weight: 200;
}
</style>

<script>
import { site } from '$lib/constants'
</script>

<div class="size-fit p-4 center">
	<a href="/" class="cursor-pointer">
		<h1 id="bigText" class="font-stretch-condensed">
			{site.title}
		</h1>
	</a>
</div>
<p class="size-fit py-2 text-2xl font-display font-stretch-condensed text-neutral-700 font-semibold pt-5 center">
	Student journalism and writing at NYU Shanghai
</p>
