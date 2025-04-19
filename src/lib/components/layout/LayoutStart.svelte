<script lang="ts">
    import type { MainMenuProps } from "$lib/types";
    import type { Snippet } from "svelte";
    import { onMount } from "svelte";

    let { gameLogoPath, children }: Omit<MainMenuProps, 'menuOptions'> & { children: Snippet } = $props();
    let focusedOptionIndex = 0;
    let menuOptions: HTMLButtonElement[] = [];

    // Key-to-keybind mapping
    const keyMapping: Record<string, number> = {
        'ArrowDown': 0,
        'ArrowUp': 1,
        'ArrowRight': 2, 
        'ArrowLeft': 3,
        'w': 0,
        'a': 1,
        's': 2,
        'd': 3
    };

    // Handle menu navigation
    function handleMenuNavigation(event: KeyboardEvent): void {
        const key = event.key.toLowerCase();
        const clickAudio = document.querySelector('#click-audio') as HTMLAudioElement;
        // Skip if no menu options are available
        if (menuOptions.length === 0) return;
        if (key === 'arrowdown' || key === 's' || key === 'arrowup' || key === 'w') {
            if (clickAudio) {
                clickAudio.currentTime = 0; // Reset audio to start
                clickAudio.play().catch(err => {
                    console.error("Failed to play click sound:", err);
                });
            }
        }
        if (key === 'arrowdown' || key === 's') {
            event.preventDefault();

            focusedOptionIndex = (focusedOptionIndex + 1) % menuOptions.length;
            menuOptions[focusedOptionIndex].focus();
        } else if (key === 'arrowup' || key === 'w') {
            event.preventDefault();
            focusedOptionIndex = (focusedOptionIndex - 1 + menuOptions.length) % menuOptions.length;
            menuOptions[focusedOptionIndex].focus();
        } else if (key === 'enter' || key === ' ') {
            event.preventDefault();
            menuOptions[focusedOptionIndex].click();
        }
    }

    // Handle key down event
    function handleKeyDown(event: KeyboardEvent): void {
        // Handle menu navigation
        handleMenuNavigation(event);
        
        const key = event.key.toLowerCase();
        
        // Check if it's an arrow key
        if (key === 'arrowdown' || key === 'arrowup' || key === 'arrowleft' || key === 'arrowright') {
            const index = keyMapping[event.key];
            const keyElements = document.querySelectorAll('.keybinds-container');
            if (keyElements.length > 0) {
                const keyContainers = keyElements[0].querySelectorAll('.keybind-container');
                if (keyContainers.length > index && index >= 0) {
                    const keyElement = keyContainers[index] as HTMLElement;
                    keyElement.style.outline = '4px solid var(--secondary)';
                    keyElement.style.borderColor = 'transparent';
                }
            }
        }
        
        // Check if it's WASD
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            const index = keyMapping[key];
            const keyElements = document.querySelectorAll('.keybinds-container');
            if (keyElements.length > 1) {
                const keyContainers = keyElements[1].querySelectorAll('.keybind-container');
                if (keyContainers.length > index && index >= 0) {
                    const keyElement = keyContainers[index] as HTMLElement;
                    keyElement.style.outline = '4px solid var(--secondary)';
                    keyElement.style.borderColor = 'transparent';
                }
            }
        }
    }

    // Handle key up event
    function handleKeyUp(event: KeyboardEvent): void {
        const key = event.key.toLowerCase();
        
        // Check if it's an arrow key
        if (key === 'arrowdown' || key === 'arrowup' || key === 'arrowleft' || key === 'arrowright') {
            const index = keyMapping[event.key];
            const keyElements = document.querySelectorAll('.keybinds-container');
            if (keyElements.length > 0) {
                const keyContainers = keyElements[0].querySelectorAll('.keybind-container');
                if (keyContainers.length > index && index >= 0) {
                    const keyElement = keyContainers[index] as HTMLElement;
                    keyElement.style.outline = 'none';
                    keyElement.style.border = '3px solid #000';
                }
            }
        }
        
        // Check if it's WASD
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            const index = keyMapping[key];
            const keyElements = document.querySelectorAll('.keybinds-container');
            if (keyElements.length > 1) {
                const keyContainers = keyElements[1].querySelectorAll('.keybind-container');
                if (keyContainers.length > index && index >= 0) {
                    const keyElement = keyContainers[index] as HTMLElement;
                    keyElement.style.outline = 'none';
                    keyElement.style.border = '3px solid #000';
                }
            }
        }
    }

    onMount(() => {
        // Find all menu option buttons
        menuOptions = Array.from(document.querySelectorAll('.start-screen-option'));
        
        // Focus the first option by default
        if (menuOptions.length > 0) {
            setTimeout(() => {
                menuOptions[0].focus();
            }, 100);
        }
        
        // Add event listeners when component mounts
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up event listeners when component is destroyed
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    });
</script>

<main class="start-screen">
    <div class="start-screen-header">
        <div class="start-screen-header-content">
            <div class="start-screen-logo">
                <img src={gameLogoPath} alt="Logo" class="logo" />
            </div>
            <div class="start-screen-options">
                {@render children()}
            </div>
        </div>
    </div>
    <div class="start-screen-footer">
        <h3><span class="highlight-text">Tip:</span> Muévete a través del menú con las flechas</h3>
        <div class="keybinds-info-container">
            <div class="keybinds-container">
                <span class="keybind-container">↓</span>
                <span class="keybind-container">↑</span>
                <span class="keybind-container">→</span>
                <span class="keybind-container">←</span>
            </div>
            <span class="keybinds-container-separator">ó</span>
            <div class="keybinds-container">
                <span class="keybind-container">W</span>
                <span class="keybind-container">A</span>
                <span class="keybind-container">S</span>
                <span class="keybind-container">D</span>
            </div>
        </div>
    </div>
</main>

<style>

.start-screen {
        padding: 12px;
        display: flex;
        flex-direction: column;
        height: 100dvh;
    }
      .start-screen-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          flex: 0;
      }
  
      .start-screen-logo img {
          width: clamp(300px, 50vw, 500px);
      }
  
      .start-screen-header {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
      }
  
      .start-screen-options {
          flex: 1;
          display: flex;
          height: fit-content;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 12px;
      }
  
      .start-screen-header-content {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
          flex-direction: column;
      }
  
      .start-screen-footer {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
          padding: 2rem 1rem;
      }
  
      .start-screen-footer .highlight-text {
          text-shadow: var(--shadow-border-strong);
      }
  
      .start-screen-footer h3 {
          font-size: var(--font-size-small);
          color: var(--primary-content);
          text-shadow: var(--shadow-border-light);
          text-align: center;
      }
  
      .keybinds-info-container {
          border: 3px solid var(--primary-dark);
          display: flex;
          gap: 2rem;
          padding: 12px 24px;
          border-radius: 8px;
          width: fit-content;
          background-color: var(--foreground);
      }
      .keybinds-container {
          display: flex;
          gap: 1rem;
          flex: 1;
          justify-content: center;
      }
      .keybind-container {
          display: flex;
          justify-content: center;
          width: 50px;
          padding: 12px 28px;
          background-color: var(--primary-content);
          text-shadow: var(--shadow-border-light);
          border: 3px solid #000;
          border-radius: 8px;
          font-size: var(--font-size-small);
          color: var(--primary-content);
      }
  
      .keybinds-container-separator {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: var(--font-size-medium);
          color: var(--primary-content);
          text-shadow: var(--shadow-border-medium);
      }
  
      @media (max-width: 820px) {
          .keybinds-info-container {
              flex-direction: column;
              padding: 12px 8px;
          }
  
          .start-screen-footer {
              padding: 1rem 0.5rem;
          }
  
          .keybinds-info-container {
              background-color: transparent;
              border: none;
              gap: 8px;
              padding: 0;
          }
  
          .keybinds-container {
              gap: 16px;
              width: 100%;
              padding: 8px 16px;
              background-color: var(--primary-light);
              border: 2px solid var(--primary-dark);
          }
  
          .keybind-container {
              padding: 10px 8px;
          }
  
          .keybinds-container-separator {
              display: none;
          }
  
  
      }

      /* Add focus styles for keyboard navigation */
      :global(.start-screen-option:focus) {
          outline: none;
          color: var(--secondary) !important;
          transform: scale(1.1);
      }
</style>