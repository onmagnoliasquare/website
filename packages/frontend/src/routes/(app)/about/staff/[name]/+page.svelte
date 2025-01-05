<script lang="ts">
	import Location from '$components/authorPage/Location.svelte';
	import P from '$components/defaults/P.svelte';
	import ContactIcons from '$components/general/ContactIcons.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	// import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import Image from '$components/Image.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import { dateFormatter, domainFromUrl } from '$lib/helpers';
	import { filler } from '$lib/variables';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let member = data.member;
	let handles = data.member.handles;
	let location = data.member.from;
	let articles = data.articles;

	// let hasArticles = articles ? articles.length > 0 : false;
</script>

<PageHeader>
	{member.name}
</PageHeader>
<div class="grid grid-cols-7 grid-flow-row gap-4 center">
	<div class="col-span-2 h-fit sticky top-3 p-1">
		<header>
			{#if member.portrait}
				<div class="p-2">
					<Image
						media={member.portrait}
						width={250}
						height={250}
						fit={'crop'}
						quality={90}
						altText={`${member.name}'s profile image`}
						class={`w-full h-full mb-4`}
					/>
				</div>
			{/if}
			<div class="p-1 tracking-wide">
				<h1 class="font-display text-3xl italic mb-2 tracking-tight">
					{member.name}
				</h1>
				<div class="border-t-1 border-dotted p-1">
					<div class="w-full mb-4 mt-2 pb-4">
						<p class="tracking-wide">
							{#if member.bio}
								{member.bio.trim()}
							{:else}
								{member.name.trim()} {filler.memberDescription}.
							{/if}
						</p>
					</div>
					{#if member.committee}
						<div class="mb-8">
							<div class="mb2">
								<p>{member.committee.name} committee</p>
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
		<div class="col-span-5 m-2">
			<section>
				<h1 class="font-display text-3xl mb-2 pl-2">Works</h1>
				<ol class="list border-t-1 border-dotted p-1">
					{#each articles as article}
						<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
						{#key article}
							{#if article.category}
								<li class="w-full mb-2">
									<a
										data-sveltekit-preload-code="viewport"
										data-sveltekit-preload-data="tap"
										href={`/category/${article.category.slug.current}/${article.slug.current}`}
									>
										<div class="hover:bg-amber-100">
											<HoverDim>
												<article class="p-3">
													<h1 class="text-2xl font-display font-bold mb-1 pb-1">
														{article.title}
													</h1>
													<P class="text-sm">
														<time datetime={article.date}
															>{dateFormatter(article.date, data.userLocale)}</time
														>
													</P>
												</article>
											</HoverDim>
										</div>
									</a>
								</li>
							{/if}
							<!-- <ArticleBoxC {article} /> -->
						{/key}
					{/each}
				</ol>
			</section>
		</div>
	{/if}
</div>
