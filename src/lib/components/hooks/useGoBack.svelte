<script lang="ts">
  interface Props {
    showConfirmation?: boolean;
    resetGameState?: boolean;
  }
  const { showConfirmation = false, resetGameState = false }: Props = $props();
  import { screens } from "$lib/stores/screens";
  import { get } from "svelte/store";
  let currentScreen = $state(get(screens).currentScreen);
  let handleGoBack = () => {
    const confirmation = showConfirmation
      ? confirm(
          `¿Estás seguro de que quieres volver? ${resetGameState ? "Se perderá el progreso actual." : ""}`
        )
      : true;
    if (!confirmation) return;
    screens.update((s) => {
      if (s.screenHistory.length > 0) {
      s.currentScreen = s.screenHistory.pop() || "mainMenu";
      }
      return s;
    });
  };

  $effect(() => {
    const unsubscribe = screens.subscribe((value) => {
      currentScreen = value.currentScreen;
    });
    return () => {
      unsubscribe();
    };
  });
</script>

{#if currentScreen !== "mainMenu"}
  <button class="regresar-button" onclick={handleGoBack}>Regresar</button>
{/if}

<style>
  .regresar-button {
    background-color: transparent;
    color: var(--primary-content);
    border: none;
    height: 60px;
    padding: 10px 20px;
    font-size: var(--font-size-medium);
    text-shadow: var(--shadow-border-medium);
    cursor: pointer;
  }
</style>
