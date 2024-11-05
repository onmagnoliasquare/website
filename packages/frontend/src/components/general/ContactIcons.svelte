<script lang="ts">
	interface Props {
		link: string;
		title: string;
		icon: string;
	}

	let { link, title, icon }: Props = $props();
</script>

<div class="ma0 pa0">
	<a href={link} target="_blank" class="no-underline">
		<div class="flex items-center">
			<img src={icon} alt="" class="di pa0 ma0 o-50" width={20} height={20} />
			<p class="tracked-02 fw6 f6 di pa1 ma0 gray">{title}</p>
		</div>
	</a>
</div>
