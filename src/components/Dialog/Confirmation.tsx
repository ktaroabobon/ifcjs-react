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
import { IfcViewerAPI } from "web-ifc-viewer";
import { Buffer } from "buffer";
import pako from "pako";

import { API_HOST } from "../../../env/Index";

const items = [
  { id: 0, name: "第21条第1号" },
  { id: 1, name: "第21条第2号" },
];

const CheckBuilding = async (ifcViewer: IfcViewerAPI | undefined) => {
  if (ifcViewer == undefined) {
    console.log("ifcViewer is undefined");
    return;
  }

  const data = await ifcViewer.IFC.loader.ifcManager.ifcAPI.ExportFileAsIFC(0);

  // valueを圧縮する
  const blob = new Blob([data], { type: "text/plain" });
  const text = await blob.text();
  const value = pako.gzip(text, { level: 9 });
  const valueBase64 = Buffer.from(value).toString("base64");

  //  圧縮したvalueをAPIに投げる
  const response = await fetch(API_HOST + "/law/21-1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ifc: valueBase64,
      zipped: true,
      metadata: {
        name: "test",
        description: "test",
        author: "ktaroabobon",
      },
    }),
  });
  response.json().then((data) => {
    console.log("data", data);

    const blob = new Blob([JSON.stringify(data, null, " ")], {
      type: "application/json",
    });

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = "confirmation.json";
    link.click();
    link.remove();
  });
};

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
  };

  const ConfirmationForm = (
    <>
      <FormControl>
        {items.map((item) => (
          <FormControlLabel
            control={<Checkbox />}
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
        <Divider />
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
