import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';

import DevMenu from './DevMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flip: false,
    direction: 'rtl',
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  colorPrimary: {
    background: '#9FA8DA',
  },
  barColorPrimary: {
    background: '#5C6BC0',
  },
  logo: {
    color: '#ffd180',
    flip: false,
    direction: 'ltr',
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

/**
 * Main top bar of the app, contains the activity's title and actions
 */
function TopBar({ elevation, mainHeader, onDownload, onReset }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const devMenuButtonRef = useRef(null);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={elevation ? 4 : 0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {mainHeader}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <IconButton color="inherit" onClick={onDownload}>
            <SaveAltIcon />
          </IconButton>
          <IconButton color="inherit" onClick={onReset}>
            <DeleteIcon />
          </IconButton>
          {/* Create the dev menu only on development environment (when running on `npm start`) */}
          {process.env.NODE_ENV && process.env.NODE_ENV === 'development' && (
            <React.Fragment>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <Tooltip title="Developer Menu">
                <IconButton color="inherit" onClick={() => { setDevMenuOpen(true); }}>
                  <CodeIcon />
                  <div ref={devMenuButtonRef}></div>
                </IconButton>
              </Tooltip>
              <DevMenu
                open={devMenuOpen}
                anchorEl={devMenuButtonRef.current}
                onClose={() => { setDevMenuOpen(false); }}
              />
            </React.Fragment>
          )}
          {/* </devmenu> */}
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
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  /** Elevation shadow amount */
  elevation: PropTypes.number,
  /** Activity's main header */
  mainHeader: PropTypes.string,
  /** Activity download event */
  onDownload: PropTypes.func,
  /** Activity reset event */
  onReset: PropTypes.func,
};

export default TopBar;
