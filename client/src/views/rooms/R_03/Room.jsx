import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Box3, Vector3 } from 'three'

import './Alex.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import LoadingPage from '../../../components/LoadingPage/LoadingPage';
import { mapVal } from '../../../helpers/helpers';


function Model({ dispatch }) {
    const [url, set] = useState('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/paintedeye.glb')
    const { scene } = useGLTF(url);

    useEffect(() => {
        setTimeout(() => set('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/paintedeye.glb'), 2000)
    }, [])

    useEffect(() => {
        // Calculate the center of the model (average of bounding box min and max)
        const boundingBox = new Box3().setFromObject(scene);
        const center = boundingBox.getCenter(new Vector3());
    
        // Translate the model to the center
        scene.position.set(-center.x, -center.y, -center.z);
      }, []);
    
    useEffect(() => {
        // this only executes after the model loads (model is blocking?)
        dispatch(doneLoadingApp());
    }, [])

    //Load background texture
    return <primitive object={scene} />
}



const Room = () => {
    const windowUI = useSelector(selectWindow);

    const dispatch = useDispatch();

    return (
        <div className="Room Alex Sketch">
            <Canvas camera={{
                fov: 35,
                zoom: mapVal(windowUI.contentW, 400, 2300, 15, 16),
                near: 1,
                far: 1000
            }}>

                <Suspense fallback={null}>
                    <OrbitControls
                        // minPolarAngle={-Math.PI / 2}
                        // maxPolarAngle={Math.PI / 2}
                        minDistance={2}
                        maxDistance={20}
                        enablePan={false}
                    />
                    <ambientLight intensity={0.2} />
                    <directionalLight color="white" position={[3, 0, 1]} />
                    <Model
                        scale={5}
                        dispatch={dispatch}
                    />
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