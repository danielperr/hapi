import React, { useState } from 'react';

import styled from 'styled-components';

import { makeStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { useSpring, animated, config } from 'react-spring';

const useStyles = makeStyles(() => ({
  menuButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#DDDDDD',
    },
    border: 'none',
    outline: 'none',
  },
}));


function Menu({onSave, onExport}) {
  const classes = useStyles();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClickHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleClickSave = () => {
    onSave();
  };

  const handleClickExport = () => {
    onExport();
  };

  const { right } = useSpring({ from: { right: '-320px' }, right: isOpen ? '-20px' : '-320px', config: config.stiff });

  return (
    <>
      <StyledHamburgerDiv>
        <IconButton aria-label="menu" className={classes.menuButton} onClick={handleClickHamburger}>
          <MenuIcon />
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
            <StyledInnerButtonDiv>
              <p>טעינת קובץ</p>
              <input type="file" id="fileinput" />
            </StyledInnerButtonDiv>
            <StyledMenuButton
              onClick={handleClickSave}
            >
              שמירת קובץ
            </StyledMenuButton>
            <StyledMenuButton
              onClick={handleClickExport}
            >
              ייצוא פעילות
            </StyledMenuButton>
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
  height: 150px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const StyledInnerButtonDiv = styled.div`
  line-height: 1px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 4px;
  font-size: 20px;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const StyledMenuButton = styled.button`
  font-size: 20px;
  border-radius: 4px;
`;

export default Menu;
