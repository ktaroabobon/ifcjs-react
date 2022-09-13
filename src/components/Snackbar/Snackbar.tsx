import React from "react";
import { Alert, Snackbar } from "@mui/material";

export const SnackbarContent: React.FC<{
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: (open: boolean) => void;
  ifcLoadingErrorMessage: string | undefined;
}> = (props) => {
  return (
    <>
      <Snackbar
        open={props.isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => props.setIsSnackbarOpen(false)}
      >
        {props.ifcLoadingErrorMessage ? (
          <Alert
            onClose={() => props.setIsSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Error loading the IFC File. Check the console for more information.
          </Alert>
        ) : (
          <Alert
            onClose={() => props.setIsSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            IFC File loaded successfully!
          </Alert>
        )}
      </Snackbar>
    </>
  );
};
