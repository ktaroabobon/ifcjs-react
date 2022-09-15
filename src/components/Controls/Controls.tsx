import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";

export const Controls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.x = 15;
    camera.position.y = 13;
    camera.position.z = 8;
    const controls = new OrbitControls(camera, gl.domElement);

    controls.enableDamping = true;
    controls.minDistance = 3;
    controls.maxDistance = 20;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return null;
};
