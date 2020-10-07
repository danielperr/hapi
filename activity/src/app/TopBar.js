import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Divider,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import LinearProgress from "@material-ui/core/LinearProgress";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  colorPrimary: {
    background: "#9FA8DA",
  },
  barColorPrimary: {
    background: "#5C6BC0",
  },
  logo: {
    color: "#ffd180",
    flip: false,
    direction: 'ltr',
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

function TopBar(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={props.elevation ? 4 : 0}>
        <Toolbar>
          {/* <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu">
              <IconMenu />
            </IconButton> */}
          {/* <IconButton edge="start" className={ classes.menuBook } color="inherit" aria-label="menu">
              <IconMenuBook />
            </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            {props.mainHeader}
          </Typography>
          <IconButton color="inherit" onClick={props.onDownload}>
            <SaveAltIcon />
          </IconButton>
          <IconButton color="inherit" onClick={props.onReset}>
            <DeleteIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Typography edge="end" variant="h6" className={classes.logo}>
            Hapi
            <InsertEmoticonIcon />
          </Typography>
        </Toolbar>
        {/* {<LinearProgress
          color="primary"
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          variant="determinate"
          value={props.progress}
        />} */}
      </AppBar>
    </div>
  );
}

export default TopBar;

/*
  <Button edge="end" className={ classes.menuBook } color="inherit" aria-label="menu" onclick={ window.open('https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html','_blank') } >
      <Typography edge="end" variant="h6">
      New Empty IFigure 
      </Typography>
    <IconIfigure />
  </Button>
  */
