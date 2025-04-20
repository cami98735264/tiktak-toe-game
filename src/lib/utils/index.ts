import type { assetMap, Preferences, Visual, Audio } from '$lib/types/index.ts';
import { screens } from "$lib/stores/screens";
import { preferences } from '$lib/stores/preferences';
import { get } from 'svelte/store';
// Track last play time for each audio file to prevent rapid multiple plays
const audioPlayTimes: Record<string, number> = {};
const DEBOUNCE_TIME = 50; // ms between allowed plays of the same sound


const getAssetUrl = (keyword: string) => {
    const assetMap: assetMap = {
        background: {
            classic: '/assets/backgrounds/fondo_original.png',
            digital: '/assets/backgrounds/fondo_digital.png',
            grafitti: '/assets/backgrounds/fondo_grafitti.png',
            neon: '/assets/backgrounds/fondo_neon.png',
            minimalistic: '/assets/backgrounds/fondo_minimalista.png',
        },
        audios: {
            wrongAnswer: '/assets/audios/effects/wrong-answer.mp3',
            correctAnswer: '/assets/audios/effects/correct-answer.mp3',
            gameStart: '/assets/audios/effects/game-start.mp3',
            click: '/assets/audios/effects/click.mp3',
            backgroundMusic: '/assets/audios/background/background-music.mp3',
            win: '/assets/audios/effects/win.mp3',
            gameOver: '/assets/audios/effects/game-over.mp3',
        },
        icons: {
            timerIcon: '/assets/icons/timer-icon.svg',
            personIcon: '/assets/icons/person-icon.svg',
            heartIcon: '/assets/icons/heart-icon.svg',
        },
        logos: {
            gameLogo: '/assets/logos/mathtriqui-logo.svg',
        }
    };
    // example usage: getAssetUrl('background.classic')
    const keys = keyword.split('.');
    let asset: any = assetMap;

    for (const key of keys) {
        if (typeof asset === 'object' && key in asset) {
            asset = asset[key];
        } else {
            return null;
        }
    }
    return asset;
}

let handleChangeScreen = (event: MouseEvent) => {
    let screensData = get(screens);
    const target = event.target as HTMLElement;
    const screen = target?.dataset?.screen;
    if (screen && screen !== screensData.currentScreen) {
        const updatedScreenHistory = screensData.screenHistory.includes(screensData.currentScreen)
            ? screensData.screenHistory
            : [...screensData.screenHistory, screensData.currentScreen];
        screens.set({ 
            currentScreen: screen, 
            previousScreen: screensData.currentScreen, 
            screenHistory: updatedScreenHistory, 
            currentScreenParams: {} 
        });
    }
};



let handleChangePreferences = (event: MouseEvent) => {
    let target = event.target as HTMLElement;
    let propertyToChange = target?.dataset?.property; // example: 'audio.music.enable'
    let value = target?.dataset?.value;
    let preferencesData = get(preferences);
    let keys = propertyToChange && propertyToChange.split('.');
    if (keys) {
        let currentPreferences: Preferences = preferencesData;
        for (let i = 0; i < keys.length - 1; i++) {
            currentPreferences = (currentPreferences as any)[keys[i]];
        }
        const lastKey = keys[keys.length - 1];
        if (currentPreferences && lastKey in currentPreferences) {
            let parsedValue: any;
            if (value === 'true' || value === 'false') {
                parsedValue = value === 'true';
            } else if (!isNaN(Number(value))) {
                parsedValue = Number(value);
            } else {
                parsedValue = value;
            }
            (currentPreferences as Record<string, any>)[lastKey] = parsedValue;
            preferences.set(preferencesData);
        }
    }
}

function playAudio(pref: any, audioPath: string): void {
  if (!pref.audio.effects.enable) return;
  
  // Prevent rapid successive plays of the same sound
  const now = Date.now();
  if (audioPlayTimes[audioPath] && now - audioPlayTimes[audioPath] < DEBOUNCE_TIME) {
    return; // Skip if the same sound was played very recently
  }
  audioPlayTimes[audioPath] = now;
  
  // Create audio context if it doesn't exist
  const audioContext = new AudioContext();
  
  // Load and play the audio
  fetch(audioPath)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = pref.audio.effects.volume / 100;
      
      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start playing
      source.start(0);
      
      // Clean up after playback
      source.onended = () => {
        source.disconnect();
        gainNode.disconnect();
        audioContext.close();
      };
    })
    .catch(err => {
      console.error("Failed to play audio:", err);
      audioContext.close();
    });
}
export { getAssetUrl, handleChangeScreen, handleChangePreferences, playAudio };