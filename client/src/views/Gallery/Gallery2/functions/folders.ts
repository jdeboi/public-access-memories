import { GlobalConfig } from "../../../../data/GlobalConfig";
import p5Types from 'p5';
import Folder from "../../Gallery1/p5/components/Folder";

export const addFolderDivs = (divs: any, instaImg: p5Types.Image, txtFile:  p5Types.Image, p5: p5Types) => {
    divs.folders = [];
    
    let p0 = {x: GlobalConfig.scaler* 25, y: GlobalConfig.scaler* 26.5}
    let p1 = {x: GlobalConfig.scaler* 27.5, y: GlobalConfig.scaler* 24.5}
    let p2 = {x: GlobalConfig.scaler* 25, y: GlobalConfig.scaler* 13.5}
    let labels = [
        { x: p0.x, y: p0.y, label: "show statement", link: "https://publicaccessmemories.com/exhibition" },
        { x: p1.x, y: p1.y, label: "about gallery", link: "https://publicaccessmemories.com/about" },
        { x: p2.x, y: p2.y, label: "@public.access.memories", link: "https://www.instagram.com/public.access.memories/" }
    ];

    for (let i = 0; i < 3; i++) {
        const { x, y, label, link } = labels[i];
        const folder = new Folder(p5, i, x, y, label, link, (i === 2 ? instaImg : txtFile));
        divs.folders.push(folder);
    }
}