<script lang="ts">
	import Location from '$components/authorPage/Location.svelte';
	import P from '$components/defaults/P.svelte';
	import ContactIcons from '$components/general/ContactIcons.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	import Image from '$components/Image.svelte';
	import { dateFormatter, domainFromUrl } from '$lib/helpers';
	import { filler } from '$lib/constants';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let member = $derived(data.member);
	let handles = $derived(data.member.handles);
	let location = $derived(data.member.from);
	let articles = $derived(data.articles);

	// let hasArticles = articles ? articles.length > 0 : false;
</script>

<header class="mb-4 pb-4 w-full">
	<h1
		class="font-display font-black text-4xl md:text-6xl lg:text-8xl tracking-tight sm:p-1 select-none font-stretch-condensed"
	>
		{member.name}
	</h1>
</header>
<div class="flex flex-col md:grid md:grid-cols-7 grid-flow-row gap-4 center mt-2 pt-2">
	<div class="col-span-2 h-fit md:sticky top-3 p-1">
		<header>
			{#if member.portrait && member.asset}
				<div class="p-0 sm:p-2">
					<Image
						media={member.portrait}
						width={250}
						height={250}
						fit={'crop'}
						quality={80}
						loading="eager"
						blurHash={member.asset.metadata.blurHash}
						alt={`${member.name}'s portrait image`}
						class={`center max-w-2xl md:w-full md:h-full mb-4`}
					/>
				</div>
			{/if}
			<div class="sm:p-1 tracking-wide">
				<h1 class="font-display text-2xl italic mb-2 tracking-tight">
					{member.name}
				</h1>
				<div class="border-t-1 border-dotted p-1">
					<div class="w-full mb-4 mt-2 pb-4">
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
					{#if location}
						<div class="mb-8">
							<Location {location} locale={data.userLocale} />
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
											alt="Visit Contributor's LinkedIn"
										/>
									</li>
								{/if}
								{#if handles.instagram}
									<li class="mb-1">
										<ContactIcons
											icon="/icons/instagram.svg"
											title={`${handles.instagram}`}
											link={`https://instagram.com/${handles.instagram}`}
											alt="Visit Contributor's Instagram"
										/>
									</li>
								{/if}
								{#if handles.twitter}
									<li class="mb-1">
										<ContactIcons
											icon="/icons/twitter.svg"
											title={handles.twitter}
											link={`https://twitter.com/${handles.twitter}`}
											alt="Visit Contributor's Twitter"
										/>
									</li>
								{/if}
								{#if handles.facebook}
									<li class="mb-1">
										<ContactIcons
											icon="/icons/facebook.svg"
											title={handles.facebook}
											link={`https://facebook.com/${handles.facebook}`}
											alt="Visit Contributor's Facebook"
										/>
									</li>
								{/if}
								{#if handles.github}
									<li class="mb-1">
										<ContactIcons
											icon="/icons/github.svg"
											title={handles.github}
											link={`https://github.com/${handles.github}`}
											alt="Visit Contributor's GitHub"
										/>
									</li>
								{/if}
								{#if handles.website}
									<li class="mb-1">
										<ContactIcons
											icon="/icons/www.svg"
											title={domainFromUrl(handles.website)}
											link={`${handles.website}`}
											alt="Visit Contributor's Website"
										/>
									</li>
								{/if}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		</header>
	</div>
	{#if articles}
		<div class="col-span-5 md:m-2 mt-4 pt-4 md:mt-1 md:pt-1">
			<section>
				<h1 class="font-display text-2xl mb-2 pl-2">Works</h1>
				<ol class="list-none border-t-1 border-dotted sm:p-1 divide-y-1">
					{#each articles as article}
						<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
						{#key article}
							{#if article.category}
								<li class="w-full mb-6 sm:mb-2 pt-1 pb-1">
									<a
										data-sveltekit-preload-code="viewport"
										data-sveltekit-preload-data="tap"
										href={`/category/${article.category.slug.current}/${article.slug.current}`}
									>
										<HoverDim>
											<article class="p-1 md:m-1 md:p-2">
												<h1
													class="text-4xl font-display font-bold mb-2 pb-4 hover:underline font-stretch-condensed"
												>
													{article.title}
												</h1>
												{#if article.subtitle}
													<P class=" text-gray-600 tracking-wide mb-1 pb-2 leading-6">
														{article.subtitle}
													</P>
												{/if}
												<footer>
													<P class="text-gray-600 tracking-wide font-semibold">
														<time datetime={article.date}
															>{dateFormatter(article.date, data.userLocale)}</time
														>
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
