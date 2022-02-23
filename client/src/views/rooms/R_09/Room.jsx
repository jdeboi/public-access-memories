// import * as THREE from 'three'
// import React, { Suspense, useEffect, useState } from 'react'
// import ReactPlayer from 'react-player';
// // import { Canvas, useFrame, useThree } from '@react-three/fiber'
// // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// // import { Html, useProgress, useGLTF, OrbitControls, useAspect } from '@react-three/drei';

// import './RoomLydia.css';

// // store
// import { useSelector } from 'react-redux';
// import { selectWindow } from '../../../store/store';
// import { doneLoadingApp } from '../../../store/window';

// import LoadingPage from '../../../components/LoadingPage/LoadingPage';
// import { mapVal } from '../../../helpers/helpers';

// const Room = () => {
//     const windowUI = useSelector(selectWindow);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const getDimensions = () => {

//         let w = Math.min(windowUI.contentW, 1920);
//         let h = w * 1080/1920;

//         let vidW = w *.44;
//         let vidH = w * 1080/1920;
//         let vidY =  (windowUI.contentH - vidH)/2;
//         let vidX =  (windowUI.contentW - vidW)/2;

//         let y = (windowUI.contentH - h)/2;
//         let x = (windowUI.contentW - w) / 2;
//         return { w, h, x, y, vidW, vidH, vidX, vidY };
//     }

//     const [dim, setDim] = useState(getDimensions())


//     useEffect(() => {
//         setIsPlaying(true);
//     }, [windowUI.compositionStarted])

//     useEffect(() => {
//         setDim(getDimensions())
//     }, [windowUI.contentW, windowUI.contentH])


//     return (
//         <div className="Room RoomLydia Sketch">
//             <div className="player" style={{ top: dim.y, left: dim.x, width: dim.w, height: dim.w }}>

//             </div>
//                 <div className="vidBox" style={{ top: dim.vidY, left: dim.vidX, width: dim.vidW, height: dim.vidH }}>
//                     <ReactPlayer
//                         url='https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/homebody.mp4'
//                         muted={false}
//                         loop={true}
//                         playsinline={true}
//                         playing={isPlaying}
//                         width='100%'
//                         height='100%'
//                     />
//             </div>
//         </div>
//     )
// }

// export default Room;

import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
    const [url, set] = useState('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/lydia.glb')
    // const [url, set] = useState('/online_assets/models/macbookpro.glb')

    useEffect(() => {
        // setTimeout(() => set('/online_assets/models/macbookpro.glb'), 2000)

        setTimeout(() => set('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/lydia.glb'), 2000)
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
        vid.src = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/lydia/homebody.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        return vid;
    });
   
    
    useEffect(() => {
        if (windowUI.compositionStarted) {
            video.play();
        }
    }, [windowUI.compositionStarted]);

    useEffect(() => {
        return () => {
            video.src= "";
        }
    }, []);


    const rx = -16 * Math.PI / 180;
    return (
        <mesh
            scale={size}
            rotation={[-.35, 0, 0]}
            position={[0, 1.1, -3.74]}

        >
            <planeBufferGeometry />
            <meshBasicMaterial>
                <videoTexture encoding={THREE.sRGBEncoding} attach="map" args={[video]} />
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
                        // minPolarAngle={Math.PI / 2}
                        // maxPolarAngle={2* Math.PI}
                        minAzimuthAngle={-.8}
                        maxAzimuthAngle={.8}
                        minDistance={.1}
                        maxDistance={3}
                    />
                    <ambientLight intensity={0.4} />
                    <directionalLight color="white" position={[1, 2, 1]} />
                    <group
                        position={[0, -.5, 0]}
                        rotation={[.5, 0, 0]}
                    >
                        <Model />
                        <VideoTex windowUI={windowUI} />
                    </group>
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