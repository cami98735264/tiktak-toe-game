import type { assetMap } from '$lib/types/index.ts';
import { screens } from "$lib/stores/screens";
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
    if (screen) {
        screens.set({ 
            currentScreen: screen, 
            previousScreen: screensData.currentScreen, 
            screenHistory: [...screensData.screenHistory, screensData.currentScreen], 
            currentScreenParams: {} 
        });
    }
};

export { getAssetUrl, handleChangeScreen };