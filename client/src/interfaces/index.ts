import { ReactNode } from "react";

export interface IGlobalConfig {
  scaler: number;
  x: number;
  y: number;
  worldW: number;
  worldH: number;
  isSnack?: boolean;
  isBeer?: boolean;
  isCoffee?: boolean;
  isResidency?: boolean;
}

export interface IUser {
  id: string;
  avatar: string;
  userName: string;
  roomLayout: number;
  roomUrl: string;
  comp: number | null;
  roomX: number;
  roomY: number;
  isFollowingHost: boolean;
  x: number;
  y: number;
  wineTime: string | null;
  needsWine: boolean;
  cheeseTime: string | null;
  needsCheese: boolean;
  cocktailTime: string | null;
  needsCocktail: boolean;
  outside: boolean;
  isMuted: boolean;
  isGlobalMuted: boolean;
  isSpeaking: boolean;
  speakingId: string;
}

export interface IUsers extends Array<IUser> {}

export interface IBar {
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  roomPage?: number;
  tender: IUser;
  isFlipped: boolean;
}

export interface IBars extends Array<IBar> {}

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
  avatarClicked: () => void;
}

export interface IMenuBasic {
  isHidden: boolean;
}

export interface IMenu {
  mobile: string;
  map: IMenuBasic;
  faq: IMenuBasic;
  signIn: IMenuBasic;
  volume: IMenuBasic;
  chat: IMenuBasic;
  userIcons: IMenuBasic;
  liveStream: {
    isHidden: boolean;
    hasClicked: boolean;
  };
  isGalleryActive: boolean;
  currentGalleryId: number;
}

export interface IMessage {
  from: string;
  fromUser?: string;
  to: string;
  message: string;
  time: string;
  roomUrl: string;
  avatar: string;
  socketId?: string;
}

export interface IMessages {
  messages: IMessage[];
  notifications: number;
}

export interface IChat {
  sendMessage: (txt: string) => void;
  users: IUsers;
  textBox: string;
  onSubmit: (txt: string) => void;
  setRecipient: (user: IUser | null | undefined) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleTextBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IRoom {
  id: number;
  roomName?: string;
  shortcut?: string;
  classN?: string;
  link: string;
  userName?: string;
  // title: string,
  // artist: string,
  // artistLink: string,
  // medium?: string,
  // description: string,
  // year: number,
  artistID: number;
  x: number;
  y: number;
  dir: string;
}

export interface IArtist {
  id: number;
  roomID: number;
  name: string;
  thumb: string;
  nameLink: string;
  instaLink?: string;
  blueSkyLink?: string;
  webLink?: string;
  medium?: string | ReactNode;
  userName?: string;
  customLink?: string;
  description: string | ReactNode;
  statement?: string | ReactNode;
  bio: string | ReactNode;
  title: string;
  year: number;
}

export interface IDivs {
  doors: any[];
  bars: any[];
  lights: any[];
  roomLabels: any[];
  folders: any[];
  trashCans: any[];
  trashFolders: any[];
}

export type Vector2 = {
  x: number;
  y: number;
};

export type Player = {
  username: string;
  position: Vector2;
};

type JukeBoxState_Off = {
  type: "off";
};

type JukeBoxState_On = {
  type: "on";
  owner: string;
};

export type JukeBoxState = JukeBoxState_Off | JukeBoxState_On;

export type Inputs = {
  direction: Vector2;
};
