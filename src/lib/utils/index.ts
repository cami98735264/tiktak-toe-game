import type { assetMap, Preferences, Visual, Audio } from '$lib/types/index.ts';
import { screens } from "$lib/stores/screens";
import { preferences } from '$lib/stores/preferences';
import { get } from 'svelte/store';

const getAssetUrl = (keyword: string) => {
    const assetMap: assetMap = {
        background: {
            classic: '/assets/backgrounds/fondo_original.png',
            digital: '/assets/backgrounds/fondo_digital.png',
            grafitti: '/assets/backgrounds/fondo_grafitti.png',
            neon: '/assets/backgrounds/fondo_neon.png',
            minimalistic: '/assets/backgrounds/fondo_minimalista.png',
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
        screens.set({ 
            currentScreen: screen, 
            previousScreen: screensData.currentScreen, 
            screenHistory: [...screensData.screenHistory, screensData.currentScreen], 
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


export { getAssetUrl, handleChangeScreen, handleChangePreferences };