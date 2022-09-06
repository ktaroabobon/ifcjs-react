import React from "react";

export const Light: React.FC = () => {
  const lightColor = 0xffffff;

  return (
    <>
      // 環境光源
      <ambientLight color={lightColor} intensity={0.5} />
      // 平行光源
      <directionalLight
        color={lightColor}
        position={[0, 10, 0]}
        target-position={[-5, 0, 0]}
      />
    </>
  );
};
