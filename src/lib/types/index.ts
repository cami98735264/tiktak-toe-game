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