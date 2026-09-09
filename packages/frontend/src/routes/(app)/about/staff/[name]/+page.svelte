<script lang="ts">
import Location from '$components/authorPage/Location.svelte'
import P from '$components/defaults/P.svelte'
import ContactIcons from '$components/general/ContactIcons.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import Image from '$components/Image.svelte'
import { dateFormatter, domainFromUrl } from '$lib/helpers'
import { filler } from '$lib/constants'
import type { PageProps } from './$types'

let { data }: PageProps = $props()

let member = $derived(data.member)
let handles = $derived(data.member.handles)
let articles = $derived(data.articles)
</script>

<header class="mb-4 w-full pb-4">
  <h1
    class="font-display text-4xl font-black tracking-tight font-stretch-condensed select-none sm:p-1 md:text-6xl lg:text-8xl">
    {member.name}
  </h1>
</header>
<div class="center mt-2 flex grid-flow-row flex-col gap-4 pt-2 md:grid md:grid-cols-7">
  <div class="top-3 col-span-2 h-fit p-1 md:sticky">
    <header>
      {#if member.portrait && member.portrait}
        <div class="p-0 sm:p-2">
          {#if member.portrait.asset}
            <Image
              media={member.portrait}
              width={250}
              height={250}
              fit={'crop'}
              quality={80}
              loading="eager"
              blurHash={member.portrait.asset.metadata?.blurHash}
              alt={`${member.name}'s portrait image`}
              class={`center mb-4 max-w-2xl md:h-full md:w-full`} />
          {/if}
        </div>
      {/if}
      <div class="tracking-wide sm:p-1">
        <h1 class="mb-2 font-display text-2xl tracking-tight italic">
          {member.name}
        </h1>
        <div class="border-t border-dotted p-1">
          <div class="mt-2 mb-4 w-full pb-4">
            <P class="text-md sm:text-md">
              {#if member.bio}
                {member.bio.trim()}
              {:else}
                {member.name.trim()} {filler.memberDescription}.
              {/if}
            </P>
          </div>
          {#if member.committee}
            <div class="mb-8">
              <div class="mb2">
                <P class="text-md sm:text-md text-gray-600">{member.committee.name} committee</P>
              </div>
            </div>
          {/if}
          {#if member.from}
            <div class="mb-8">
              <Location location={member.from} locale={data.userLocale} />
            </div>
          {/if}
          {#if handles}
            <div class="">
              <ul class="list w-fit opacity-50" id="contactList">
                {#if handles.linkedin}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/linkedin.svg"
                      title={member.name}
                      link={`https://linkedin.com/in/${handles.linkedin}`}
                      alt="Visit Contributor's LinkedIn" />
                  </li>
                {/if}
                {#if handles.instagram}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/instagram.svg"
                      title={handles.instagram}
                      link={`https://instagram.com/${handles.instagram}`}
                      alt="Visit Contributor's Instagram" />
                  </li>
                {/if}
                {#if handles.twitter}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/twitter.svg"
                      title={handles.twitter}
                      link={`https://twitter.com/${handles.twitter}`}
                      alt="Visit Contributor's Twitter" />
                  </li>
                {/if}
                {#if handles.facebook}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/facebook.svg"
                      title={handles.facebook}
                      link={`https://facebook.com/${handles.facebook}`}
                      alt="Visit Contributor's Facebook" />
                  </li>
                {/if}
                {#if handles.github}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/github.svg"
                      title={handles.github}
                      link={`https://github.com/${handles.github}`}
                      alt="Visit Contributor's GitHub" />
                  </li>
                {/if}
                {#if handles.website}
                  <li class="mb-1">
                    <ContactIcons
                      icon="/icons/www.svg"
                      title={domainFromUrl(handles.website)}
                      link={handles.website}
                      alt="Visit Contributor's Website" />
                  </li>
                {/if}
              </ul>
            </div>
          {/if}
        </div>
      </div>
    </header>
  </div>
  {#if articles.length > 0}
    <div class="col-span-5 mt-4 pt-4 md:m-2 md:mt-1 md:pt-1">
      <section>
        <h1 class="mb-2 pl-2 font-display text-2xl">Works</h1>
        <ol class="list-none divide-y border-t border-dotted sm:p-1">
          {#each articles as article}
            <!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
            {#key article}
              {#if article.category}
                <li class="mb-6 w-full pt-1 pb-1 sm:mb-2">
                  <a
                    data-sveltekit-preload-code="viewport"
                    data-sveltekit-preload-data="tap"
                    href={`/category/${article.category.slug}/${article.slug}`}>
                    <HoverDim>
                      <article class="p-1 md:m-1 md:p-2">
                        <h1
                          class="mb-2 pb-4 font-display text-4xl font-bold font-stretch-condensed hover:underline">
                          {article.title}
                        </h1>
                        {#if article.subtitle}
                          <P class=" text-gray-600 mb-1 pb-2 leading-6 tracking-wide">
                            {article.subtitle}
                          </P>
                        {/if}
                        <footer>
                          <P class="text-gray-600 font-semibold tracking-wide">
                            <time datetime={article.date}>
                              {dateFormatter(article.date, data.userLocale)}
                            </time>
                          </P>
                        </footer>
                      </article>
                    </HoverDim>
                  </a>
                </li>
              {/if}
            {/key}
          {/each}
        </ol>
      </section>
    </div>
  {/if}
</div>
