import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Html, useProgress, useGLTF, OrbitControls } from '@react-three/drei';

import './R_01.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import LoadingPage from '../../../components/LoadingPage/LoadingPage';



function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function Model() {
    const [url, set] = useState('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Blumenfeld/perfect_day4.glb')
    useEffect(() => {
        setTimeout(() => set('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Blumenfeld/perfect_day4.glb'), 2000)
    }, [])
    const { scene } = useGLTF(url);
    //Load background texture
    return <primitive object={scene} />
}



const R_01 = () => {
    const windowUI = useSelector(selectWindow);
    // const dispatch = useDispatch();

    return (
        <div className="Room R_01 Sketch">
            <Canvas camera={{
                fov: 35,
                zoom: 1,
                near: 1,
                far: 1000
            }}>

                <Suspense fallback={<Loader />}>
                    <OrbitControls
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                        minDistance={1}
                        maxDistance={10}
                    />
                    <ambientLight intensity={0.2} />
                    <directionalLight color="white" position={[3, 0, 1]} />
                    <Model />
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

export default R_01;