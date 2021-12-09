import { LOADINGAPP, DONELOADINGAPP, RESIZEAPP, STARTCOMPOSITION } from '../actions';

let initW = typeof window === 'object' ? window.innerWidth : null;
let initH = typeof window === 'object' ? window.innerHeight : null;
const footerMobileH = 60;
const headerMobileH = 60;
const headerH = 34;

const initialState = {
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

function getHasFooter(w, h) {
    //788
    return (w < 835 || h < 600);
}

function getOrientation(w, h) {
    return w > h ? "landscape" : "portrait";
}

function getIsMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function getWindowSize(w) {
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

function getContentW(w, h) {
    if (getHasFooter(w, h) || getIsMobile(w, h)) {
        if (getOrientation(w, h) === "portrait") {
            return w;
        }
        return w - footerMobileH; // right hand menu
    }
    return w;
}

function getContentH(w, h) {
    if (getHasFooter(w, h) || getIsMobile(w, h)) {
        if (getOrientation(w, h) === "portrait") {
            return h - footerMobileH - headerMobileH;
        }
        return h - headerMobileH;
    }
    return h - headerH;
}

function getHeaderH(w, h) {
    return (getHasFooter(w, h) || getIsMobile()) ? headerMobileH : headerH;
}

function getEdgeSpacing(w, h) {
    if (w < 800)
        return 10;
    else if (w >= 1920)
        return 30;
    return 20;
}

export const windowReducer = (state = initialState, action) => {

    const window = { ...state };
    switch (action.type) {

        case RESIZEAPP:
            window.width = action.payload.width;
            window.height = action.payload.height;
            window.orientation = getOrientation(window.width, window.height);
            window.isMobile = getIsMobile();
            window.size = getWindowSize(window.width);
            window.hasFooter = getHasFooter(window.width, window.height);
            window.headerH = getHeaderH(window.width, window.height);
            window.contentW = getContentW(window.width, window.height);
            window.contentH = getContentH(window.width, window.height);
            window.edgeSpacing = getEdgeSpacing(window.width, window.height);
            return window;

        case LOADINGAPP:
            window.loading = true;
            return window;

        case DONELOADINGAPP:
            window.loading = false;
            window.compositionStarted = false;
            return window;

        case STARTCOMPOSITION:
            window.compositionStarted = true;
            return window;
        
            default:
            return state;

    }
}