



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    active: { userName:"", avatar: "", id: ""},
    hover: {userName: "", avatar: "", id: ""},
}

export const userActiveSlice = createSlice({
    name: "userActive",
    initialState,
    extraReducers: {
        reset: (state) => {
            Object.assign(state, initialState)
        },
    },
    reducers: {
        setUserActiveChat: (state, action: PayloadAction<{userName: string, avatar:  string, id: string}>) => {
            state.active.userName = action.payload.userName;
            state.active.avatar = action.payload.avatar;
            state.active.id = action.payload.id;
        },
        setUserHoverChat: (state, action: PayloadAction<{userName: string, avatar:  string, id: string}>) => {
            state.hover.userName = action.payload.userName;
            state.hover.avatar = action.payload.avatar;
            state.active.id = action.payload.id;
        },
        userHoverChatLeave: (state) => {
            state.hover.userName = "";
            state.hover.avatar = "";
            state.active.id = "";
        }
    }
})



export const {
    setUserActiveChat, setUserHoverChat, userHoverChatLeave
} = userActiveSlice.actions;