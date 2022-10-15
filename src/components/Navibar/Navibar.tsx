import React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navibar: React.FC<{
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}> = (props) => {
  return (
    <>
      <AppBar position={"fixed"} open={props.isDrawerOpen}>
        <Toolbar>
          <IconButton
            edge={"start"}
            color={"inherit"}
            aria-label={"open drawer"}
            sx={{
              marginRight: "36px",
              ...(props.isDrawerOpen && { display: "none" }),
            }}
            onClick={() => props.setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"} component={"div"} noWrap marginX={"auto"}>
            IFC.js in React!!!
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
