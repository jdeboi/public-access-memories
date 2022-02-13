import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Html, useProgress, useGLTF, OrbitControls, useAspect } from '@react-three/drei';

import './RoomLydia.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import LoadingPage from '../../../components/LoadingPage/LoadingPage';
import { mapVal } from '../../../helpers/helpers';



function Loader() {
    const { progress } = useProgress()
    return <Html><LoadingPage progress={progress} /></Html>
}

function Model() {
    // const [url, set] = useState('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/lydia.glb')
    const [url, set] = useState('/online_assets/models/macbookpro.glb')

    useEffect(() => {
        setTimeout(() => set('/online_assets/models/macbookpro.glb'), 2000)

        // setTimeout(() => set('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/lydia.glb'), 2000)
    }, [])
    const { scene } = useGLTF(url);
    //Load background texture
    return (
        <primitive
            object={scene}
            rotation={[0, 0, 0]}
            scale={[2.4, 2, 2]}
            position={[0, -1, -1]}
        />);
}

function VideoTex({ windowUI }) {
    // const windowUI = useSelector(selectWindow);
    const size = useAspect(1920, 1080, .5);
    const [video] = useState(() => {
        const vid = document.createElement("video");
        // vid.src = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/homebody.mp4";
        vid.src = "/online_assets/homebody720.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        return vid;
    });
    // Keep in mind videos can only play once the user has interacted with the site ...
    useEffect(() => {
        if (windowUI.compositionStarted) {
            video.play();
        }
    }, [windowUI.compositionStarted]);

    const rx = -16*Math.PI/180;
    return (
        <mesh
            scale={size}
            rotation={[-.35, 0, 0]}
            position={[0, 1.1,-3.74]}
            
        >
            <planeBufferGeometry />
            <meshBasicMaterial>
                <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
        </mesh>
    );
}


const Room = () => {
    const windowUI = useSelector(selectWindow);

    // const dispatch = useDispatch();

    return (
        // zoom: mapVal(windowUI.contentW, 400, 2300, .7, 2),
        <div className="Room RoomLydia Sketch">
            <Canvas camera={{
                
                near: 1,
                far: 10000
            }}>

                <Suspense fallback={<VideoTex windowUI={windowUI} />}>
                    <OrbitControls
                        minPolarAngle={Math.PI / 2-.3}
                        maxPolarAngle={Math.PI / 2+.3}
                        minAzimuthAngle={-.6}
                        maxAzimuthAngle={.6}
                        minDistance={1.5}
                        maxDistance={3}
                    />
                    <ambientLight intensity={0.4} />
                    <directionalLight color="white" position={[1, 2, 1]} />
                    <Model />
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