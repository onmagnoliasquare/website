<script lang="ts">
    /**
     * PageHeader component is a simple header that displays a page's title.
     * The pages that use this component should not be articles or their
     * derivatives, but rather topical pages like categories.
     * */
</script>

<header>
    <h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-2-ns tracked-tight-5-l"><slot /></h1>
</header>

<style>
    h1 {
        font-family: 'Noto Serif Regular', serif;
    }
</style>
