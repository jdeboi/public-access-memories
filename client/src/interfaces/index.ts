export interface IUser {
    id: string;
    avatar: string;
    userName: string;
    room: string;
    comp: number | null;
    roomX: number;
    roomY: number;
    x: number;
    y: number;
    wineTime: Date | null;
    needsWine: boolean;
    cheeseTime: Date | null;
    needsCheese: boolean;
    cocktailTime: Date | null;
    needsCocktail: boolean;
    outside: boolean;
}


export interface IUsers extends Array<IUser> { }

export interface BarLocation {
    type: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface BarLocations extends Array<BarLocation> { }

export interface IWindowUI {
    width: number;
    height: number;
    isMobile: boolean;
    orientation: string;
    size: string;
    hasFooter: boolean;
    loading: boolean;
    headerH: number;
    toolbarH: number;
    contentW: number;
    contentH: number;
    compositionStarted: boolean;
    edgeSpacing: number;
}

export interface IListItem {
    title: string;
    link: string;
    shortcut?: string;
    classN?: string;
}

export interface IMainMenu {
    isClosed: boolean;
    isMenuOn: boolean;
}

export interface IHeaderProps extends IMainMenu {
    avatarClicked: () => void
}


export interface IMenuBasic {
    isHidden: boolean
}

export interface IMenu {
    mobile: string;
    map: IMenuBasic
    faq: IMenuBasic
    signIn: IMenuBasic
    volume: IMenuBasic
    chat: IMenuBasic
    userIcons: IMenuBasic
    liveStream: {
        isHidden: boolean;
        hasClicked: boolean;
    };
    isGalleryActive: boolean;
}


export interface IMessage {
    from: string,
    to: string,
    message: string,
    time: Date,
    avatar: string
}

export interface IMessages {
    messages: IMessage[],
    notifications: number
}

export interface IChat {
    sendMessage: (txt: string) => void;
    users: IUsers, 
    textBox: string,
    onSubmit: (txt: string) => void;
    setRecipient: (user: IUser | null | undefined) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleTextBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
    

export interface IRoom {
    id: number,
    roomName: string,
    shortcut?: string,
    classN?: string,
    link: string,
    title: string,
    artist: string,
    medium: string,
    description: string,
    year: number
}