import { persisted } from 'svelte-persisted-store'

// First param `preferences` is the local storage key.
// Second param is the initial value.
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
});