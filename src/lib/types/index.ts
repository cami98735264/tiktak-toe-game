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