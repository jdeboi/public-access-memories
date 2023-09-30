import ReactGA from 'react-ga4';

// google tracking
const ID = "G-7DGG49BX96"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(ID);

export const pageview = (url: string, title: string) => {
    ReactGA.send({ hitType: "pageview", page: url, title: title });
};

export const event = (category: string, action: string): void => {
    ReactGA.event({
        category: category,
        action: action
    });
};