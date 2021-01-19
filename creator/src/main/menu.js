import React, { useState } from 'react';

import {
  makeStyles,
  IconButton,
  Button,
  Box,
  CircularProgress,
  Select,
  FormControl,
  MenuItem,
  Slide,
  Typography,
  Divider,
  InputLabel,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import LaunchIcon from '@material-ui/icons/Launch';

import RotatingIcon from '../shared/rotating-icon';

const useStyles = makeStyles((theme) => ({
  floatingButtonContainer: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  floatingButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#DDDDDD',
    },
    border: 'none',
    outline: 'none',
    margin: theme.spacing(1),
  },
  buttonMenu: {
    backgroundColor: 'white',
    position: 'fixed',
    top: '144px',
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
  startIcon: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(-1.5),
  },
  textIcon: {
    position: 'relative',
    top: theme.spacing(0.6),
    left: theme.spacing(0.8),
    marginTop: theme.spacing(-2),
    fontSize: '20px',
  },
  newActivityButton: {
    marginBottom: theme.spacing(1),
  },
  dropzone: {
    border: '1px dashed rgba(0,0,0,0.23)',
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
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  languageSelectLabel: {
    top: theme.spacing(-0.75),
    left: 'auto',
    right: theme.spacing(-1),
  },
  languageSelect: {
    height: '42px',
    '& legend': {
      textAlign: 'right',
    }
  },
}));


function Menu({
  onLoad,
  onNewActivity,
  onSave,
  onExport,
  exportLoading,
  language,
  onChangeLanguage,
  onLaunchPreview,
}) {
  const classes = useStyles();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleClickPreview = () => {
    onLaunchPreview();
  }
  
  const handleClickHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleClickNewActivity = () => {
    onNewActivity();
  }

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
      <div className={classes.floatingButtonContainer}>
        <IconButton aria-label="preview" className={classes.floatingButton} onClick={handleClickPreview}>
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="menu" className={classes.floatingButton} onClick={handleClickHamburger}>
          <RotatingIcon
            active={isOpen}
            passiveIcon={<MenuIcon />}
            activeIcon={<ArrowForwardIcon/>}
          />
        </IconButton>
      </div>
      <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
        <div className={classes.buttonMenu}>
            <Button
              className={`${classes.menuButton} ${classes.newActivityButton}`}
              variant="outlined"
              onClick={handleClickNewActivity}
              startIcon={<CreateIcon className={classes.startIcon} />}
            >
              פעילות חדשה
            </Button>
            <div className={classes.dropzone} onRead={handleDropzoneRead}>
              <Typography variant="subtitle1"><FolderOpenIcon className={classes.textIcon} />טעינת קובץ</Typography>
              <Typography variant="caption">ניתן ללחוץ או לגרור הנה</Typography>
            </div>
            <Button
              className={classes.menuButton}
              variant="outlined"
              onClick={handleClickSave}
              startIcon={<SaveIcon className={classes.startIcon} />}
            >
              שמירת קובץ
            </Button>
            <Box className={classes.exportContainer}>
              <Button
                className={`${classes.menuButton} ${classes.exportButton}`}
                variant="outlined"
                onClick={handleClickExport}
                disabled={exportLoading}
                startIcon={<LaunchIcon className={classes.startIcon} />}
              >
                ייצוא פעילות
              </Button>
              {exportLoading && <CircularProgress size={24} className={classes.exportProgress} />}
            </Box>
            <Divider className={classes.divider} />
            <FormControl
              className={classes.languageFormControl}
              variant="outlined"
            >
              <InputLabel
                variant="subtitle2"
                id="language-input-label"
                className={classes.languageSelectLabel}
              >
                שפת הפעילות
              </InputLabel>
              <Select
                value={language}
                onChange={handleChangeLanguage}
                labelId="language-input-label"
                label="שפת הפעילות"
                className={classes.languageSelect}
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
