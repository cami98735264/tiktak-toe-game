<script lang="ts">
    import { get } from "svelte/store";
    import { screens } from "$lib/stores/screens";
    import LayoutStart from "$lib/components/layout/LayoutStart.svelte";
    let screensData = get(screens);

    let handleChangeScreen = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const screen = target?.dataset?.screen;
        if (screen) {
            screens.set({ 
                currentScreen: screen, 
                previousScreen: screensData.currentScreen, 
                screenHistory: [], 
                currentScreenParams: {} 
            });
        }
    };
</script>
  
  
  
  <LayoutStart>
      <div class="start-screen-header">
          <div class="start-screen-header-content">
              <div class="start-screen-logo">
                  <img src="/assets/logos/mathtriqui-logo.svg" alt="Logo" class="logo" />
              </div>
              <div class="start-screen-options">
                  <button class="start-screen-option" data-screen="play" onclick={handleChangeScreen} type="button">Empezar</button>
                  <button class="start-screen-option" data-screen="howToPlay" onclick={handleChangeScreen} type="button">Cómo jugar</button>
                  <button class="start-screen-option" data-screen="settings" onclick={handleChangeScreen} type="button">Opciones</button>
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
  </LayoutStart>
  
  
  <style>
        button {
            background: none;
            border: none;
            color: inherit;
            font: inherit;
            cursor: pointer;
            outline: inherit;
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
  
      .start-screen-option {
          text-shadow: var(--shadow-border-medium);
          font-size: var(--font-size-medium);
          color: var(--primary-content);
          cursor: pointer;
      }
  
      .keybinds-info-container {
          border: 3px solid var(--primary-dark);
          display: flex;
          gap: 2rem;
          padding: 12px 24px;
          border-radius: 4px;
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
          border-radius: 4px;
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
  </style>