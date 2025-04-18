<script lang="ts">
    import { handleChangeScreen } from "$lib/utils";
    import LayoutStart from "$lib/components/layout/LayoutStart.svelte";
    import type { MainMenuProps } from "$lib/types";
    let { menuOptions }: Omit<MainMenuProps, 'gameLogoPath'> = $props();

</script>
  
  
  
  <LayoutStart gameLogoPath={"/assets/logos/mathtriqui-logo.svg"}>
                  {#each menuOptions as option}
                    <button class="start-screen-option" data-screen={option.screen} onclick={handleChangeScreen} type="button"><span class="active-item">{">"}</span> {option.label}</button>
                  {/each}
  </LayoutStart>
  
  
  <style>
        .active-item {
            display: inline-block;
            opacity: 0;
            visibility: hidden;
            transform: translateX(-10px);
            margin-right: -15px;
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, margin-right 0.3s ease;
        }
        :global(button) {
            background: none;
            border: none;
            color: var(--primary-content);
            cursor: pointer;
            outline: none;
            transition: color 0.3s ease, transform 0.3s ease;            
        }

        :global(button:hover) {
            color: var(--secondary) !important;
            transform: scale(1.1);
        }

        :global(button:focus) {
            color: var(--secondary);
            transform: scale(1.1);
        }
  
      .start-screen-option {
          text-shadow: var(--shadow-border-medium);
          font-size: var(--font-size-medium);
          color: var(--primary-content);
          cursor: pointer;
      }

      button:hover .active-item,
      button:focus .active-item {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
            margin-right: 5px;
            color: var(--secondary);
            font-size: var(--font-size-medium);
            text-shadow: var(--shadow-border-medium);
      }
  </style>