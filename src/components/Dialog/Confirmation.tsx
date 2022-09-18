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

const items = [
  { id: 0, name: "第22条第1号" },
  { id: 1, name: "第22条第2号" },
];

export const ConfirmationDialog: React.FC<{
  setIsDialogOpen: (open: boolean) => void;
  isDialogOpen: boolean;
}> = (props) => {
  const handleClose = () => {
    props.setIsDialogOpen(false);
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
          <Button color={"primary"} variant={"contained"} onClick={handleClose}>
            確認開始
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
