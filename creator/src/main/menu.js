import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { makeStyles, IconButton, Button, Box, CircularProgress, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useSpring, animated, config } from 'react-spring';

import Dropzone from '../shared/dropzone';
import RotatingIcon from '../shared/rotating-icon';

const useStyles = makeStyles((theme) => ({
  menuOpenButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#DDDDDD',
    },
    border: 'none',
    outline: 'none',
  },
  menuButton: {
    marginTop: theme.spacing(1),
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
  
  const [isOpen, setIsOpen] = useState(true);
  
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

  const { right } = useSpring({ from: { right: '-320px' }, right: isOpen ? '-20px' : '-320px', config: config.stiff });

  return (
    <>
      <StyledHamburgerDiv>
        <IconButton aria-label="menu" className={classes.menuOpenButton} onClick={handleClickHamburger}>
          <RotatingIcon
            active={isOpen}
            passiveIcon={<MenuIcon />}
            activeIcon={<ArrowForwardIcon/>}
          />
        </IconButton>
      </StyledHamburgerDiv>
      <animated.div
        style={{
          position: "fixed",
          top: '64px',
          right: right,
        }}
      >
        <StyledButtonMenu>
            <StyledDropzone onRead={handleDropzoneRead}>
              <h3>טעינת קובץ</h3>
              <p>ניתן ללחוץ או לגרור הנה</p>
            </StyledDropzone>
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
        </StyledButtonMenu>
      </animated.div>
    </>
  );
}

const StyledHamburgerDiv = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
`

const StyledButtonMenu = styled.div`
  background-color: white;
  position: relative;
  top: 0px;
  right: 0px;
  padding: 16px 36px 16px 16px;
  display: flex;
  border-radius: 8px 0 0 8px;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const StyledDropzone = styled(Dropzone)`
  line-height: 1px;
  border: 1px dashed gray;
  border-radius: 4px;
  padding: 4px 16px;
  line-height: 50%;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer !important;
`;

const StyledMenuButton = styled.button`
  font-size: 20px;
  border-radius: 4px;
`;

export default Menu;
