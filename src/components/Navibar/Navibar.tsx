import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Navibar: React.FC = () => {
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <IconButton
          size={"large"}
          edge={"start"}
          color={"inherit"}
          aria-label={"menu"}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
          IFC.js in React!!!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
