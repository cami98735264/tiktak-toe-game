// Stores types

interface audioSettings {
    enable: boolean,
    volume: number,
}

interface Audio {
    music: audioSettings,
    effects: audioSettings,
}


interface Visual {
    backgroundStyle: 'classic' | 'digital' | 'grafitti' | 'neon' | 'minimalistic',
    colorTheme: 'light' | 'dark' | 'colorful'
}



export interface assetMap {
    background: {
        classic: string,
        digital: string,
        grafitti: string,
        neon: string,
        minimalistic: string,
    }
}

export interface Preferences {
    audio: Audio,
    visual: Visual,
}

export interface Screens {
    currentScreen: string,
    previousScreen: string,
    screenHistory: string[],
    currentScreenParams: Record<string, any>,
}


// Screens Props
export interface MainMenuProps {
    menuOptions: {
        label: string,
        screen: 'game' | 'howToPlay' | 'settings.audio' | 'settings.visual',
    }[],
    gameLogoPath: string,
}