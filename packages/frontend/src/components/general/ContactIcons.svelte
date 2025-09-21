<script lang="ts">
interface Props {
  link: string
  title: string
  icon: string
  alt?: string
}

let { link, title, icon, alt = '' }: Props = $props()
</script>

<div class="">
  <a href={link} target="_blank" class="no-underline">
    <div class="flex items-center">
      <img src={icon} alt={alt} class="inline mr-2" width={20} height={20} />
      <p class="inline">{title}</p>
    </div>
  </a>
</div>
