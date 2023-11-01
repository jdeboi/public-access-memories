import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

import './Matthew.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';


function VideoTex({ windowUI }) {

  const src = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/Music+in+the+Shape+of+a+Sphere.mp4";
  const sz = 10;

  const [video, setVideo] = useState(() => {
    const vid = document.createElement("video");
    vid.src = src;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    return vid;
  });


  useEffect(() => {
    if (windowUI.compositionStarted) {
      video.play();
      // console.log("play");
    }
  }, [windowUI.compositionStarted]);

  useEffect(() => {
    return () => {
      video.src = "";
      // console.log("no src");d
    }
  }, []);




  return (
    <>
      <mesh rotation={[-.1, .4, 0]}>
        <sphereGeometry attach="geometry" args={[sz, sz, sz]} />
        <meshBasicMaterial attach="material" side={THREE.BackSide} >
          <videoTexture encoding={THREE.sRGBEncoding} attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>

    </>
  )
}



const Room = () => {
  const windowUI = useSelector(selectWindow);


  return (
    // zoom: mapVal(windowUI.contentW, 400, 2300, .7, 2),
    <div className="Room Matthew Sketch">
      {windowUI.compositionStarted && windowUI.contentW &&

        <Canvas camera={{
          near: 1,
          far: 10000
        }}>

          <Suspense fallback={<VideoTex windowUI={windowUI} />}>
            <OrbitControls
              minPolarAngle={Math.PI / 2 - .5}
              maxPolarAngle={Math.PI / 2 + .5}
              enablePan={false}
              minDistance={1.5}
              maxDistance={3}
            />
            <ambientLight color="white" intensity={.1} />
            <VideoTex windowUI={windowUI} />
          </Suspense>
        </Canvas>
      }
    </div>
  )
};

export default Room;


// import React, { useEffect, useRef } from 'react';
// import My360Video from './My360Video'; // Replace with the path to your component

// import { useSelector } from 'react-redux';
// import { selectWindow } from '../../../store/store';
// import { doneLoadingApp } from '../../../store/window';

// const Room = () => {

//   const windowUI = useSelector(selectWindow);


//   return (
//     <div className="Room Alex Sketch">
//       <My360Video />
//     </div>
//   );
// };

// export default Room;
