import React, { forwardRef, useState, Fragment } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Grid, Popover, Typography } from "@mui/material";

interface IfcRecord {
  [key: string]: string;
}

interface IfcContainerProps {
  viewer?: IfcViewerAPI;
}

export const IfcContainer = forwardRef<HTMLDivElement, IfcContainerProps>(
  (props, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [curIfcRecords, setIfcRecords] = useState<IfcRecord>();

    const viewer = props.viewer;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
      setAnchorEl(null);
    };

    const ifcOnClick = async (event: any) => {
      if (viewer) {
        const result = await viewer.IFC.pickIfcItem(true);
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
            let ifcRecords: IfcRecord = {};
            ifcRecords["Entity Type"] = type;
            ifcRecords["GlobalId"] = props.GlobalId && props.GlobalId?.value;
            ifcRecords["Name"] = props.Name && props.Name?.value;
            ifcRecords["ObjectType"] =
              props.ObjectType && props.ObjectType?.value;
            ifcRecords["PredefinedType"] =
              props.PredefinedType && props.PredefinedType?.value;
            setIfcRecords(ifcRecords);
          }

          setAnchorEl(event.target);
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
        <div
          id={"ifc-viewer-container"}
          ref={ref}
          onDoubleClick={ifcOnClick}
          onContextMenu={ifcOnRightClick}
          onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        />
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
                      <Fragment key={key}>
                        <Typography component="dt" variant="body2">
                          {key}
                        </Typography>
                        <Typography sx={{ pb: 1 }} component={"dd"}>
                          {curIfcRecords[key]}
                        </Typography>
                      </Fragment>
                    )
                )}
            </Grid>
          </Grid>
        </Popover>
      </>
    );
  }
);
