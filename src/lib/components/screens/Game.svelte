<script lang="ts">
  import LayoutGame from "$lib/components/layout/LayoutGame.svelte";
  import { getAssetUrl } from "$lib/utils";
  import { preferences } from "$lib/stores/preferences";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  interface Question {
    question: string;
    options: string[];
    correct: number;
  }

  interface GameState {
    board: (string | null)[];
    currentPlayer: number;
    player1Lives: number;
    player2Lives: number;
    player1Character: string;
    player2Character: string;
    timeRemaining: number;
    gameOver: boolean;
    winner: number | "tie" | null;
  }

  let pref = $state(get(preferences));
  let questions = $state<Question[]>([]);
  let currentQuestion = $state<Question | null>(null);
  let gameState = $state<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 1,
    player1Lives: 5,
    player2Lives: 5,
    player1Character: "X",
    player2Character: "O",
    timeRemaining: 600,
    gameOver: false,
    winner: null
  });

  let showQuestion = $state(false);
  let selectedCell = $state<number | null>(null);
  let timerInterval: number | undefined;
  let showNotification = $state(false);
  let notificationMessage = $state("");
  let notificationType = $state<"success" | "error">("success");
  let notificationTimeout: number | undefined;

  async function loadQuestions() {
    try {
      const response = await fetch("/assets/questions.json");
      questions = await response.json();
    } catch (error) {
      console.error("Error loading questions:", error);
      // Fallback questions if the file fails to load
      questions = [
        {
          question: "What is the probability of rolling a 6 on a fair die?",
          options: ["1/6", "1/3", "1/2", "2/3"],
          correct: 0
        }
      ];
    }
  }

  function getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  function startTimer() {
    timerInterval = window.setInterval(() => {
      if (gameState.timeRemaining > 0) {
        gameState.timeRemaining--;
      } else {
        endGame("tie");
      }
    }, 1000);
  }

  function endGame(result: number | "tie") {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    gameState.gameOver = true;
    gameState.winner = result;
  }

  function checkWinner(): number | "tie" | null {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameState.board[a] && 
          gameState.board[a] === gameState.board[b] && 
          gameState.board[a] === gameState.board[c]) {
        return gameState.board[a] === gameState.player1Character ? 1 : 2;
      }
    }

    if (!gameState.board.includes(null)) {
      return "tie";
    }

    return null;
  }

  function handleCellClick(index: number) {
    if (gameState.gameOver || gameState.board[index] || showQuestion) return;
    
    selectedCell = index;
    currentQuestion = getRandomQuestion();
    showQuestion = true;
  }

  function showNotificationMessage(message: string, type: "success" | "error") {
    showNotification = true;
    notificationMessage = message;
    notificationType = type;
    
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
    
    notificationTimeout = window.setTimeout(() => {
      showNotification = false;
    }, 3000);
  }

  function handleAnswer(selectedOption: number) {
    showQuestion = false;
    
    if (currentQuestion && selectedOption === currentQuestion.correct) {
      // Correct answer
      if (selectedCell !== null) {
        gameState.board[selectedCell] = gameState.currentPlayer === 1 ? 
          gameState.player1Character : gameState.player2Character;
        
        showNotificationMessage(
          `¡Respuesta correcta! Jugador ${gameState.currentPlayer} coloca su ${gameState.currentPlayer === 1 ? gameState.player1Character : gameState.player2Character}`,
          "success"
        );
        
        const winner = checkWinner();
        if (winner) {
          endGame(winner);
          return;
        }
        
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
      }
    } else {
      // Wrong answer
      showNotificationMessage(
        `¡Respuesta incorrecta! Jugador ${gameState.currentPlayer} pierde una vida.`,
        "error"
      );
      
      if (gameState.currentPlayer === 1) {
        gameState.player1Lives--;
        if (gameState.player1Lives === 0) {
          endGame(2);
          return;
        }
      } else {
        gameState.player2Lives--;
        if (gameState.player2Lives === 0) {
          endGame(1);
          return;
        }
      }
      gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    }
  }

  onMount(() => {
    loadQuestions();
    startTimer();
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  });
</script>

<LayoutGame gameState={{
  player1Lives: gameState.player1Lives,
  player2Lives: gameState.player2Lives,
  player1Character: gameState.player1Character,
  player2Character: gameState.player2Character,
  timeRemaining: gameState.timeRemaining,
  currentPlayer: gameState.currentPlayer
}}>
  {#each gameState.board as cell, index}
    <button
      class="cell"
      onclick={() => handleCellClick(index)}
      disabled={gameState.gameOver || cell !== null || showQuestion}
    >
      {cell}
    </button>
  {/each}
</LayoutGame>

{#if showQuestion && currentQuestion}
  <div class="question-modal">
    <div class="question-content">
      <h2>Pregunta para el Jugador {gameState.currentPlayer}</h2>
      <p>{currentQuestion.question}</p>
      <div class="options">
        {#each currentQuestion.options as option, i}
          <button onclick={() => handleAnswer(i)}>
            {option}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

{#if gameState.gameOver}
  <div class="game-over-modal">
    <div class="game-over-content">
      <h2>
        {#if gameState.winner === "tie"}
          ¡Empate!
        {:else}
          ¡Jugador {gameState.winner} gana!
        {/if}
      </h2>
      <button onclick={() => window.location.reload()}>
        Jugar de nuevo
      </button>
    </div>
  </div>
{/if}

{#if showNotification}
  <div class="notification" class:success={notificationType === "success"} class:error={notificationType === "error"}>
    {notificationMessage}
  </div>
{/if}

<style>
  .cell {
    background-color: var(--background);
    border: none;
    border-radius: 8px;
    font-size: var(--font-size-medium);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--primary-content);
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: var(--shadow-border-light);
    width: 100%;
    height: 100%;
    min-height: 0;
    min-width: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cell:disabled {
    cursor: not-allowed;
    color: var(--primary-content);
    opacity: 0.8;
  }

  .cell:hover:not(:disabled) {
    background-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .question-modal,
  .game-over-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .question-content,
  .game-over-content {
    background-color: var(--background);
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: modalAppear 0.3s ease-out;
  }

  @keyframes modalAppear {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .question-content h2,
  .game-over-content h2 {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-large);
  }

  .question-content p {
    color: var(--primary-content);
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-medium);
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .options button {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background-color: var(--primary);
    color: var(--primary-content);
    cursor: pointer;
    transition: all 0.2s ease;
    text-shadow: var(--shadow-border-light);
    font-size: var(--font-size-small);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .options button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .game-over-content {
    text-align: center;
  }

  .game-over-content button {
    margin-top: 1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    background-color: var(--primary);
    color: var(--primary-content);
    cursor: pointer;
    transition: background-color 0.3s;
    text-shadow: var(--shadow-border-light);
  }

  .game-over-content button:hover {
    background-color: var(--primary-dark);
  }

  .notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--primary-content);
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: var(--font-size-medium);
    font-weight: bold;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s forwards;
    text-shadow: var(--shadow-border-light);
    backdrop-filter: blur(4px);
  }

  .notification.success {
    background-color: var(--success, #28a745);
  }

  .notification.error {
    background-color: var(--warning, #ffc107);
  }

  @keyframes slideIn {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style> 