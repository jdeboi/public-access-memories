import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress, useGLTF, OrbitControls } from "@react-three/drei";

import "./RoomS.css";

// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";
import { doneLoadingApp } from "../../../store/window";

import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { mapVal } from "../../../helpers/helpers";

function Model({ dispatch }) {
  const [url, set] = useState(
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Blumenfeld/perfect_day4.glb"
  );
  useEffect(() => {
    setTimeout(
      () =>
        set(
          "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Blumenfeld/perfect_day4.glb"
        ),
      2000
    );
  }, []);
  const { scene } = useGLTF(url);

  // this only executes after the model loads (model is blocking?)
  useEffect(() => {
    dispatch(doneLoadingApp());
  }, []);

  //Load background texture
  return <primitive object={scene} />;
}

const Room = () => {
  const windowUI = useSelector(selectWindow);

  const dispatch = useDispatch();

  return (
    <div className="Room RoomS Sketch">
      <Canvas
        camera={{
          fov: 35,
          zoom: mapVal(windowUI.contentW, 400, 2300, 0.7, 1.3),
          near: 1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            minDistance={1}
            maxDistance={10}
          />
          <ambientLight intensity={0.2} />
          <directionalLight color="white" position={[3, 0, 1]} />
          <Model dispatch={dispatch} />
        </Suspense>
      </Canvas>

      {windowUI.loading ? <LoadingPage /> : null}
    </div>
  );
};

export default Room;
