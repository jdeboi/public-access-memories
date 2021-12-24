import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { IUser, IUsers } from '../../interfaces';
import { GlobalConfig, limits } from "../../data/GlobalConfig";
import {rooms as globalRooms} from '../../data/RoomConfig';
import { roundToMult2 } from '../../helpers/helpers';

import { connect } from "react-redux";
import { selectUser, RootState } from '../../store/store';
import {moveUser} from '../../store/user';

import { addLightDivs, checkDivPress, addBarDivs, addRoomLabelDivs, updateDivs, displayBarDivs, displayLightDivs, endDivDrag } from "./functions/divs";
import { doorCrossing, roomDoorCrossing, roomDoorEntryCrossing, roomDoorBoundary, roomBoundary, wallBoundary } from './functions/crossing';
import { reachedDestination, getNextStep, showMouseLoc, showUserEllipses, showDestination, mouseDidMove } from './functions/destination';
import { drawUser, drawUsers, checkUserClicked } from './functions/users';
import { boundaryLineCrossing } from './components/Room/Boundaries';

import Room from './components/Room/Room';


interface ComponentProps {
	users: IUsers;
	roomCount: number;
	isClosed: boolean;
	userMove: (x: number, y: number) => void;
	userNewRoom: (room: string) => void;
	loadingDone: () => void;
	toggleOutside: () => void;
	isMobile: boolean;
	setUserActive: (user: IUser) => void;
	clickedUserChat: (user: IUser) => void;
}

// redux props
interface StateProps {
	user: IUser;
}
// dispatch props = functions to execute
interface DispatchProps {
}

interface Props extends ComponentProps, StateProps, DispatchProps {}

// TODO - convert these to Typescript
let eyeIcon: any;
let bar: any;
const lightImgs: any[] = [];
const barEmojis: any[] = [];
const divs: any[] = [];
const rooms: any[] = [];
let font: any;
// let user: IUser;

//////////////
// MOVEMENT
let isWalking = false;
const stepTo = { x: 0, y: 0 };
const userEase = { x: 0, y: 0 };
const destination = { x: 0, y: 0, time: new Date() };
let lastMouseMove = new Date();



class GallerySketch extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	preload = (p5: p5Types) => {
		const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

		lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
		lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
		lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
		lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

		barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
		barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
		barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
		barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
		barEmojis[4] = p5.loadImage(url + "emojis/chat.png");

		eyeIcon = p5.loadImage(url + "eye.png")
		font = p5.loadFont(url + "fonts/dogica.ttf");
	}

	//See annotations in JS for more information
	setup = (p5: p5Types, canvasParentRef: Element) => {
		const { user, loadingDone } = this.props;
		p5.frameRate(20);
		const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
		cnv.parent(canvasParentRef);
		cnv.mousePressed(() => this.triggerMove(p5));

		stepTo.x = user.x;
		stepTo.y = user.y;
		destination.x = stepTo.x;
		destination.y = stepTo.y;

		for (let i = 0; i < globalRooms.length; i++) {
			rooms.push(new Room(p5, i));
		}


		this.initDivs(p5);
		// this.dispatch(moveUser({x:1, y:1} ));

		loadingDone();
	};

	draw = (p5: p5Types) => {
		const { user, users } = this.props;
		p5.clear();
		p5.push();

		///////////////////////////////////
		p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
		p5.push();
		p5.translate(-userEase.x, -userEase.y);
		p5.push();
		p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)
		///////////////////////////////////
		this.displayCheckers(40, 40, GlobalConfig.scaler / 2, GlobalConfig.scaler / 2, p5);
		this.displayRooms();
		// displayWalls(p5);

		///////////////////////////////////
		p5.pop(); // global config
		p5.pop(); // userEase
		p5.pop(); // windowWidth/2
		///////////////////////////////////

		this.mouseStep();
		this.showTarget(p5);
		this.drawOverTarget(p5);
		drawUser(user, p5, barEmojis);
		this.drawOverUser(p5);


		///////////////////////////////////

		if (users)
			updateDivs(userEase, users, divs);
		this.updateUserEase(p5);
		this.manualResize(p5);
	};


	initDivs = (p5: p5Types) => {
		addLightDivs(divs, lightImgs, p5);
		addBarDivs(divs, lightImgs[3], p5);
		addRoomLabelDivs(divs, eyeIcon, p5);
	}


	displayWalls = (p5: p5Types) => {
		const walls = limits.map(pt => { return { x: pt.x * GlobalConfig.scaler, y: pt.y * GlobalConfig.scaler } });
		for (let i = 0; i < walls.length - 1; i++) {
			p5.line(walls[i].x, walls[i].y, walls[i + 1].x, walls[i + 1].y)
		}
	}

	displayRooms = () => {
		for (const room of rooms) {
			room.display(font, 0);
		}
	}

	displayCheckers = (numW: number, numH: number, w: number, h: number, p5: p5Types) => {
		for (let x = 0; x < numW; x++) {
			for (let y = 0; y < numH; y++) {
				if ((x % 2) === (y % 2)) {
					p5.fill(200);
				}
				else {
					p5.fill(255);
				}
				p5.rect(x * w, y * h, w, h);
			}
		}
	}

	drawOverTarget = (p5: p5Types) => {
		const { users } = this.props;
		p5.push();
		p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
		p5.translate(-userEase.x, -userEase.y);
		p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)

		if (users)
			drawUsers(userEase, users, font, p5, barEmojis);

		p5.pop();
	}

	drawOverUser = (p5: p5Types) => {
		p5.push();
		p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
		p5.translate(-userEase.x, -userEase.y);
		p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler);
		displayBarDivs(userEase.x, userEase.y, divs);
		displayLightDivs(userEase.x, userEase.y, divs);
		// displayColumnDivs(userEase.x, userEase.y, divs);
		p5.pop();
	}

	////////////////////////////////////////////////////////////////////////
	// MOVEMENT
	////////////////////////////////////////////////////////////////////////
	showTarget = (p5: p5Types) => {
		const { isMobile } = this.props;
		showDestination(userEase, destination, isWalking, p5);
		showUserEllipses(userEase, destination, isWalking, p5);

		if (mouseDidMove(p5)) {
			lastMouseMove = new Date();
		}
		showMouseLoc(isMobile, lastMouseMove, p5);
	}

	userTakeStep = (x: number, y: number) => {
		const { isClosed, isMobile, userNewRoom } = this.props;
		var t = new Date();
		let space = GlobalConfig.scaler;
		const prevStep = { x: stepTo.x, y: stepTo.y }
		const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
		// const outsideDoor = doorCrossing(doors, prevStep, userStep);
		const roomDoorEntry = roomDoorEntryCrossing(rooms, prevStep, userStep);
		const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
		const roomDoorB = roomDoorBoundary(rooms, prevStep, userStep);

		// const walls = limits.map(pt => { return { x: pt.x * GlobalConfig.scaler, y: pt.y * GlobalConfig.scaler } });

		if (!isClosed && roomDoor) {
			if (!isMobile) {
				if (window.confirm('Leave the main gallery?')) {
					userNewRoom(roomDoor);
				}
			}
			else {
				userNewRoom(roomDoor);
			}
			isWalking = false;
		}
		// else if (!props.isClosed && outsideDoor) {
		// 	stepTo.x = userStep.x;
		// 	stepTo.y = userStep.y;
		// 	props.toggleOutside();
		// }
		else if (!isClosed && roomDoorEntry) {
			stepTo.x = userStep.x;
			stepTo.y = userStep.y;
		}
		else if (!isClosed && roomBoundary(rooms, prevStep, userStep)) {
			isWalking = false;
		}
		else if (!isClosed && roomDoorB) {
			isWalking = false;
		}
		// else if (wallBoundary(walls, prevStep, userStep)) {
		// 	isWalking = false;
		// }
		else if (boundaryLineCrossing(prevStep, userStep, limits, GlobalConfig)) {
			isWalking = false;
		}
		else {
			stepTo.x = userStep.x;
			stepTo.y = userStep.y;
		}
	}

	updateUserEase = (p5: p5Types) => {
		const { userMove } = this.props;
		if (!reachedDestination(userEase, stepTo)) {
			let amt = .7;
			userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
			userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
			let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
			if (d < 15) {
				userEase.x = stepTo.x;
				userEase.y = stepTo.y;
				// isStepping = false;
				userMove(userEase.x, userEase.y);
			}

		}
	}

	triggerMove = (p5: p5Types) => {
		const { users, setUserActive, user } = this.props;
		let userClicked = null;
		if (users)
			userClicked = checkUserClicked(userEase, users, p5);
		if (userClicked) {
			setUserActive(userClicked);
			return;
		}
		else if (checkDivPress(userEase.x, user.y, divs))
			return;

		else {
			let steps = GlobalConfig.scaler - 20;
			const dx = p5.mouseX > p5.windowWidth / 2 ? steps : -steps;
			const dy = p5.mouseY > p5.windowHeight / 2 ? steps : -steps;
			const mx = roundToMult2((p5.mouseX - p5.windowWidth / 2) + dx, GlobalConfig.scaler);
			const my = roundToMult2((p5.mouseY - p5.windowHeight / 2) + dy, GlobalConfig.scaler);
			if (!(mx === 0 && my === 0)) {
				destination.x += mx;
				destination.y += my;
				destination.time = new Date();
				isWalking = true;
			}
		}

	}

	mouseStep = () => {
		const t = new Date().getTime() - destination.time.getTime();

		if (isWalking) {
			if (reachedDestination(stepTo, destination)) {
				isWalking = false;
			}
			else if (t > 150) {
				let step = getNextStep(stepTo, destination);

				this.userTakeStep(step[0], step[1]);
				destination.time = new Date();
			}
		}
	}

	mouseReleased = (p5: p5Types) => {
		endDivDrag(divs);
	}

	keyPressed = (p5: p5Types) => {
		if (p5.keyCode === p5.UP_ARROW) {
			this.userTakeStep(0, -1);
		}
		else if (p5.keyCode === p5.RIGHT_ARROW) {
			this.userTakeStep(1, 0);
		}
		else if (p5.keyCode === p5.LEFT_ARROW) {
			this.userTakeStep(-1, 0);
		}
		else if (p5.keyCode === p5.DOWN_ARROW) {
			this.userTakeStep(0, 1);
		}
	}

	windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
	}


	manualResize = (p5: p5Types) => {
		if (p5.windowWidth !== window.innerWidth
			|| p5.windowHeight !== window.innerHeight) {
			p5.windowWidth = window.innerWidth;
			p5.windowHeight = window.innerHeight;
			this.windowResized(p5);
		}
	}

	render() {
		return <Sketch
			preload={this.preload}
			setup={this.setup}
			draw={this.draw}
			windowResized={this.windowResized}
			keyPressed={this.keyPressed}
			mouseReleased={this.mouseReleased}
		/>;
	}

};


const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, {})(GallerySketch);;
