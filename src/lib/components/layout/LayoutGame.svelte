<script lang="ts">
  import { getAssetUrl } from "$lib/utils";
  import { preferences } from "$lib/stores/preferences";
  import { get } from "svelte/store";
    import type { Snippet } from "svelte";
  interface GameState {
    player1Lives: number;
    player2Lives: number;
    player1Character: string;
    player2Character: string;
    timeRemaining: number;
    currentPlayer: number;
  }

  let { gameState, children } = $props<{ gameState: GameState, children: Snippet }>();
  let pref = $state(get(preferences));
</script>

<div class="game-layout">
  <div class="timer-container">
    <div class="timer">
      <div class="time-remaining">{gameState.timeRemaining}s</div>
    </div>
  </div>
  <div class="game-content">
    <div class="player player1">
      <div class="player-name">Jugador 1</div>
      <div class="player-lives">
        {#each Array(5) as _, i}
          <img 
            src="/assets/icons/heart-icon.svg" 
            alt="heart" 
            class="heart"
            class:lost={i >= gameState.player1Lives}
          />
        {/each}
      </div>
      <div class="player-character">{gameState.player1Character}</div>
    </div>
    <div class="game-board">
      {@render children()}
    </div>
    <div class="player player2">
      <div class="player-name">Jugador 2</div>
      <div class="player-lives">
        {#each Array(5) as _, i}
          <img 
            src="/assets/icons/heart-icon.svg" 
            alt="heart" 
            class="heart"
            class:lost={i >= gameState.player2Lives}
          />
        {/each}
      </div>
      <div class="player-character">{gameState.player2Character}</div>
    </div>
  </div>
  <div class="game-footer">
    <div class="footer-content">
      <div class="game-tips">
        <div class="tip-icon">💡</div>
        <div class="tip-text">Responde correctamente para colocar tu marca</div>
      </div>
      <div class="game-stats">
        <div class="stat">
          <span class="stat-label">Turno:</span>
          <span class="stat-value">Jugador {gameState.currentPlayer}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Vidas restantes:</span>
          <span class="stat-value">{gameState.player1Lives} - {gameState.player2Lives}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .game-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100dvh - 60px);
    box-sizing: border-box;
    padding: 1rem;
    gap: 0.5rem;
  }

  .timer-container {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    flex: 0 0 auto;
  }

  .timer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: var(--foreground);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .time-remaining {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: var(--primary);
  }

  .game-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    max-width: 1000px;
    flex: 1 1 auto;
    min-height: 0;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 12px;
    background-color: var(--foreground);
    min-width: 180px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .player-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: var(--primary);
  }

  .player-lives {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--background);
    border-radius: 8px;
  }

  .heart {
    width: 32px;
    height: 32px;
    transition: all 0.3s ease;
  }

  .heart.lost {
    opacity: 0.3;
    transform: scale(0.9);
  }

  .player-character {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: var(--primary);
  }

  .game-board {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0.75rem;
    background-color: var(--foreground);
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .game-footer {
    width: 100%;
    max-width: 1000px;
    padding: 0.75rem;
    background-color: var(--foreground);
    border-radius: 12px;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    flex: 0 0 auto;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .game-tips {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--primary);
    border-radius: 8px;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
  }

  .tip-icon {
    font-size: 1.25rem;
  }

  .tip-text {
    font-size: 0.9rem;
    font-weight: bold;
  }

  .game-stats {
    display: flex;
    gap: 1rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--copy-light);
    text-shadow: var(--shadow-border-light);
  }

  .stat-value {
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
  }
</style> 