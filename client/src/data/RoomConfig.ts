import { IRoom } from '../interfaces';

export const roomConfig = {
    w: 3,
    h: 3,
    start: .1,
    end: .8
}

export const rooms: IRoom[] = [
    {
        id: 0,
        title: "memory motel",
        link: "/memory-motel",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2021,
        x: 1*roomConfig.w, 
        y: 1*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 1,
        title: "dotcommmunion",
        link: "/dotcommmunion",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 2*roomConfig.w,
        y: 2*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 2,
        title: "flash ephemera",
        link: "/flash-ephemera",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 3*roomConfig.w,
        y: 4*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 3,
        title: "interstitial states",
        link: "/interstitial-states",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 2*roomConfig.w,
        y: 5*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 4,
        title: "good host",
        link: "/good-host",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 1*roomConfig.w,
        y: 6*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 5,
        title: "gooey",
        link: "/gooey",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 4*roomConfig.w,
        y: 7*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 6,
        title: "pipedreams",
        link: "/pipedreams",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 5*roomConfig.w,
        y: 8*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 7,
        title: "red room",
        link: "/red-room",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 6*roomConfig.w,
        y: 5*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 8,
        title: "future fountains",
        link: "/future-fountains",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 7*roomConfig.w,
        y: 4*roomConfig.w,
        dir: "bottom"
    },
    {
        id: 9,
        title: "cachebox",
        link: "/cachebox",
        artist: "TBA",
        medium: "custom software",
        description: "",
        year: 2022,
        x: 8*roomConfig.w,
        y: 3*roomConfig.w,
        dir: "bottom"
    }
];
