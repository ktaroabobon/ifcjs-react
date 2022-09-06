import React from "react";

export const Helper: React.FC = () => {
  return (
    <>
      <gridHelper args={[50, 30]} />
      <axesHelper material-depthTest={false} renderOrder={1} args={[10]} />
    </>
  );
};
