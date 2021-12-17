



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, BarLocation, BarLocations } from '../interfaces';

import socket from '../helpers/Socket';

const initialState: IUser = {
    id: "0",
    avatar: "😀",
    userName: "",
    room: "gallery",
    comp: null,
    roomX: 0,
    roomY: 0,
    x: 0,
    y: 0,
    wineTime: null,
    needsWine: false,
    cheeseTime: null,
    needsCheese: false,
    cocktailTime: null,
    needsCocktail: false,
    outside: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserRoom: (state, action: PayloadAction<{ room: string }>) => {
            // redux toolkit allows us to "mutate" state (not exactly what's happening)
            const prevRoom = state.room;
            const nextRoom = action.payload.room;
            state.roomX = 50;
            state.roomY = 50;
            state.room = nextRoom;
            // socket.emit("leaveRoom", prevRoom);
            // socket.emit("joinRoom", nextRoom);
            // socket.emit("setUser", state);
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.avatar = action.payload.avatar;
            state.userName = action.payload.userName;
            state.id = action.payload.id;
            state.x = action.payload.x;
            state.y = action.payload.y;
            state.room = action.payload.room;
            // TODO
            // const comp = Cookies.get('comp');
            // if (comp)
            //   state.comp = comp;
            // Cookies.set("hasAvatar", true);
            // Cookies.set("avatar", user.avatar);
            // Cookies.set("userName", user.userName);
            // socket.emit("setUser", state);
        },
        setUserLogin: (state, action: PayloadAction<{ userName: string, avatar: string }>) => {
            state.avatar = action.payload.avatar;
            state.userName = action.payload.userName;
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        removeUserComp: (state) => {
            state.comp = null;
            // TODO
            //   Cookies.remove("comp");
        },
        setUserComp: (state, action: PayloadAction<number>) => {
            state.comp = action.payload;
            // Cookies.set("comp", user.comp);
        },
        moveUser: (state, action: PayloadAction<{ x: number, y: number, barLocations: BarLocations }>) => {
            state.x = action.payload.x;
            state.y = action.payload.y;
            const barLocations = action.payload.barLocations;
            if (userNearBar(state, barLocations[1]) && state.needsWine) {
                state.needsWine = false;
                state.wineTime = new Date();
            }
            else if (userNearBar(state, barLocations[0]) && state.needsCheese) {
                state.needsCheese = false;
                state.cheeseTime = new Date();
            }
            else if (userNearBar(state, barLocations[2]) && state.needsCocktail) {
                state.needsCocktail = false;
                state.cocktailTime = new Date();
            }
            // socket.emit("setUser", state);
        },
        addWine: (state, action: PayloadAction<{ location: BarLocation }>) => {
            state.needsWine = true;
            // console.log("WINE", location);
            if (userNearBar(state, action.payload.location)) {
                state.needsWine = false;
                state.wineTime = new Date();
            }
            // socket.emit("setUser", state);
        },
        setWine: (state, action: PayloadAction<{ needsWine: boolean, wineTime: Date }>) => {
            state.needsWine = action.payload.needsWine;
            state.wineTime = action.payload.wineTime;
            // socket.emit("setUser", state);
        },
        resetWine: (state) => {
            state.wineTime = null;
            state.needsWine = false;
            // socket.emit("setUser", state);
        },
        addCheese: (state, action: PayloadAction<{ location: BarLocation }>) => {
            state.needsCheese = true;
            let loc = action.payload.location;
            if (userNearBar(state, loc)) {
                state.needsCheese = false;
                state.cheeseTime = new Date();
            }
            // socket.emit("setUser", state);
        },
        setCheese: (state, action: PayloadAction<{ needsCheese: boolean, cheeseTime: Date }>) => {
            state.needsCheese = action.payload.needsCheese;
            state.cheeseTime = action.payload.cheeseTime;
            // socket.emit("setUser", state);
        },
        resetCheese: (state) => {
            state.cheeseTime = null;
            state.needsCheese = false;
            // socket.emit("setUser", state);
        },

        addCocktail: (state, action: PayloadAction<{ location: BarLocation }>) => {
            state.needsCocktail = true;
            if (userNearBar(state, action.payload.location)) {
                state.needsCocktail = false;
                state.cocktailTime = new Date();
            }
            // socket.emit("setUser", state);
        },
        setCocktail: (state, action: PayloadAction<{ needsCocktail: boolean, cocktailTime: Date }>) => {
            state.needsCocktail = action.payload.needsCocktail;
            state.cocktailTime = action.payload.cocktailTime;
            // socket.emit("setUser", state);
        },
        resetCocktail: (state) => {
            state.needsCocktail = false;
            state.cocktailTime = null;
            // socket.emit("setUser", state);
        },
        toggleOutside: (state) => {
            state.outside = !state.outside;
        }
    }
})


function userNearBar(user: IUser, location: BarLocation) {
    var dx = user.x - (location.x + location.w / 2);
    var dy = user.y - (location.y + location.h / 2);
    var dis = Math.sqrt(dx * dx + dy * dy);
    // console.log("DIS", dis < 200);
    return dis < 200;
}

export const {
    setUserRoom, setUser, setUserID, setUserLogin, moveUser,
    addCheese, setCheese, resetCheese,
    addWine, setWine, resetWine,
    addCocktail, setCocktail, resetCocktail,
    toggleOutside
} = userSlice.actions;