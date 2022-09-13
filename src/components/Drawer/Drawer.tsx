import React, {useState} from "react";
import {styled, Theme, CSSObject} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CompareArrowsSharp,
  FolderOpenOutlined,
  HelpOutline,
} from "@mui/icons-material";
import {IfcViewerAPI} from "web-ifc-viewer";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

export const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerContent: React.FC<{
  isDrawerOpen: boolean;
  theme: Theme;
  setDrawerOpen: (open: boolean) => void;
  setIsDialogOpen: (open: boolean) => void;
  ifcOnLoad: (e: any) => Promise<void>;
  viewer: IfcViewerAPI | undefined;
}> = (props) => {
  const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);

  const toggleClippingPlanes = () => {
    if (props.viewer) {
      props.viewer.toggleClippingPlanes();
      if (props.viewer.clipper.active) {
        setClippingPaneSelected(true);
      } else {
        setClippingPaneSelected(false);
      }
    }
  };

  return (
    <Drawer variant="permanent" open={props.isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={() => props.setDrawerOpen(false)}>
          {props.theme.direction === "rtl" ? (
            <ChevronRightIcon/>
          ) : (
            <ChevronLeftIcon/>
          )}
        </IconButton>
      </DrawerHeader>
      <Divider/>
      <List>
        <input
          type="file"
          accept=".ifc"
          id={"file-input"}
          onChange={props.ifcOnLoad}
          style={{display: "none"}}
        />
        <label htmlFor="file-input">
          <ListItemButton key={"open File"}>
            <ListItemIcon>
              <FolderOpenOutlined/>
            </ListItemIcon>
            <ListItemText primary={"Open File"}/>
          </ListItemButton>
        </label>
        <ListItemButton
          key={"showPlane"}
          onClick={() => toggleClippingPlanes()}
          selected={isClippingPaneSelected}
        >
          <ListItemIcon>
            <CompareArrowsSharp/>
          </ListItemIcon>
          <ListItemText primary={"Clipping Planes"}/>
        </ListItemButton>
      </List>
      <Divider/>
      <List>
        <ListItemButton
          key={"About"}
          onClick={() => props.setIsDialogOpen(true)}
        >
          <ListItemIcon>
            <HelpOutline/>
          </ListItemIcon>
          <ListItemText primary={"About"}/>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
