<script lang="ts">
    let { children } = $props();
</script>

<main class="start-screen">
    {@render children()}
</main>



<style>

.start-screen {
        padding: 12px;
        display: flex;
        flex-direction: column;
        height: 100dvh;
    }
</style>