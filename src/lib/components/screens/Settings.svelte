<script>
  let { category } = $props();
  import { preferences } from "$lib/stores/preferences";
  import { get } from "svelte/store";
  import LayoutSettings from "$lib/components/layout/LayoutSettings.svelte";
  import Slider from "../ui/Slider.svelte";
  import ToggleSwitch from "../ui/ToggleSwitch.svelte";

  let preferencesData = $state(get(preferences));

  $effect(() => {
    const unsubscribe = preferences.subscribe((value) => {
      preferencesData = value;
    });
    return () => {
      unsubscribe();
    };
  });
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
    <h2 class="settings-title">Configuración de Audio</h2>
    <div class="settings-container">
      <div class="settings-options-section">
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Música</h3>
          <ToggleSwitch
            propertyToChange="audio.music.enable"
            isActive={preferencesData.audio.music.enable}
            enableText="Activar"
            disableText="Desactivar"
          />
        </div>
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Efectos</h3>
          <ToggleSwitch
            propertyToChange="audio.effects.enable"
            isActive={preferencesData.audio.effects.enable}
            enableText="Activar"
            disableText="Desactivar"
          />
        </div>
      </div>
      <div class="settings-options-section">
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Volúmen (música)</h3>
          <Slider
            propertyToChange="audio.music.volume"
            value={preferencesData.audio.music.volume}
          />
        </div>
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Volúmen (efectos)</h3>
          <Slider
            propertyToChange={"audio.effects.volume"}
            value={preferencesData.audio.effects.volume}
          />
        </div>
      </div>
    </div>
  {:else if category === "visual"}
    <h2 class="settings-title">Configuración visual</h2>
    <div class="settings-container">
      <div class="settings-options-section">
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Fondo de pantalla</h3>
          <ToggleSwitch
            propertyToChange="visual.backgroundStyle"
            multiOption={true}
            selectedOption={preferencesData.visual.backgroundStyle}
            options={[
              {
                label: "Clasico",
                value: "classic",
              },
              {
                label: "Digital",
                value: "digital",
              },
              {
                label: "Grafitti",
                value: "grafitti",
              },
              {
                label: "Neon",
                value: "neon",
              },
              {
                label: "Minimalista",
                value: "minimalistic",
              },
            ]}
          ></ToggleSwitch>
        </div>
        <div class="settings-options-container">
          <h3 class="settings-subtitle">Tema de colores</h3>
          <ToggleSwitch
            propertyToChange="visual.colorTheme"
            multiOption={true}
            selectedOption={preferencesData.visual.colorTheme}
            options={[
              {
                label: "Claro",
                value: "light",
              },
              {
                label: "Oscuro",
                value: "dark",
              },
              {
                label: "Colorido",
                value: "colorful",
              },
            ]}
          ></ToggleSwitch>
        </div>
      </div>
    </div>
  {/if}
</LayoutSettings>

<style>
  .settings-title {
    font-size: var(--font-size-large);
    color: var(--primary-content);
    text-shadow: var(--shadow-border-strong);
  }
  .settings-subtitle {
    font-size: var(--font-size-medium);
    color: var(--primary-content);
    text-shadow: var(--shadow-border-medium);
  }

  .settings-options-section {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: var(--primary-light);
    border: 3px solid var(--primary-dark);
  }

  .settings-options-container {
    display: flex;
    flex-direction: column;
  }

  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
