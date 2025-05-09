<script lang="ts">
  import LayoutStart from "$lib/components/layout/LayoutStart.svelte";
  import { getAssetUrl } from "$lib/utils/index";
  import { onMount } from "svelte";

  let selectedIndex = 0;
  let instructionCards: HTMLElement[] = [];
  const instructions = [
    {
      title: "Objetivo del Juego",
      content: "El objetivo es formar una línea de tres símbolos iguales (X u O) en el tablero, ya sea horizontal, vertical o diagonal."
    },
    {
      title: "Mecánica Principal",
      content: "Para colocar tu símbolo en el tablero, primero debes responder correctamente una pregunta de matemáticas. Si respondes correctamente, podrás colocar tu símbolo. Si respondes incorrectamente, perderás una vida."
    },
    {
      title: "Vidas",
      content: "Cada jugador comienza con un número personalizado de vidas que puedes configurar en la pestaña de Ajustes. Pierdes una vida cada vez que respondes incorrectamente una pregunta. El juego termina cuando un jugador pierde todas sus vidas."
    },
    {
      title: "Tiempo",
      content: "El juego tiene un límite de tiempo personalizable que puedes ajustar en la pestaña de Ajustes. Si el tiempo se agota y no hay ganador, el juego termina en empate."
    },
    {
      title: "Controles",
      content: "Usa las flechas del teclado o WASD para navegar por el menú. Presiona Enter o Espacio para seleccionar una opción."
    }
  ];

  function handleKeydown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const isArrowUp = key === 'arrowup' || key === 'w';
    const isArrowDown = key === 'arrowdown' || key === 's';

    if (isArrowUp) {
      event.preventDefault();
      selectedIndex = Math.max(0, selectedIndex - 1);
      scrollToSelected();
    } else if (isArrowDown) {
      event.preventDefault();
      selectedIndex = Math.min(instructions.length - 1, selectedIndex + 1);
      scrollToSelected();
    }
  }

  function scrollToSelected() {
    const selectedCard = instructionCards[selectedIndex];
    if (selectedCard) {
      const cardRect = selectedCard.getBoundingClientRect();
      const scrollOptions: ScrollToOptions = {
        top: window.scrollY + cardRect.top - (window.innerHeight / 2) + (cardRect.height / 2),
        behavior: 'smooth' as ScrollBehavior
      };
      window.scrollTo(scrollOptions);
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<LayoutStart gameLogoPath="{getAssetUrl("logos.gameLogo")}">
  <div class="how-to-play-container">
    <h2 class="how-to-play-title">Cómo Jugar</h2>
    <div class="instructions-container">
      {#each instructions as instruction, index}
        <div 
          class="instruction-card" 
          class:selected={index === selectedIndex}
          tabindex="0"
          role="button"
          bind:this={instructionCards[index]}
        >
          <h3 class="instruction-title">{instruction.title}</h3>
          <p class="instruction-content">{instruction.content}</p>
        </div>
      {/each}
    </div>
  </div>
</LayoutStart>

<style>
  .how-to-play-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    max-width: 800px;
    width: 100%;
  }

  .how-to-play-title {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-strong);
    font-size: var(--font-size-large);
    text-align: center;
  }

  .instructions-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .instruction-card {
    background-color: var(--primary-light);
    border: 3px solid var(--primary-dark);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, border-color 0.3s ease;
    outline: none;
  }

  .instruction-card.selected {
    border-color: var(--secondary);
    transform: translateY(-5px);
  }

  .instruction-card:focus {
    outline: 3px solid var(--secondary);
    outline-offset: 2px;
  }

  .instruction-title {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-medium);
    font-size: var(--font-size-medium);
    margin-bottom: 1rem;
  }

  .instruction-content {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-small);
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .how-to-play-container {
      padding: 1rem;
    }

    .instruction-card {
      padding: 1rem;
    }
  }
</style> 