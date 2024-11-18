<script lang="ts">
	import Location from '$components/authorPage/Location.svelte';
	import ContactIcons from '$components/general/ContactIcons.svelte';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import Image from '$components/Image.svelte';
	import { domainFromUrl } from '$lib/helpers';
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

	let hasArticles = articles.length > 0;
</script>

<div class="flex flex-column flex-row-ns mw9 mw8-l center mt4">
	<header
		class={`mt4 mb3-l mb2 pa2 pa4-l flex flex-column w-100 ${hasArticles ? `w-30-ns pr3-l order-1 order-1-ns` : `mw6-ns mw9`} h6 center h-100`}
	>
		{#if member.portrait}
			<div class={`mw5 mw9-l ${hasArticles ? `` : `mh5-l`} db`}>
				<Image
					media={member.portrait}
					width={250}
					height={250}
					fit={'crop'}
					quality={90}
					altText={member.portrait.alt}
					className={`w-100 h-100`}
				/>
			</div>
		{/if}
		<h1 class={`fw2 lh-title mb3 ${hasArticles ? `mb4 - ns` : `mb1-ns`} h2 f3 f2-ns h3-ns`}>
			{member.name}
		</h1>
		<div class="w-100 mb4">
			<h2 class="fw6 tracked f7 sans gray">BIO</h2>
			<p class="tracked-02 pa0 ma0 hyphenate f6">
				{#if member.bio}
					{member.bio.trim()}
				{:else}
					{member.name.trim()} {filler.memberDescription}.
				{/if}
			</p>
		</div>
		{#if member.committee}
			<div class="mb4 db">
				<div class="mb2">
					<h2 class="fw6 tracked f7 sans gray">IN COMMITTEE</h2>
					<p class="tracked-02 pa0 ma0 hyphenate f6">{member.committee.name}</p>
				</div>
			</div>
		{/if}
		{#if location}
			<div class="mb4 db">
				<div class="mb2">
					<h2 class="fw6 tracked f7 sans gray">FROM</h2>
				</div>
				<Location {location} locale={data.userLocale} />
			</div>
		{/if}
		{#if handles}
			<div class="h4">
				<h2 class="fw6 tracked f7 sans gray mb2">CONTACT</h2>
				<ul class="list pa0 ma0 w-fit" id="contactList">
					{#if handles.linkedin}
						<li>
							<ContactIcons
								icon="/icons/linkedin.svg"
								title={member.name}
								link={`https://linkedin.com/in/${handles.linkedin}`}
							/>
						</li>
					{/if}
					{#if handles.instagram}
						<li>
							<ContactIcons
								icon="/icons/instagram.svg"
								title={`@${handles.instagram}`}
								link={`https://instagram.com/${handles.instagram}`}
							/>
						</li>
					{/if}
					{#if handles.twitter}
						<li>
							<ContactIcons
								icon="/icons/twitter.svg"
								title={handles.twitter}
								link={`https://twitter.com/${handles.twitter}`}
							/>
						</li>
					{/if}
					{#if handles.facebook}
						<li>
							<ContactIcons
								icon="/icons/facebook.svg"
								title={handles.facebook}
								link={`https://facebook.com/${handles.facebook}`}
							/>
						</li>
					{/if}
					{#if handles.github}
						<li>
							<ContactIcons
								icon="/icons/github.svg"
								title={handles.github}
								link={`https://github.com/${handles.github}`}
							/>
						</li>
					{/if}
					{#if handles.website}
						<li>
							<ContactIcons
								icon="/icons/www.svg"
								title={domainFromUrl(handles.website)}
								link={`${handles.website}`}
							/>
						</li>
					{/if}
				</ul>
			</div>
		{/if}
	</header>
	{#if articles}
		<div class={`pa2 pl4-l order-2 order-2-l w-100 ${hasArticles ? `w-70-l` : `dn`}`}>
			<section>
				<ul class="list pa1">
					{#each articles as article}
						<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
						{#key article}
							<ArticleBoxC {article} locale={data.userLocale} />
						{/key}
					{/each}
				</ul>
			</section>
		</div>
	{/if}
</div>

<style>
	#contactList > li {
		margin: 0;
		padding: 2px;
		width: 100%;
	}
</style>
