import React, { forwardRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Grid, Popover, Typography } from "@mui/material";

interface IfcRecord {
  [key: string]: string;
}

interface IfcContainerProps {
  viewer?: IfcViewerAPI;
}

export const IfcContainer = forwardRef<HTMLDivElement, IfcContainerProps>(
  function IfcContainerFunc(props, ref) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );
    const [curIfcRecords, setIfcRecords] = React.useState<IfcRecord>();

    const viewer = props.viewer;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
      setAnchorEl(null);
    };

    const ifcOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (viewer) {
        const result = await viewer.IFC.selector.pickIfcItem(true, true);
        if (result) {
          const props = await viewer.IFC.getProperties(
            result.modelID,
            result.id,
            false
          );
          console.log(props);
          const type = viewer.IFC.loader.ifcManager.getIfcType(
            result.modelID,
            result.id
          );
          // convert props to record
          if (props) {
            const ifcRecords: IfcRecord = {};
            ifcRecords["Entity Type"] = type;
            ifcRecords["GlobalId"] = props.GlobalId && props.GlobalId?.value;
            ifcRecords["Name"] = props.Name && props.Name?.value;
            ifcRecords["ObjectType"] =
              props.ObjectType && props.ObjectType?.value;
            ifcRecords["PredefinedType"] =
              props.PredefinedType && props.PredefinedType?.value;
            setIfcRecords(ifcRecords);
          }
          setAnchorEl(event.currentTarget);
        }
      }
    };

    const ifcOnRightClick = async () => {
      if (viewer) {
        viewer.clipper.deleteAllPlanes();
        viewer.clipper.createPlane();
      }
    };

    return (
      <>
        <div id={"ifc-viewer-container"}>
          <span
            ref={ref}
            onDoubleClick={ifcOnClick}
            onContextMenu={ifcOnRightClick}
            onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}
          />
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Grid container component={"dl"} spacing={2} sx={{ p: 2 }}>
            <Grid item>
              {curIfcRecords &&
                Object.keys(curIfcRecords).map(
                  (key) =>
                    curIfcRecords[key] && (
                      <React.Fragment key={key}>
                        <Typography component="dt" variant="body2">
                          {key}
                        </Typography>
                        <Typography sx={{ pb: 1 }} component={"dd"}>
                          {curIfcRecords[key]}
                        </Typography>
                      </React.Fragment>
                    )
                )}
            </Grid>
          </Grid>
        </Popover>
      </>
    );
  }
);
