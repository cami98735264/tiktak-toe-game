<script>
  import LayoutSettings from "../layout/LayoutSettings.svelte";
  import { screens } from "$lib/stores/screens";


  let handleGoBack = () => {
    screens.update((s) => {
      let currentScreen = s.currentScreen;
      s.currentScreen = s.previousScreen
      s.previousScreen = currentScreen;
      return s;
    });
  };
</script>

<LayoutSettings>
    <button class="regresar-button" onclick={handleGoBack}>Regresar</button>
</LayoutSettings>



<style>

  .regresar-button {
    background-color: var(--primary);
    color: var(--primary-content);
    border: none;
    padding: 10px 20px;
    font-size: var(--font-size-medium);
    text-shadow: var(--shadow-border-medium);
    cursor: pointer;
  }
</style>