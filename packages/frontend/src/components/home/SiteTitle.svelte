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

<div class="border-4 border-double">
  <div class="size-fit">
    <h1 id="bigText" class="font-stretch-condensed">
      {site.title}
    </h1>
  </div>
  <p
    class="mt-2 ml-2 size-fit font-display text-lg font-semibold text-neutral-700 font-stretch-condensed">
    Student journalism and writing at NYU Shanghai
  </p>
</div>
