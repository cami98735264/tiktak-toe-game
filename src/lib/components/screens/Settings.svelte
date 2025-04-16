<script>
  let { category } = $props();
  import LayoutSettings from "$lib/components/layout/LayoutSettings.svelte";
  import ToggleSwitch from "../ui/ToggleSwitch.svelte";
</script>

<LayoutSettings
  sidebarOptions={[
    {
      label: "Audio",
      screen: "settings.audio",
    },
    {
      label: "Visual",
      screen: "settings.visual",
    },
  ]}
  paramsCategory={category}
>
  {#if category === "audio"}
      <h2>Configuración de Audio</h2>
      <div>
        <ToggleSwitch
          label="Activar sonido"
          description="Activa o desactiva el sonido del juego"
          checked={true}
          onChange={() => console.log("asd")}
        />
        
      </div>
  {:else if category === "visual"}
    <h2>Visual Settings</h2>
  {/if}
</LayoutSettings>

<style>
  h2 {
    font-size: var(--font-size-large);
    color: var(--primary-content);
    text-shadow: var(--shadow-border-strong);
  }
</style>