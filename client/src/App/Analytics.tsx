import ReactGA from 'react-ga';

const TRACKING_ID = "G-7DGG49BX96"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(TRACKING_ID);

export const pageview = (url: string) => {
    ReactGA.pageview(url);
};

export const event = (category: string, action: string): void => {
    ReactGA.event({
        category: category,
        action: action
    });
};