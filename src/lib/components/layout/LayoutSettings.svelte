<script lang="ts">
  import { handleChangeScreen, playAudio } from "$lib/utils/index";
  import { onMount } from "svelte";
  import { preferences } from "$lib/stores/preferences";
  import { get } from "svelte/store";

  let { sidebarOptions, paramsCategory, children } = $props();
  let focusedOptionIndex = $state(0);
  let sidebarButtons: HTMLButtonElement[] = [];
  let isInContentArea = $state(false);
  let contentFocusableElements: HTMLElement[] = [];
  let contentFocusedIndex = $state(0);
  let settingsContainers: HTMLElement[] = [];
  let currentContainerIndex = $state(0);
  let regresarButton: HTMLButtonElement | null = null;

  let lastAudioPlayTime = 0;
  const AUDIO_DEBOUNCE_TIME = 100; // ms between allowed audio plays

  // Find the index of the current category in sidebarOptions
  $effect(() => {
    const currentIndex = sidebarOptions.findIndex(
      (option: { screen: string }) =>
        option.screen.split(".")[1] === paramsCategory
    );
    if (currentIndex !== -1) {
      focusedOptionIndex = currentIndex;
    }
  });

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const now = Date.now();

    // Prevent sound triggering too rapidly
    const shouldPlaySound = now - lastAudioPlayTime > AUDIO_DEBOUNCE_TIME;

    // Only play sound if enough time has passed since the last play
    if (
      shouldPlaySound &&
      (key === "arrowdown" ||
        key === "arrowup" ||
        key === "arrowleft" ||
        key === "arrowright" ||
        key === "s" ||
        key === "w" ||
        key === "a" ||
        key === "d" ||
        key === "enter")
    ) {
      const pref = get(preferences);
      playAudio(pref, (document.getElementById("click-audio") as HTMLAudioElement)?.src || "");
      lastAudioPlayTime = now;
    }

    // Navigation in sidebar
    if (!isInContentArea) {
      if (key === "arrowdown" || key === "s") {
        event.preventDefault();
        focusedOptionIndex = (focusedOptionIndex + 1) % sidebarOptions.length;
        sidebarButtons[focusedOptionIndex].focus();
        // Change screen when moving in sidebar
        const newScreen = sidebarOptions[focusedOptionIndex].screen;
        if (newScreen !== paramsCategory) {
          const button = sidebarButtons[focusedOptionIndex];
          button.click();
        }
      } else if (key === "arrowup" || key === "w") {
        event.preventDefault();
        focusedOptionIndex =
          (focusedOptionIndex - 1 + sidebarOptions.length) %
          sidebarOptions.length;
        sidebarButtons[focusedOptionIndex].focus();
        // Change screen when moving in sidebar
        const newScreen = sidebarOptions[focusedOptionIndex].screen;
        if (newScreen !== paramsCategory) {
          const button = sidebarButtons[focusedOptionIndex];
          button.click();
        }
      } else if (key === "arrowright" || key === "d") {
        event.preventDefault();
        isInContentArea = true;
        currentContainerIndex = 0;
        if (settingsContainers.length > 0) {
          const firstFocusable = settingsContainers[0].querySelector(
            "button, input, select, .toggle-wrapper button"
          ) as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      } else if (key === "arrowleft" || key === "a") {
        event.preventDefault();
        // Focus the Regresar button when pressing left in sidebar
        if (regresarButton) {
          regresarButton.focus();
        }
      }
    }
    // Navigation in content area
    else {
      if (key === "arrowleft" || key === "a") {
        event.preventDefault();
        const currentContainer = settingsContainers[currentContainerIndex];
        const focusableElements = Array.from(
          currentContainer.querySelectorAll(
            "button, input, select, .toggle-wrapper button"
          )
        ) as HTMLElement[];
        const currentElement = document.activeElement as HTMLElement;
        const currentIndex = focusableElements.indexOf(currentElement);

        // If we're at the first element of the first container, go back to sidebar
        if (currentContainerIndex === 0 && currentIndex === 0) {
          isInContentArea = false;
          sidebarButtons[focusedOptionIndex].focus();
        }
        // If we're at the first element of any container, move to previous container
        else if (currentIndex === 0) {
          currentContainerIndex =
            (currentContainerIndex - 1) % settingsContainers.length;
          const prevContainer = settingsContainers[currentContainerIndex];
          const prevFocusableElements = Array.from(
            prevContainer.querySelectorAll(
              "button, input, select, .toggle-wrapper button"
            )
          ) as HTMLElement[];
          if (prevFocusableElements.length > 0) {
            prevFocusableElements[prevFocusableElements.length - 1].focus();
          }
        }
        // Otherwise move to previous element in current container
        else {
          focusableElements[currentIndex - 1].focus();
        }
      } else if (key === "arrowdown" || key === "s") {
        event.preventDefault();
        // Move to next container
        currentContainerIndex =
          (currentContainerIndex + 1) % settingsContainers.length;
        const firstFocusable = settingsContainers[
          currentContainerIndex
        ].querySelector(
          "button, input, select, .toggle-wrapper button"
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      } else if (key === "arrowup" || key === "w") {
        event.preventDefault();
        // Move to previous container
        currentContainerIndex =
          (currentContainerIndex - 1 + settingsContainers.length) %
          settingsContainers.length;
        const firstFocusable = settingsContainers[
          currentContainerIndex
        ].querySelector(
          "button, input, select, .toggle-wrapper button"
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      } else if (key === "arrowright" || key === "d") {
        event.preventDefault();
        // Move to next focusable element in current container
        const currentContainer = settingsContainers[currentContainerIndex];
        const focusableElements = Array.from(
          currentContainer.querySelectorAll(
            "button, input, select, .toggle-wrapper button"
          )
        ) as HTMLElement[];
        const currentElement = document.activeElement as HTMLElement;
        const currentIndex = focusableElements.indexOf(currentElement);

        if (currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        }
      }
    }
  }

  // Update content focusable elements when content changes
  $effect(() => {
    if (isInContentArea) {
      // Get all settings containers
      settingsContainers = Array.from(
        document.querySelectorAll(".settings-options-container")
      ) as HTMLElement[];

      // Sort containers by their position in the DOM (top to bottom)
      settingsContainers.sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        return rectA.top - rectB.top;
      });

      if (settingsContainers.length > 0) {
        const firstFocusable = settingsContainers[
          currentContainerIndex
        ].querySelector(
          "button, input, select, .toggle-wrapper button"
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }
  });
  onMount(() => {
    // Find all sidebar buttons
    sidebarButtons = Array.from(
      document.querySelectorAll(".settings-sidebar button")
    );
    // Find the Regresar button
    regresarButton = document.querySelector(".regresar-button");

    // Focus the current category option
    const currentIndex = sidebarOptions.findIndex(
      (option: { screen: string }) =>
        option.screen.split(".")[1] === paramsCategory
    );
    if (currentIndex !== -1) {
      focusedOptionIndex = currentIndex;
      setTimeout(() => {
        sidebarButtons[currentIndex].focus();
      }, 100);
    }

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    // Clean up event listeners when component is destroyed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<main>
  <h1 class="settings-title">Opciones</h1>
  <div class="settings-container" >
    <div class="settings-sidebar">
      {#each sidebarOptions as option, i}
        <button
          class={option.screen.split(".")[1] === paramsCategory
            ? "selected"
            : ""}
          data-screen={option.screen}
          type="button"
          onclick={handleChangeScreen}
          tabindex={i === focusedOptionIndex ? 0 : -1}
        >
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
  }
  main {
    min-height: calc(100dvh - 60px);
    display: flex;
    gap: 1rem;
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
    height: fit-content;
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
    transition: all 0.3s ease;
  }

  .settings-sidebar button:focus {
    outline: none;
    background-color: var(--secondary);
    color: var(--primary-content);
    transform: scale(1.05);
  }

  .settings-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 8px;
    background-color: var(--primary-light);
    border: 3px solid var(--primary-dark);
    height: 100%;
    padding: 2rem;
    flex: 1;
    animation: contentShow 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
    transform: translateY(10px);
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Style for focused elements in content area */
  :global(.settings-content button:focus),
  :global(.settings-content input:focus),
  :global(.settings-content select:focus),
  :global(.settings-content .toggle-wrapper button:focus) {
    outline: none;
    background-color: var(--secondary);
    color: var(--primary-content);
    transform: scale(1.05);
  }

  :global(.regresar-button) {
    background-color: transparent;
    color: var(--primary-content);
    border: none;
    height: 60px;
    padding: 10px 20px;
    font-size: var(--font-size-medium);
    text-shadow: var(--shadow-border-medium);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  :global(.regresar-button:hover),
  :global(.regresar-button:focus) {
    color: var(--secondary);
    transform: scale(1.05);
  }

  @media (max-width: 1180px) {
    main {
      padding: 1rem;
    }
    .settings-container {
      flex-direction: column;
      flex: 1;
      gap: 8px;
    }
    .settings-sidebar {
      flex: 0 0 auto;
      width: 100%;
    }
    .settings-content {
      padding: 1rem;
      width: 100%;
    }
  }
</style>
