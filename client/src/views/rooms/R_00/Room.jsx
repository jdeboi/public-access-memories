

import * as THREE from 'three'
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { useProgress, Html } from '@react-three/drei'

import './RoomCraft.css';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import LoadingPage from '../../../components/LoadingPage/LoadingPage';

extend({ OrbitControls })

function Controls(props) {
    const { camera, gl } = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
}

function Dome({dispatch}) {
    const texture = useLoader(THREE.TextureLoader, 'https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Craft/Forest-5.png')
    useEffect(()=> {
        dispatch(doneLoadingApp());
    }, [])
    return (
        <mesh>
            <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
            <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
        </mesh>
    )
}

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    return (
        // zoom: mapVal(windowUI.contentW, 400, 2300, .7, 2),
        <div className="Room RoomCraft Sketch">
            <Canvas >
                <Suspense fallback={null}>
                    <Controls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.2}
                        autoRotate
                        rotateSpeed={-0.5}
                    />
                    <Dome dispatch={dispatch} />
                </Suspense>
            </Canvas>
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }
        </div>
    )
};

export default Room;