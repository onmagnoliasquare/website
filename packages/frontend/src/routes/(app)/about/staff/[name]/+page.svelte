<script lang="ts">
	import Location from '$components/authorPage/Location.svelte';
	import ContactIcons from '$components/general/ContactIcons.svelte';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import Image from '$components/Image.svelte';
	import { getCountryName, getFlagEmoji } from '$lib/helpers';
	import type { PageData } from './$types';

	export let data: PageData;
	let member = data.member;
	let handles = data.member.handles;
	let location = data.member.from;

	let articles = data.articles;
</script>

<div class="flex flex-column flex-row-ns mw9 mw8-l center mt4">
	<header class="mt4 mb3-l mb2 pa2 pa4-l flex flex-column w-100 w-30-ns pr3-l order-2 order-1-ns">
		{#if member.portrait}
			<div class="w-100">
				<Image media={member.portrait} width={250} height={250} fit={'crop'} quality={80} />
			</div>
		{/if}
		<div class="w-100">
			<h1 class="fw2 lh-title">{member.name}</h1>
			<p class="tracked-02 pa0 ma0 hyphenate f6">
				{#if member.bio}
					{member.bio}
				{:else}
					{member.name} is a contributor to On Magnolia Square.
				{/if}
			</p>
		</div>
		{#if location}
			<div class="w-100 mb4">
				<div class="mb2">
					<h2 class="fw6 tracked f7 sans gray">FROM</h2>
				</div>
				<Location {location} />
			</div>
		{/if}
		{#if handles}
			<h4 class="ma0 mt4 pa0">Contact</h4>
			<ul class="list pa0 ma0 mt3 w-fit" id="contactList">
				{#if handles.linkedin}
					<li>
						<ContactIcons
							icon="/icons/linkedin.svg"
							title={handles.linkedin}
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
			</ul>
		{/if}
	</header>
	<div class="pa2 pl4-l order-1 order-2-l w-100 w-70-l">
		<section>
			<ul class="list pa1">
				{#each articles as article}
					<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
					{#key article}
						<ArticleBoxC {article} />
					{/key}
				{/each}
			</ul>
		</section>
	</div>
</div>

<style>
	#contactList > li {
		margin: 0;
		padding: 2px;
		width: 100%;
	}
</style>
