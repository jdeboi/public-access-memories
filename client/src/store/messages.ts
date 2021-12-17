
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IMessage, IMessages} from '../interfaces';


const initialState: IMessages = {
    messages: [],
    notifications: 0
};


export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages = [...state.messages, action.payload];
        },
        incremendNotifications: (state) => {
            state.notifications += 1;
        },
        resetNotifications: (state) => {
            state.notifications = 0;
        }

    }
})


export const {
    addMessage, incremendNotifications,
    resetNotifications
} = messagesSlice.actions;
