<script lang="ts">
  import { get } from "svelte/store";
  import { preferences } from "$lib/stores/preferences";
  import { screens } from "$lib/stores/screens";
  import { getAssetUrl } from "$lib/utils/index";
  import MainMenu from "$lib/components/screens/MainMenu.svelte";
  import UseGoBack from "$lib/components/hooks/useGoBack.svelte";
  import { onMount } from "svelte";
  import Settings from "$lib/components/screens/Settings.svelte";
  import Game from "$lib/components/screens/Game.svelte";
  import HowToPlay from "$lib/components/screens/HowToPlay.svelte";
  import { playAudio } from "$lib/utils/index";
  import PlayerNames from "$lib/components/screens/PlayerNames.svelte";
  let pref = $state(get(preferences));
  let screen = $state(get(screens));
  // Audio elements
  let backgroundMusic: HTMLAudioElement;
  let clickAudio: HTMLAudioElement;
  let audioContext: AudioContext | null = null;
  let backgroundMusicBuffer: AudioBuffer | null = null;
  let backgroundMusicSource: AudioBufferSourceNode | null = null;
  let gainNode: GainNode | null = null;
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

  async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext!.decodeAudioData(arrayBuffer);
  }

  function updateMusicVolume(volume: number) {
    if (gainNode) {
      gainNode.gain.value = volume / 100;
    }
  }

  function initializeAudio() {
    if (!audioInitialized) {
      audioInitialized = true;
      if (pref.audio.music.enable) {
        // Create audio context if it doesn't exist
        if (!audioContext) {
          audioContext = new AudioContext();
        }

        // First ensure audio context is resumed
        audioContext.resume().then(() => {
          // Then load and play the background music
          loadAudioBuffer(getAssetUrl("audios.backgroundMusic"))
            .then(buffer => {
              backgroundMusicBuffer = buffer;
              playBackgroundMusic();
            })
            .catch(err => {
              console.error("Failed to load background music:", err);
              // Reset initialization flag on failure to allow retry
              audioInitialized = false;
            });
        }).catch(err => {
          console.error("Failed to resume audio context:", err);
          // Reset initialization flag on failure to allow retry
          audioInitialized = false;
        });
      }
    }
  }

  function playBackgroundMusic() {
    if (!audioContext || !backgroundMusicBuffer || !pref.audio.music.enable) return;

    try {
      // Create a new source node
      backgroundMusicSource = audioContext.createBufferSource();
      backgroundMusicSource.buffer = backgroundMusicBuffer;
      backgroundMusicSource.loop = true;

      // Create a gain node for volume control
      gainNode = audioContext.createGain();
      gainNode.gain.value = pref.audio.music.volume / 100;

      // Connect the nodes
      backgroundMusicSource.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Start playing
      backgroundMusicSource.start(0);
    } catch (err) {
      console.error("Failed to play background music:", err);
      // Reset initialization flag on failure to allow retry
      audioInitialized = false;
    }
  }

  $effect(() => {
    if (pref.audio.music.enable) {
      if (!audioInitialized) {
        initializeAudio();
      } else if (!backgroundMusicSource) {
        // If music was previously stopped, restart it
        if (audioContext) {
          audioContext.resume().then(() => {
            playBackgroundMusic();
          }).catch(err => {
            console.error("Failed to resume audio context:", err);
          });
        }
      }
      updateMusicVolume(pref.audio.music.volume);
    } else if (backgroundMusicSource) {
      // Stop music if disabled
      backgroundMusicSource.stop();
      backgroundMusicSource = null;
      gainNode = null;
    }
  });

  onMount(() => {
    // Set up various user interaction events to initialize audio
    const interactionEvents = [
      'click', 
      'touchstart', 
      'keydown',
      'mousedown',
      'pointerdown',
      'touchend',
      'mouseup',
      'touchmove',
      'scroll',
      'wheel'
    ];
    
    // Create a single initialization function that can be called multiple times
    const initializeAudioOnce = () => {
      if (!audioInitialized) {
        // Force audio context creation if it doesn't exist
        if (!audioContext) {
          audioContext = new AudioContext();
        }
        
        // Try to resume audio context
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            initializeAudio();
          }).catch(err => {
            console.error("Failed to resume audio context:", err);
            audioInitialized = false;
          });
        } else {
          initializeAudio();
        }
      }
    };

    // Add all event listeners with passive option for better performance
    interactionEvents.forEach(event => {
      document.addEventListener(event, initializeAudioOnce, { 
        passive: true,
        capture: true // Use capture phase to catch events earlier
      });
    });

    // Also try to initialize on page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', initializeAudioOnce, { once: true });
    }
    
    // Enhanced click handler with event stopping
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        // Stop event propagation to prevent multiple triggers
        event.stopPropagation();
        if (pref.audio.effects.enable) {
          playAudio(pref, getAssetUrl("audios.click"));
        }
      }
    };
    
    document.addEventListener("click", clickHandler);
    
    return () => {
      // Clean up all event listeners
      interactionEvents.forEach(event => {
        document.removeEventListener(event, initializeAudioOnce, { capture: true });
      });
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', initializeAudioOnce);
      }
      document.removeEventListener("click", clickHandler);

      // Clean up audio resources
      if (backgroundMusicSource) {
        backgroundMusicSource.stop();
        backgroundMusicSource = null;
      }
      if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
      }
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
    };
  });

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


{#if screen.currentScreen === "mainMenu"}
  <UseGoBack></UseGoBack>
  <MainMenu
    menuOptions={[
      { label: "Empezar", screen: "playerNames" },
      { label: "Cómo jugar", screen: "howToPlay" },
      { label: "Opciones", screen: "settings.audio" },
    ]}
  />
{:else if screen.currentScreen === "playerNames"}
  <UseGoBack></UseGoBack>
  <PlayerNames />
{:else if screen.currentScreen === "game"}
  <UseGoBack showConfirmation={true}></UseGoBack>
  <Game player1Name={screen.currentScreenParams?.player1Name || "Jugador 1"} player2Name={screen.currentScreenParams?.player2Name || "Jugador 2"} />
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