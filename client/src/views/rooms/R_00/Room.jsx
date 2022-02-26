

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
    return <orbitControls ref={ref} target={[0, 1, 0]} {...props} args={[camera, gl.domElement]} />
}

function Dome({ dispatch }) {
    const url = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Craft/Forest-5.png";
    const texture = useLoader(THREE.TextureLoader, url);
    useEffect(() => {
        dispatch(doneLoadingApp());
    }, [])
    return (
        <mesh>
            <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
            <meshPhysicalMaterial attach="material" map={texture} side={THREE.BackSide} />
        </mesh>
    )
}

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    return (
        // zoom: mapVal(windowUI.contentW, 400, 2300, .7, 2),
        <div className="Room RoomCraft Sketch">
            <Canvas colorManagement={true} camera={{ rotation: [0, 1, 0] }}>
                <Suspense fallback={null}>
                    <Controls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.2}
                        autoRotate
                        autoRotateSpeed={-0.8}
                        rotateSpeed={.3}
                    />
                    <ambientLight intensity={1} />
                    <pointLight intensity={.5} position={[10, 10, 10]} />
                    <pointLight intensity={.5} position={[-10, -10, -10]} />
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

// import * as THREE from 'three'
// import ReactDOM from 'react-dom'
// import React, { Suspense, useRef } from 'react'
// import { Canvas, useLoader, useFrame } from 'react-three-fiber'
// // import earthImg from 'https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Craft/Forest-5.png'
// // import './styles.css'

// function Earth() {
//     const ref = useRef()
//     const texture = useLoader(THREE.TextureLoader, "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Craft/Forest-5.png")
//     useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
//     return (
//         <group>
//             <ambientLight intensity={0.1} />
//             <pointLight intensity={1} position={[10, 10, 10]} />
//             <pointLight intensity={1} position={[-10, -10, -10]} />
//             <mesh ref={ref}>
//                 <sphereBufferGeometry attach="geometry" args={[1.5, 64, 64]} />
//                 <meshStandardMaterial attach="material" map={texture} />
//                 <mesh position={[1.25, 1.25, 1.25]}>
//                     <sphereBufferGeometry args={[0.25, 64, 64]} />
//                     <meshStandardMaterial color="hotpink" />
//                 </mesh>
//                 <mesh position={[-1.25, -1.25, -1.25]}>
//                     <sphereBufferGeometry args={[0.25, 64, 64]} />
//                     <meshStandardMaterial color="white" />
//                 </mesh>
//             </mesh>
//         </group>
//     )
// }

// const Room = () => {
//     return (
//         <div className="Room RoomCraft Sketch">
//             <Canvas colorManagement={false} camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
//                 <Suspense fallback={null}>
//                     <Earth />
//                 </Suspense>
//             </Canvas>
//             <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
//                 <Suspense fallback={null}>
//                     <Earth />
//                 </Suspense>
//             </Canvas>
//         </div>
//     );
// }
// export default Room;