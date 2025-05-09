import { persisted } from 'svelte-persisted-store'
import type { Preferences } from '$lib/types/index.ts';

export const preferences = persisted('preferences', {
  audio: {
    music: {
        enable: true,
        volume: 50,
    },
    effects: {
        enable: true,
        volume: 50,
    }
  },
  visual: {
    backgroundStyle: 'classic',
    colorTheme: 'light'
  },
  game: {
    lives: 5,
    time: 300,
  }
} as Preferences);

