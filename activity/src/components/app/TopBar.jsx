import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
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
function TopBar({
  elevation,
  mainHeader,
  onDownload,
  onReset,
}) {
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
            <>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <Tooltip title="Developer Menu">
                <IconButton color="inherit" onClick={() => { setDevMenuOpen(true); }}>
                  <CodeIcon />
                  <div ref={devMenuButtonRef} />
                </IconButton>
              </Tooltip>
              <DevMenu
                open={devMenuOpen}
                anchorEl={devMenuButtonRef.current}
                onClose={() => { setDevMenuOpen(false); }}
              />
            </>
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
  elevation: PropTypes.bool,
  /** Activity's main header */
  mainHeader: PropTypes.string.isRequired,
  /** Activity download event */
  onDownload: PropTypes.func.isRequired,
  /** Activity reset event */
  onReset: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  elevation: false,
};

export default TopBar;
