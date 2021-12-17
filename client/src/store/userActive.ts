



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    active: { userName:"", avatar: "", id: ""},
    hover: {userName: "", avatar: "", id: ""},
}

export const userActiveSlice = createSlice({
    name: "userActive",
    initialState,
    reducers: {
        setUserActiveChat: (state, action: PayloadAction<{userName: string, avatar:  string}>) => {
            state.active.userName = action.payload.userName;
            state.active.avatar = action.payload.avatar;
        },
        setUserHoverChat: (state, action: PayloadAction<{userName: string, avatar:  string}>) => {
            state.hover.userName = action.payload.userName;
            state.hover.avatar = action.payload.avatar;
        },
        userHoverChatLeave: (state) => {
            state.hover.userName = "";
            state.hover.avatar = "";
        }
    }
})



export const {
    setUserActiveChat, setUserHoverChat, userHoverChatLeave
} = userActiveSlice.actions;