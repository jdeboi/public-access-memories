import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { IUser, IUsers } from '../../interfaces';

import Bar from './components/Bars/Bar';



interface ComponentProps {
	user: IUser;
	users: IUsers;
	roomCount: number;
	isClosed: boolean;
	userMove: (x: number, y: number) => void;
	userNewRoom: (room: string) => void;
	loadingDone: () => void;
	toggleOutside: () => void;
	isMobile: boolean;
	clickedUserChat: (user: IUser) => void;
}

let bar : any;

const GallerySketch: React.FC<ComponentProps> = (props: ComponentProps) => {

	

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
		bar = new Bar( {x: 100, y: 100, w: 50, h:100, type: "wine"}, p5);
	};

	const draw = (p5: p5Types) => {
		p5.clear();
		p5.textSize(30);
		for (const usr of props.users) {
			if (usr.roomUrl === "/") {
				p5.text(usr.avatar, usr.x, usr.y);
			}

		}

		p5.text(props.user.avatar, p5.width/2, p5.height/2);
		// bar.display();
	};

	const displayRooms = (p5: p5Types) => {

	}

	const displayCheckers = (numW: number, numH: number, w: number, h: number, p5: p5Types) => {
		for (let x = 0; x < numW; x++) {
			for (let y = 0; y < numH; y++) {
				if ((x%2) === (y%2)) {
					p5.fill(200);
				}
				else {
					p5.fill(255);
				}
				p5.rect(x*w, y*h, w, h);
			}
		}
	}

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
	}


	return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default GallerySketch;
