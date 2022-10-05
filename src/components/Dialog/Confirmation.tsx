import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Divider,
} from "@mui/material";
import React from "react";
import {IfcViewerAPI} from "web-ifc-viewer";

const items = [
  {id: 0, name: "第22条第1号"},
  {id: 1, name: "第22条第2号"},
];

const CheckBuilding = async (ifcViewer: IfcViewerAPI | undefined) => {
  if (ifcViewer == undefined) {
    console.log("ifcViewer is undefined");
    return;
  }

  const data = await ifcViewer.IFC.loader.ifcManager.ifcAPI.ExportFileAsIFC(0);

  const blob = new Blob([data], {type: "text/plain"});
  const value = await blob.text();

  //  valueをlzmaで圧縮する

  //  圧縮したvalueをAPIに投げる
}

export const ConfirmationDialog: React.FC<{
  setIsDialogOpen: (open: boolean) => void;
  isDialogOpen: boolean;
  ifcViewer: IfcViewerAPI | undefined;
}> = (props) => {
  const handleClose = () => {
    props.setIsDialogOpen(false);
  };

  const handleCheck = () => {
    handleClose();
    CheckBuilding(props.ifcViewer);
  }

  const ConfirmationForm = (
    <>
      <FormControl>
        {items.map((item) => (
          <FormControlLabel
            control={<Checkbox/>}
            label={item.name}
            key={item.id}
          />
        ))}
      </FormControl>
    </>
  );

  return (
    <>
      <Dialog onClose={handleClose} open={props.isDialogOpen}>
        <DialogTitle>建築確認審査</DialogTitle>
        <DialogContent>{ConfirmationForm}</DialogContent>
        <Divider/>
        <DialogActions>
          <Button color={"error"} onClick={handleClose}>
            キャンセル
          </Button>
          <Button color={"primary"} variant={"contained"} onClick={handleCheck}>
            確認開始
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
