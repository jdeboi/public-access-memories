import { configureStore } from '@reduxjs/toolkit';
import { menuSlice } from './menu';
import { messagesSlice } from './messages';
import { musicSlice } from './music';
import { userSlice } from './user';
import { userActiveSlice } from './userActive';
import { windowSlice } from './window';

// reset app??
// const rootReducer = (state, action) => {
//     if (action.type === 'counter/logout') { // check for action type 
//       state = undefined;
//     }
//     return combinedReducer(state, action);
//   };

//   export default configureStore({
//     reducer: rootReducer,
//     middleware: [...getDefaultMiddleware()]
//   });


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        userActive: userActiveSlice.reducer,
        window: windowSlice.reducer,
        menu: menuSlice.reducer,
        messages: messagesSlice.reducer,
        music: musicSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export const selectUser = (state: RootState) => state.user;
export const selectUserActive = (state: RootState) => state.userActive;
export const selectWindow = (state: RootState) => state.window;
export const selectMenu = (state: RootState) => state.menu;
export const selectMessages = (state: RootState) => state.messages;
export const selectMusic = (state: RootState) => state.music;

export default store;