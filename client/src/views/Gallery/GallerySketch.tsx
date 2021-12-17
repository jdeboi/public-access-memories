import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {IUsers} from '../../interfaces';

interface ComponentProps {
	users: IUsers
}

const GallerySketch: React.FC<ComponentProps> = (props: ComponentProps) => {
	let x = 50;
	const y = 50;

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(255, 0, 0);
		p5.ellipse(p5.random(200), p5.random(255), 50);
		console.log(props.users.length)
		p5.textSize(30);
		for (const user of props.users) {
			p5.ellipse(p5.random(200), p5.random(255), 50);
			p5.text(user.avatar, 200, 200);
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default GallerySketch;
