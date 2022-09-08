import React, { createRef, useEffect, useState } from "react";
// import {Canvas} from "@react-three/fiber"
// import {Controls} from "../components/Controls/Controls";
// import {Light} from "../components/Light/Light";
// import {Helper} from "../components/Helper/Helper";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { IfcContainer } from "../components/IFCContainer/IfcContainer";
import { IfcViewerAPI } from "web-ifc-viewer";

export const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const ifcContainerRef = createRef<HTMLDivElement>();
  const [ifcViewer, setIfcViewer] = useState<IfcViewerAPI>();

  useEffect(() => {
    if (ifcContainerRef.current) {
      const container = ifcContainerRef.current;
      const ifcViewer = new IfcViewerAPI({ container: container });
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false,
      });
      setIfcViewer(ifcViewer);
    }
  }, []);

  const ifcOnLoad = async (e: any) => {
    const file = e && e.target && e.target.files && e.target.files[0];
    if (file && ifcViewer) {
      setLoading(true);
      console.log("loading file");
      const model = await ifcViewer.IFC.loadIfc(file, true);
      console.log("build model");
      await ifcViewer.shadowDropper.renderShadow(model.modelID);
      console.log("render shadow");
      setLoading(false);
      console.log("done");
      console.log(ifcViewer);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <input
          type="file"
          accept=".ifc"
          id={"fileInput"}
          onChange={ifcOnLoad}
        />
        {/*<Canvas>*/}
        {/*  <Controls/>*/}
        {/*  <Light/>*/}
        {/*  <Helper/>*/}
        {/*</Canvas>*/}
        <IfcContainer ref={ifcContainerRef} viewer={ifcViewer} />
        <Backdrop
          style={{
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </div>
    </Box>
  );
};
