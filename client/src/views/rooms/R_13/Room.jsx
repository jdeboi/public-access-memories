import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Html, useProgress, OrbitControls } from '@react-three/drei';

import './RoomL.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';


function getCubes() {
    const cubes = [];
    for (let i = 0; i < 10; i++) {
        cubes.push({
            s: Math.random() + 0.5,
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
        })
    }
    return cubes;
}

function VideoTex({ windowUI }) {
    const [cubes] = useState(getCubes())
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/linda/linda.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        return vid;
    });


    useEffect(() => {
        if (windowUI.compositionStarted) {
            video.play();
        }
    }, [windowUI.compositionStarted]);



    const sz = 10;
    return (
        <>
            <mesh
                rotation={[-.1, .4, 0]}
            >
                <boxGeometry attach="geometry" args={[sz, sz, sz]} />
                <meshBasicMaterial attach="material" side={THREE.BackSide} >
                    <videoTexture encoding={THREE.sRGBEncoding} attach="map" args={[video]} />
                </meshBasicMaterial>
            </mesh>

            {
                cubes.map((cube, i) => {

                    return (
                        <mesh
                            scale={[cube.s, cube.s, cube.s]}
                            rotation={[-.1, .4, 0]}
                            position={[cube.x, cube.y, cube.z]}
                        >
                            <boxGeometry attach="geometry" args={[1, 1, 1]} />
                            <meshBasicMaterial attach="material" >
                                <videoTexture encoding={THREE.sRGBEncoding} attach="map" args={[video]} />
                            </meshBasicMaterial>
                        </mesh>
                    )
                })}
        </>
    )
}



const Room = () => {
    const windowUI = useSelector(selectWindow);

    // const dispatch = useDispatch();

    return (
        // zoom: mapVal(windowUI.contentW, 400, 2300, .7, 2),
        <div className="Room RoomL Sketch">
            <Canvas colorManagement={true} camera={{
                near: 1,
                far: 10000
            }}>

                <Suspense fallback={<VideoTex windowUI={windowUI} />}>
                    <OrbitControls
                        minPolarAngle={Math.PI / 2 - .5}
                        maxPolarAngle={Math.PI / 2 + .5}

                        minDistance={1.5}
                        maxDistance={3}
                    />
                    <ambientLight  color="white" intensity={.1} />
                    {/* <directionalLight color="white" position={[1, 2, 1]} /> */}
                    {/* <Model  windowUI={windowUI} /> */}
                    <VideoTex windowUI={windowUI} />
                </Suspense>
            </Canvas>
            {/* {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            } */}
        </div>
    )
};

export default Room;