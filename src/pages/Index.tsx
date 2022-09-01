import React from "react";
import {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Mesh, AxesHelper} from "three";
import {Controls} from "../components/Controls";

type BoxProps = {
    position: [x: number, y: number, z: number];
};

export const Box: React.FC<BoxProps> = (props) => {
    const mesh = useRef<Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame(() => (mesh.current.rotation.x += 0.01));

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"}/>
        </mesh>
    );
};

export const Index: React.FC = () => {
    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <Canvas>
                <Controls/>
                <ambientLight/>
                <primitive object={new AxesHelper(10)}/>
                <pointLight position={[0, 0, 0]}/>
                <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]}/>
            </Canvas>
        </div>
    );
};
