<script lang="ts">
  import { handleChangeScreen } from "$lib/utils";

    let { sidebarOptions, paramsCategory, children } = $props();
</script>

<main>
    <h1 class="settings-title">Opciones</h1>
    <div class="settings-container">
        <div class="settings-sidebar">
            {#each sidebarOptions as option}
                <button class={option.screen.split(".")[1] === paramsCategory ? "selected" : ""} data-screen={option.screen} type="button" onclick={handleChangeScreen}>
                    {option.label}
                </button>
            {/each}
        </div>
        <div class="settings-content">
            {@render children()}
        </div>
    </div>
</main>



<style>
    .settings-title {
        font-size: var(--font-size-large);
        color: var(--primary-content);
        text-shadow: var(--shadow-border-strong);
        margin-bottom: 2rem;
    }
    main {
        height: calc(100dvh - 60px);
        display: flex;
        flex-direction: column;
        padding: 2rem 8rem;
    }
    .settings-container {
        display: flex;
        height: 100%;
        gap: 12px;
    }
    .settings-sidebar {
        gap: 12px;
        padding: 1rem;
        border-radius: 8px;
        background-color: var(--primary-light);
        border: 3px solid var(--primary-dark);
        flex: 0 0 240px;
        display: flex;
        flex-direction: column;
    }

    .settings-sidebar button.selected {
        background-color: var(--secondary);
        color: var(--primary-content);
        font-weight: bold;
    }

    .settings-sidebar button {
        border-radius: 8px;
        background-color: transparent;
        color: var(--primary-content);
        padding: 12px;
        font-size: var(--font-size-small);
        text-shadow: var(--shadow-border-medium);
        cursor: pointer;
        border: 3px solid var(--primary-dark);
    }
    .settings-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border-radius: 8px;
        background-color: var(--primary-light);
        border: 3px solid var(--primary-dark);
        /* fill height */
        height: 100%;
        padding: 2rem;
        flex: 1;
    }
</style>