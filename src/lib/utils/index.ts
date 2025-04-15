import type { assetMap } from '$lib/types/index.ts';

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

export { getAssetUrl };