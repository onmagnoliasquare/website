<script>
	import MobileNavbar from './general/MobileNavbar.svelte';
	import Navbar from './general/Navbar.svelte';
	import SiteTitle from './general/SiteTitle.svelte';

	let showMenu = $state(false);

	function toggleNavbar() {
		showMenu = !showMenu;
	}
</script>

<header>
	<div class="w-full max-w-7xl center border-0 lg:border-x-1 lg:border-dotted pt-4 sm:mb-0 sm:pb-0">
		<div
			class="flex flex-row sm:block md:border-b-0 {showMenu
				? 'border-b-0'
				: 'border-b-1'} sm:border-0 items-center pb-4 sm:pb-0"
		>
			<div class="p-2 my-2 ml-1">
				<SiteTitle />
			</div>

			<!-- Menu Button -->
			<div class="absolute right-2 sm:hidden">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button type="button" title="Menu" class="text-gray-800 p-1" onclick={toggleNavbar}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<div class="p-1 sm:p-2">
				<Navbar />
			</div>
		</div>
		<MobileNavbar {toggleNavbar} {showMenu} />
	</div>
</header>
