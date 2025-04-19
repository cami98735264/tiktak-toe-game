<script lang="ts">
  import LayoutStart from "$lib/components/layout/LayoutStart.svelte";
  import { getAssetUrl } from "$lib/utils";

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
      content: "Cada jugador comienza con 5 vidas. Pierdes una vida cada vez que respondes incorrectamente una pregunta. El juego termina cuando un jugador pierde todas sus vidas."
    },
    {
      title: "Tiempo",
      content: "El juego tiene un límite de tiempo de 5 minutos. Si el tiempo se agota y no hay ganador, el juego termina en empate."
    },
    {
      title: "Controles",
      content: "Usa las flechas del teclado o WASD para navegar por el menú. Presiona Enter o Espacio para seleccionar una opción."
    }
  ];
</script>

<LayoutStart gameLogoPath="/assets/logos/mathtriqui-logo.svg">
  <div class="how-to-play-container">
    <h2 class="how-to-play-title">Cómo Jugar</h2>
    <div class="instructions-container">
      {#each instructions as instruction}
        <div class="instruction-card">
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
    transition: transform 0.3s ease;
  }

  .instruction-card:hover {
    transform: translateY(-5px);
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