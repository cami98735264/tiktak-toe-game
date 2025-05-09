<script lang="ts">
  import { getAssetUrl } from "$lib/utils/index";
  import { screens } from "$lib/stores/screens";
  import { get } from "svelte/store";
  import { preferences } from "$lib/stores/preferences";

  let player1Name = $state("Jugador 1");
  let player2Name = $state("Jugador 2");
  let gamePreferences = $state(get(preferences).game);
  let error = $state("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    handleStartGame();
  }

  function handleStartGame() {
    if (!player1Name.trim() || !player2Name.trim()) {
      error = "Por favor ingresa nombres para ambos jugadores";
      return;
    }
    if (player1Name.trim() === player2Name.trim()) {
      error = "Los nombres de los jugadores deben ser diferentes";
      return;
    }

    // Store player names in screen params
    screens.update((state) => ({
      ...state,
      currentScreen: "game",
      currentScreenParams: {
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
      },
    }));
  }
</script>

<div class="player-names-screen">
  <div class="containers-wrapper">
    <div class="inner-wrapper">
      <div class="player-names-container">
        <h2 class="player-names-title">Ingresa los nombres de los jugadores</h2>
        <form class="player-names-content" onsubmit={handleSubmit}>
          <div class="input-container">
            <div class="input-group">
              <label for="player1">
                <img
                  src={getAssetUrl("icons.personIcon")}
                  alt="person"
                  class="label-icon"
                />
                Jugador 1:
              </label>
              <input
                type="text"
                id="player1"
                bind:value={player1Name}
                placeholder="Nombre del Jugador 1"
                maxlength="20"
              />
            </div>
            <div class="input-group">
              <label for="player2">
                <img
                  src={getAssetUrl("icons.personIcon")}
                  alt="person"
                  class="label-icon"
                />
                Jugador 2:
              </label>
              <input
                type="text"
                id="player2"
                bind:value={player2Name}
                placeholder="Nombre del Jugador 2"
                maxlength="20"
              />
            </div>
          </div>
          {#if error}
            <div class="error-message">
              <img
                src={getAssetUrl("icons.errorIcon")}
                alt="error"
                class="error-icon"
              />
              {error}
            </div>
          {/if}
          <button type="submit" class="start-button"> Comenzar Juego </button>
        </form>
      </div>
      <div class="current-configs">
        <h3 class="current-configs-title">Parametros de juego:</h3>
        <div class="current-configs-content">
          <span class="current-configs-labels-container">
            <img
              src={getAssetUrl("icons.personIcon")}
              alt="person"
              class="label-icon"
            />
            <span class="current-configs-labels">
              Jugador 1:
              <span class="current-configs-labels-value">{player1Name}</span>
            </span>
          </span>
          <span class="current-configs-labels-container">
            <img
              src={getAssetUrl("icons.personIcon")}
              alt="person"
              class="label-icon"
            />
            <span class="current-configs-labels">
              Jugador 2:
              <span class="current-configs-labels-value">{player2Name}</span>
            </span>
          </span>
          <span class="current-configs-labels-container">
            <img
              src={getAssetUrl("icons.heartIcon")}
              class="label-icon"
              alt="heart"
            />
            <span class="current-configs-labels">
              Vidas totales: <span class="current-configs-labels-value"
                >{gamePreferences.lives} vidas</span
              >
            </span>
          </span>
          <span class="current-configs-labels-container">
            <img
              src={getAssetUrl("icons.timerIcon")}
              class="label-icon"
              alt="clock"
            />
            <span class="current-configs-labels">
              Tiempo de juego:
              <span class="current-configs-labels-value">
                {gamePreferences.time / 60} minutos
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .player-names-screen {
    min-height: calc(100dvh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .containers-wrapper {
    align-items: center;
    display: flex;
    height: 600px;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
  }

  .inner-wrapper {
    display: flex;
    flex-direction: row;
    gap: 5rem;
    width: 100%;
    justify-content: center;
  }

  .player-names-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 500px;
    width: 100%;
  }

  .current-configs {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    min-width: 300px;
  }

  .current-configs-labels-container {
    text-shadow: var(--shadow-border-strong);
    display: flex;
    font-size: var(--font-size-small);
    align-items: center;
    gap: 12px;
  }

  .current-configs-labels {
    display: flex;
    gap: 12px;
  }

  .current-configs-labels-value {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-small);
  }

  .current-configs-title {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-strong);
    font-size: var(--font-size-large);
  }
  .current-configs-content {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--primary-dark);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--primary-light);
    padding: 1rem;
    min-width: 400px;
    border-radius: 8px;
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-small);
  }

  .player-names-title {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-strong);
    font-size: var(--font-size-large);
    text-align: center;
  }

  .player-names-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    background-color: var(--primary-light);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--primary-dark);
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-medium);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .label-icon {
    width: 28px;
    height: 28px;
  }

  input {
    padding: 0.75rem 1rem;
    border: 2px solid var(--primary);
    border-radius: 8px;
    background-color: var(--primary);
    color: var(--primary-content);
    font-size: var(--font-size-small);
    text-shadow: var(--shadow-border-light);
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    border: 2px solid var(--primary-dark);
    caret-color: var(--primary-content);
    letter-spacing: 2px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: var(--primary-content);
    -webkit-box-shadow: 0 0 0 30px var(--background) inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  input:hover:not(:focus) {
    border-color: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  input:focus {
    outline: none;
    border-color: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  input::placeholder {
    color: var(--primary-content);
    opacity: 0.5;
  }

  .error-message {
    color: var(--error);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-small);
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
  }

  .start-button {
    padding: 1rem 2rem;
    border: 2px solid var(--primary-dark);
    border-radius: 8px;
    background-color: var(--primary);
    color: var(--primary-content);
    font-size: var(--font-size-medium);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    text-shadow: var(--shadow-border-light);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .start-button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    .containers-wrapper {
      height: auto;
      min-height: 600px;
    }

    .inner-wrapper {
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .inner-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .player-names-container {
      max-width: 100%;
    }

    .current-configs {
      width: 100%;
      max-width: 500px;
    }

    .current-configs-title {
      text-align: center;
    }

    .current-configs-content {
      min-width: unset;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .containers-wrapper {
      padding: 0 0.5rem;
    }

    .player-names-content {
      padding: 1.5rem;
    }

    .current-configs-content {
      padding: 0.75rem;
    }
  }
</style>
