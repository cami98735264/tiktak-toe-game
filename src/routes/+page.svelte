<script lang="ts">
  import { get } from "svelte/store";
  import { preferences } from "$lib/stores/preferences";
  import { screens } from "$lib/stores/screens";
  import { getAssetUrl } from "$lib/utils";
  import MainMenu from "$lib/components/screens/MainMenu.svelte";
  import UseGoBack from "$lib/components/hooks/useGoBack.svelte";
  import { onMount } from "svelte";
  import Settings from "$lib/components/screens/Settings.svelte";
  let pref = $state(get(preferences));
  let screen = $state(get(screens));
  // Font loading
  let fontLoaded = false;
  // Audio elements
  let backgroundMusic: HTMLAudioElement;
  let audioInitialized = false;

  $effect(() => {
    if (typeof window !== "undefined") {
      // Update the background image style when preferences change
      document.documentElement.style.setProperty(
        "--backgroundImageStyle",
        `url(${getAssetUrl(`background.${pref.visual.backgroundStyle}`)})`
      );
    }
  });

  $effect(() => {
    const unsubscribePref = preferences.subscribe((value) => {
      pref = value;
    });

    const unsubscribeScreen = screens.subscribe((value) => {
      screen = value;
    });

    return () => {
      unsubscribePref();
      unsubscribeScreen();
    };
  });

  function initializeAudio() {
    if (!audioInitialized && backgroundMusic) {
      audioInitialized = true;
      if (pref.audio.music.enable) {
        backgroundMusic.volume = pref.audio.music.volume / 100;
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(err => {
          console.error("Failed to play background music:", err);
        });
      }
    }
  }

  onMount(() => {
    // cleans up the event listeners when the component is destroyed
    // Set up various user interaction events to initialize audio
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, initializeAudio, { once: true });
    });
    
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        playClickAudio();
      }
    });
    document.addEventListener("touchstart", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        playClickAudio();
      }
    });
    return () => {
      const interactionEvents = ['click', 'touchstart', 'keydown'];
      interactionEvents.forEach(event => {
        document.removeEventListener(event, initializeAudio);
      });
    };
  });

  function playClickAudio() {
    if (pref.audio.effects.enable) {
      const audio = new Audio("/assets/audios/effects/click.mp3");
      audio.volume = pref.audio.effects.volume / 100;
      audio.play().catch(err => console.error("Failed to play click sound:", err));
      // Ensure background music is initialized on button click
      initializeAudio();
    }
  }
</script>

<svelte:head>
  <link
    rel="preload"
    href="/fonts/FreckleFace-Regular.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous"
  />
</svelte:head>

<audio
  bind:this={backgroundMusic}
  id="background-music"
  src="/assets/audios/background/background_music.mp3"
  loop
  volume={pref.audio.music.volume / 100}
  muted={!pref.audio.music.enable}
></audio>

{#if screen.currentScreen === "mainMenu"}
  <UseGoBack></UseGoBack>
  <MainMenu
    menuOptions={[
      { label: "Empezar", screen: "game" },
      { label: "Cómo jugar", screen: "howToPlay" },
      { label: "Opciones", screen: "settings.audio" },
    ]}
  />
{:else if screen.currentScreen === "game"}
  <UseGoBack showConfirmation={true}></UseGoBack>
  <h1>Juego!</h1>
{:else if screen.currentScreen === "settings.audio"}
  <UseGoBack></UseGoBack>
  <Settings category={"audio"}/>
{:else if screen.currentScreen === "settings.visual"}
  <UseGoBack></UseGoBack>
  <Settings category={"visual"}/>
{:else if screen.currentScreen === "howToPlay"}
  <UseGoBack></UseGoBack>
  <h1>Cómo jugar!</h1>
{/if}