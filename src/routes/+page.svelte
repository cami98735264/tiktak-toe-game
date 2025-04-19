<script lang="ts">
  import { get } from "svelte/store";
  import { preferences } from "$lib/stores/preferences";
  import { screens } from "$lib/stores/screens";
  import { getAssetUrl } from "$lib/utils";
  import MainMenu from "$lib/components/screens/MainMenu.svelte";
  import UseGoBack from "$lib/components/hooks/useGoBack.svelte";
  import { onMount } from "svelte";
  import Settings from "$lib/components/screens/Settings.svelte";
  import Game from "$lib/components/screens/Game.svelte";
  import HowToPlay from "$lib/components/screens/HowToPlay.svelte";
  let pref = $state(get(preferences));
  let screen = $state(get(screens));
  // Audio elements
  let backgroundMusic: HTMLAudioElement;
  let clickAudio: HTMLAudioElement;
  let audioInitialized = false;

  $effect(() => {
    if (typeof window !== "undefined") {
      // Update the background image style when preferences change
      document.documentElement.style.setProperty(
        "--backgroundImageStyle",
        `url(${getAssetUrl(`background.${pref.visual.backgroundStyle}`)})`
      );

      // Update color theme variables based on the selected theme
      switch (pref.visual.colorTheme) {
        case 'dark':
          document.documentElement.style.setProperty('--primary', '#1a1a1a');
          document.documentElement.style.setProperty('--primary-dark', '#000000');
          document.documentElement.style.setProperty('--primary-light', '#333333');
          document.documentElement.style.setProperty('--background', '#121212');
          document.documentElement.style.setProperty('--foreground', '#1a1a1a');
          document.documentElement.style.setProperty('--copy', '#ffffff');
          document.documentElement.style.setProperty('--copy-light', '#cccccc');
          document.documentElement.style.setProperty('--copy-lighter', '#999999');
          break;
        case 'colorful':
          document.documentElement.style.setProperty('--primary', '#4a90e2');
          document.documentElement.style.setProperty('--primary-dark', '#357abd');
          document.documentElement.style.setProperty('--primary-light', '#6ba7e8');
          document.documentElement.style.setProperty('--secondary', '#ff6b6b');
          document.documentElement.style.setProperty('--secondary-dark', '#e05555');
          document.documentElement.style.setProperty('--secondary-light', '#ff8585');
          document.documentElement.style.setProperty('--background', '#f5f7fa');
          document.documentElement.style.setProperty('--foreground', '#4a90e2');
          document.documentElement.style.setProperty('--copy', '#2c3e50');
          document.documentElement.style.setProperty('--copy-light', '#7f8c8d');
          document.documentElement.style.setProperty('--copy-lighter', '#bdc3c7');
          break;
        case 'light':
        default:
          document.documentElement.style.setProperty('--primary', '#007bff');
          document.documentElement.style.setProperty('--primary-dark', '#0062cc');
          document.documentElement.style.setProperty('--primary-light', '#3395ff');
          document.documentElement.style.setProperty('--secondary', '#ff9900');
          document.documentElement.style.setProperty('--secondary-dark', '#cc7a00');
          document.documentElement.style.setProperty('--secondary-light', '#ffad33');
          document.documentElement.style.setProperty('--background', '#eff0f1');
          document.documentElement.style.setProperty('--foreground', '#3395ff');
          document.documentElement.style.setProperty('--copy', '#232629');
          document.documentElement.style.setProperty('--copy-light', '#5e666e');
          document.documentElement.style.setProperty('--copy-lighter', '#848c95');
          break;
      }
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
  bind:this={clickAudio}
  id="click-audio"
  src="/assets/audios/effects/click.mp3"
  volume={pref.audio.effects.volume / 100}
  muted={!pref.audio.effects.enable}
></audio>
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
  <Game />
{:else if screen.currentScreen === "settings.audio"}
  <UseGoBack></UseGoBack>
  <Settings category={"audio"}/>
{:else if screen.currentScreen === "settings.visual"}
  <UseGoBack></UseGoBack>
  <Settings category={"visual"}/>
{:else if screen.currentScreen === "howToPlay"}
  <UseGoBack></UseGoBack>
  <HowToPlay />
{/if}