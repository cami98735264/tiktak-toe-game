<script>
  import { get } from "svelte/store";
  import { preferences } from "$lib/stores/preferences";
  import { screens } from "$lib/stores/screens";
  import { getAssetUrl } from "$lib/utils";
  import MainMenu from "$lib/components/screens/MainMenu.svelte";
  let { children } = $props();
  import { onMount } from "svelte";
  import Settings from "$lib/components/screens/Settings.svelte";
  let pref = $state(get(preferences));
  let screen = $state(get(screens));
  // Font loading
  let fontLoaded = false;

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
  onMount(() => {
    // Load default font
    const font = new FontFace(
      "Freckle Face",
      "url(/fonts/FreckleFace-Regular.ttf)"
    );
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        fontLoaded = true;
      })
      .catch((err) => {
        console.error("Error loading font:", err);
      });
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
  <MainMenu />
{:else if screen.currentScreen === "game"}
  <slot />
{:else if screen.currentScreen === "start"}
  <slot />
{:else if screen.currentScreen === "settings"}
  <Settings/>
{:else if screen.currentScreen === "howToPlay"}
  <slot />
{:else if screen.currentScreen === "credits"}
  <slot />
{/if}

<style>
    :global(:root) {
    --primary: #007bff;
    --primary-content: #ffffff;
    --primary-dark: #0062cc;
    --primary-light: #3395ff;

    --secondary: #ff9900;
    --secondary-content: #000000;
    --secondary-dark: #cc7a00;
    --secondary-light: #ffad33;

    --background: #eff0f1;
    --foreground: #3395ff;
    --border: #0062cc;

    --copy: #232629;
    --copy-light: #5e666e;
    --copy-lighter: #848c95;

    --success: #00ff00;
    --warning: #ffff00;
    --error: #ff0000;
    --success-content: #000000;
    --warning-content: #000000;
    --error-content: #ffffff;

    /* set small, medium, large font sizes with clamp */
    --font-size-small: clamp(1.4rem, 1.5vw + 0.5rem, 1.5rem);
    --font-size-medium: clamp(1.6rem, 2vw + 0.5rem, 2rem);
    --font-size-large: clamp(1.9rem, 2.5vw + 0.5rem, 2.5rem);


    /* shadow borders for text */
    --shadow-border-light: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    --shadow-border-medium: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    --shadow-border-strong: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;

  }
  @font-face {
    font-family: "Freckle Face";
    src: url("/fonts/FreckleFace-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  :global(html) {
    background-image: var(--backgroundImageStyle);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Freckle Face", cursive;
  }

</style>
