import { GitHub } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";

export const HelpDialog: React.FC<{
  setIsDialogOpen: (open: boolean) => void;
  isDialogOpen: boolean;
}> = (props) => {
  return (
    <>
      <Dialog
        onClose={() => props.setIsDialogOpen(false)}
        open={props.isDialogOpen}
      >
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <List dense>
            <ListItem>
              <ListItemText primary="right-click" secondary="Create a Plan" />
            </ListItem>
            <ListItem>
              <ListItemText primary="double-click" secondary="Pick an Item" />
            </ListItem>
          </List>
          <Link
            href="https://github.com/ktaroabobon/ifcjs-react"
            underline="hover"
            target="_blank"
          >
            Join us on GitHub
          </Link>
          <GitHub />
        </DialogContent>
      </Dialog>
    </>
  );
};
