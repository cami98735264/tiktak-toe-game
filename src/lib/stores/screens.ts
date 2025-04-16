import { persisted } from "svelte-persisted-store";
import type { Screens } from "$lib/types";


export const screens = persisted("screens", {
  currentScreen: "mainMenu",
  previousScreen: "mainMenu",
  screenHistory: [],
  currentScreenParams: {},
} as Screens);
