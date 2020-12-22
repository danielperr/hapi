import React, { useState } from 'react';

import { makeStyles, IconButton, Button, Box, CircularProgress, Select, FormControl, MenuItem, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import RotatingIcon from '../shared/rotating-icon';

const useStyles = makeStyles((theme) => ({
  menuOpenButton: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#DDDDDD',
    },
    border: 'none',
    outline: 'none',
  },
  buttonMenu: {
    backgroundColor: 'white',
    position: 'fixed',
    top: '64px',
    right: '-20px',
    padding: theme.spacing(2, 4.5, 2, 2),
    display: 'flex',
    borderRadius: theme.spacing(1, 0, 0, 1),
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  menuButton: {
    marginTop: theme.spacing(1),
  },
  dropzone: {
    border: '1px dashed gray',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 2),
    lineHeight: '50%',
    textAlign: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer !important',
  },
  languageFormControl: {
    marginTop: theme.spacing(1),
  },
  exportContainer: {
    position: 'relative',
  },
  exportButton: {
    width: '100%',
  },
  exportProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
}));


function Menu({ onLoad, onSave, onExport, exportLoading, language, onChangeLanguage }) {
  const classes = useStyles();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClickHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleDropzoneRead = (contents) => {
    onLoad(contents);
  };

  const handleClickSave = () => {
    onSave();
  };

  const handleClickExport = () => {
    onExport();
  };

  const handleChangeLanguage = (e) => {
    onChangeLanguage(e.target.value);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="menu" className={classes.menuOpenButton} onClick={handleClickHamburger}>
        <RotatingIcon
          active={isOpen}
          passiveIcon={<MenuIcon />}
          activeIcon={<ArrowForwardIcon/>}
        />
      </IconButton>
      <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
        <div className={classes.buttonMenu}>
            <div className={classes.dropzone} onRead={handleDropzoneRead}>
              <h3>טעינת קובץ</h3>
              <p>ניתן ללחוץ או לגרור הנה</p>
            </div>
            <Button
              className={classes.menuButton}
              variant="outlined"
              onClick={handleClickSave}
            >
              שמירת קובץ
            </Button>
            <Box className={classes.exportContainer}>
              <Button
                className={`${classes.menuButton} ${classes.exportButton}`}
                variant="outlined"
                onClick={handleClickExport}
                disabled={exportLoading}
              >
                ייצוא פעילות
              </Button>
              {exportLoading && <CircularProgress size={24} className={classes.exportProgress} />}
            </Box>
            <FormControl
              variant="outlined"
              className={classes.languageFormControl}
            >
              <Select
                value={language}
                onChange={handleChangeLanguage}
              >
                <MenuItem value="en">אנגלית</MenuItem>
                <MenuItem value="he">עברית</MenuItem>
              </Select>
            </FormControl>
        </div>
      </Slide>
    </React.Fragment>
  );
}

export default Menu;
