
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWindowUI } from '../interfaces';

let initW = typeof window === 'object' ? window.innerWidth : 0;
let initH = typeof window === 'object' ? window.innerHeight : 0;
const footerMobileH = 60;
const headerMobileH = 60;
const headerH = 34;

const initialState: IWindowUI = {
    width: initW,
    height: initH,
    isMobile: getIsMobile(),
    orientation: getOrientation(initW, initH),
    size: getWindowSize(initW),
    hasFooter: getHasFooter(initW, initH),
    loading: true,
    headerH: getHeaderH(initW, initH),
    toolbarH: 26,
    contentW: getContentW(initW, initH),
    contentH: getContentH(initW, initH),
    compositionStarted: false,
    edgeSpacing: getEdgeSpacing(initW, initH)
};




function getHasFooter(w: number, h: number) {
    //788
    return (w < 835 || h < 600);
}

function getOrientation(w: number, h: number) {
    return w > h ? "landscape" : "portrait";
}

function getIsMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function getWindowSize(w: number) {
    if (!w)
        return 'medium';
    else if (w < 340)
        return 'xxsmall';
    else if (w < 480)
        return 'xsmall';
    else if (w < 788)
        return 'small';
    else if (w < 992)
        return 'medium';
    else if (w < 1200)
        return 'large';
    return 'xlarge';
}

function getContentW(w: number, h: number) {
    if (getHasFooter(w, h) || getIsMobile()) {
        if (getOrientation(w, h) === "portrait") {
            return w;
        }
        return w - footerMobileH; // right hand menu
    }
    return w;
}

function getContentH(w: number, h: number) {
    if (getHasFooter(w, h) || getIsMobile()) {
        if (getOrientation(w, h) === "portrait") {
            return h - footerMobileH - headerMobileH;
        }
        return h - headerMobileH;
    }
    return h - headerH;
}

function getHeaderH(w: number, h: number) {
    return (getHasFooter(w, h) || getIsMobile()) ? headerMobileH : headerH;
}

function getEdgeSpacing(w: number, h: number) {
    if (w < 800)
        return 10;
    else if (w >= 1920)
        return 30;
    return 20;
}


export const windowSlice = createSlice({
    name: "window",
    initialState,
    extraReducers: {
        reset: (state) => {
            Object.assign(state, initialState)
        },
    },
    reducers: {
        resizeApp: (state, action) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
            state.isMobile = getIsMobile();

            if (state.width  > 0 && state.height > 0) {
                state.orientation = getOrientation(state.width, state.height);
                state.size = getWindowSize(state.width);
                state.hasFooter = getHasFooter(state.width, state.height);
                state.headerH = getHeaderH(state.width, state.height);
                state.contentW = getContentW(state.width, state.height);
                state.contentH = getContentH(state.width, state.height);
                state.edgeSpacing = getEdgeSpacing(state.width, state.height);
            }
        },
        loadingApp: (state) => {
            state.loading = true;
        },
        doneLoadingApp: (state) => {
            state.loading = false;
            state.compositionStarted = false;
        },
        startComposition: (state) => {
            state.compositionStarted = true;
        }

    }
})


export const {
    resizeApp,
    loadingApp,
    doneLoadingApp,
    startComposition,
} = windowSlice.actions;