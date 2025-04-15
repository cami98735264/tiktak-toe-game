import { persisted } from "svelte-persisted-store";

export const screens = persisted("screens", {
    currentScreen: "mainMenu",
    previousScreen: "mainMenu",
    screenHistory: [],
    currentScreenParams: {},
});