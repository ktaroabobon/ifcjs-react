import React, {createRef, useEffect, useRef, useState} from "react";
import {extend} from "@react-three/fiber";
import {Canvas, useFrame} from "@react-three/fiber"
import {Mesh} from "three";
import {Controls} from "../components/Controls/Controls";
import {Light} from "../components/Light/Light";
import {Helper} from "../components/Helper/Helper";
import {FileInput} from "../components/FileInput/FileInput";
import {Backdrop, CircularProgress} from "@mui/material";
import {IfcContainer} from "../components/IFCContainer/IfcContainer";
import {IfcViewerAPI} from "web-ifc-viewer";

export const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const ifcContainerRef = createRef<HTMLDivElement>();
  const [ifcViewer, setIfcViewer] = useState<IfcViewerAPI>();

  useEffect(() => {
    if (ifcContainerRef.current) {
      const container = ifcContainerRef.current;
      const ifcViewer = new IfcViewerAPI({container: container});
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false
      });
      setIfcViewer(ifcViewer);
    }
  }, []);


  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <FileInput/>
      <Canvas>
        <Controls/>
        <Light/>
        <Helper/>
      </Canvas>
      <IfcContainer ref={ifcContainerRef} viewer={ifcViewer}/>
      <Backdrop
        style={{
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          alignContent: "center"
        }}
        open={loading}
      >
        <CircularProgress/>
      </Backdrop>
    </div>

  );
};
