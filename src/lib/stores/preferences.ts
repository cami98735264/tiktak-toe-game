import { persisted } from 'svelte-persisted-store'
import type { Preferences } from '$lib/types/index.ts';

export const preferences = persisted('preferences', {
  audio: {
    music: {
        enable: true,
        volume: 0.5,
    },
    effects: {
        enable: true,
        volume: 0.5,
    }
  },
  visual: {
    backgroundStyle: 'classic',
    colorTheme: 'light'
  }
} as Preferences);