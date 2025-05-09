// Stores types

export interface audioSettings {
    enable: boolean,
    volume: number,
}

export interface Audio {
    music: audioSettings,
    effects: audioSettings,
}


export interface Visual {
    backgroundStyle: 'classic' | 'digital' | 'grafitti' | 'neon' | 'minimalistic',
    colorTheme: 'light' | 'dark' | 'colorful'
}

export interface Game {
    lives: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    time: 180 | 300 | 420 | 540 | 660,
}


export interface assetMap {
    background: {
        classic: string,
        digital: string,
        grafitti: string,
        neon: string,
        minimalistic: string,
    },
    audios: {
        wrongAnswer: string,
        correctAnswer: string,
        gameStart: string,
        click: string,
        backgroundMusic: string,
        win: string,
        gameOver: string,
    },
    icons: {
        timerIcon: string,
        personIcon: string,
        heartIcon: string,
    },
    logos: {
        gameLogo: string
    }
}

export interface Preferences {
    audio: Audio,
    visual: Visual,
    game: Game,
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
        screen: 'game' | 'howToPlay' | 'settings.audio' | 'settings.visual' | 'playerNames',
        onClick?: () => void,
    }[],
    gameLogoPath: string,
}




// Components Props

// ToggleSwitchProps
  export interface ToggleSwitchProps {
	isActive?: boolean; // Default state of the toggle switch
	enableText?: string; // Text for the "enable" button
	disableText?: string; // Text for the "disable" button
	options?: ToggleSwitchOption[]; // Array of option strings for multi-option mode
	selectedOption?: string; // Currently selected option in multi-option mode
	propertyToChange?: string; // Property to change when toggled or selected
	multiOption?: boolean; // Whether to use multi-option mode or boolean toggle
  }
  export interface ToggleSwitchOption {
	label: string;
	value: string;
  }