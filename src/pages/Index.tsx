import React, { createRef, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { IfcContainer } from "../components/IFCContainer/IfcContainer";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
import { DrawerContent, DrawerHeader } from "../components/Drawer/Drawer";
import { HelpDialog } from "../components/Dialog/Dialog";
import { SnackbarContent } from "../components/Snackbar/Snackbar";
import { Navibar } from "../components/Navibar/Navibar";

export const Index: React.FC = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ifcContainerRef = createRef<HTMLDivElement>();
  const [ifcViewer, setIfcViewer] = useState<IfcViewerAPI>();
  const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] =
    useState<string>();

  useEffect(() => {
    if (ifcContainerRef.current) {
      const container = ifcContainerRef.current;
      console.log("container", container);
      const ifcViewer = new IfcViewerAPI({
        container,
        backgroundColor: new Color(0xffffff),
      });
      console.log("ifcViewer", ifcViewer);
      ifcViewer.axes.setAxes();
      ifcViewer.grid.setGrid();
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false,
      });
      setIfcViewer(ifcViewer);
      console.log("set ifcViewer");
    }
  }, []);

  const ifcOnLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e && e.target && e.target.files && e.target.files[0];
    if (file && ifcViewer) {
      setIfcLoadingErrorMessage("");
      setLoading(true);
      console.log("loading file");

      const model = await ifcViewer.IFC.loadIfc(file, true, ifcOnLoadError);
      console.log("build model");
      await ifcViewer.shadowDropper.renderShadow(model.modelID);
      console.log("render shadow");

      setIsSnackbarOpen(true);
      setLoading(false);
      console.log("done");
      console.log(ifcViewer);
    }
  };

  const ifcOnLoadError = async (err: React.ChangeEvent<HTMLInputElement>) => {
    setIfcLoadingErrorMessage(err.toString());
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navibar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <DrawerContent
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setIsDrawerOpen}
          theme={theme}
          viewer={ifcViewer}
          ifcOnLoad={ifcOnLoad}
          setIsDialogOpen={setIsDialogOpen}
        />
        <Box component={"main"} sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <IfcContainer ref={ifcContainerRef} viewer={ifcViewer} />
        </Box>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>

      <HelpDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
      />

      <SnackbarContent
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        ifcLoadingErrorMessage={ifcLoadingErrorMessage}
      />
    </>
  );
};
