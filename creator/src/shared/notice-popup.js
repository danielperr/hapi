import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(-4),
  },
  listItemText: {
    textAlign: 'right',
    direction: 'rtl',
  },
  listItemIcon: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(-3),
  },
}));

/**
 * A popup that appears when you click or hover on a notice button.
 * If there's one notice, it shows it on a tooltip (hover activated)
 * If there's 2 or more, it shows it on a menu (click activated)
 * Children contains the notice button / icon to assign the event to
 */
function NoticePopup({ mainNoticeObject, childrenNoticeObjects, children }) {
  const classes = useStyles();

  const clickListenerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalNoticeObjects = [...childrenNoticeObjects];
  if (mainNoticeObject) { totalNoticeObjects.unshift(mainNoticeObject); }

  const singleNotice = totalNoticeObjects.length === 1 && totalNoticeObjects[0].notices.length === 1
    ? totalNoticeObjects[0].notices[0]
    : false;

  const handleClickNotice = () => {
    if (!singleNotice) {
      setMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleClickItem = (itemId) => () => {
    handleCloseMenu();
    window.setTimeout(() => {
      const docElement = document.getElementById(itemId);
      if (docElement) {
        docElement.scrollIntoView({ behavior: 'smooth', block: 'center', });
      }
    }, 200);
  };

  const menuContent = [];
  if (mainNoticeObject) {
    mainNoticeObject.notices.forEach(({ title, description }, i) => {
      menuContent.push(
        <MenuItem onClick={handleCloseMenu} key={i}>
          <ListItemText className={classes.listItemText} primary={title} secondary={description} />
        </MenuItem>
      );
    });
  }
  childrenNoticeObjects.forEach(({ id, notices }) => {
    notices.forEach(({ title, description }) => {
      menuContent.push(
        <MenuItem onClick={handleClickItem(id)} key={id}>
          <ListItemText className={classes.listItemText} primary={title} secondary={description} />
          <ListItemIcon className={classes.listItemIcon}>
            <ArrowBackIosIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      );
    });
  })

  return (
    <>
      <div onClick={handleClickNotice} ref={clickListenerRef}>
        <Tooltip title={
          singleNotice
          ? (<>
              <Typography color="inherit"><b>{singleNotice.title}</b></Typography>
              <Typography style={{ fontSize: '12px' }} variant="body1">
                {singleNotice.description ? singleNotice.description : ''}
              </Typography>
            </>)
          : 'לחץ כדי לראות את האזהרות'
        }>
          {children}
        </Tooltip>
      </div>
      <Menu
        id="notices-menu"
        getContentAnchorEl={null}
        anchorEl={clickListenerRef.current}
        keepMounted
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        className={classes.menu}
        PaperProps={{
          style: {
            maxHeight: '512px',
          },
        }}
      >
        {menuContent}
      </Menu>
    </>
  );
}

const noticeObjectType = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
});

NoticePopup.propTypes = {
  /** The notice object of the main component (the one using this notice popup) */
  mainNoticeObject: noticeObjectType,
  /** The notice objects of the main component's children,
   * it is used to separate them from the main notice object. */
  childrenNoticeObjects: PropTypes.arrayOf(noticeObjectType),
  /** This will contain the notice button / clickable icon from where the popup will show */
  children: PropTypes.node.isRequired,
};

NoticePopup.defaultProps = {
  mainNoticeObject: null,
  childrenNoticeObjects: [],
};

export default NoticePopup;
