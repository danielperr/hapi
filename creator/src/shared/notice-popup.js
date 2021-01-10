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
function NoticePopup({ noticeObjects, sectionId, children }) {
  const classes = useStyles();

  const clickListenerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const singleNotice = noticeObjects.length === 1 && noticeObjects[0].notices.length === 1
    ? noticeObjects[0].notices[0]
    : null;

  let totalNotices = [];
  noticeObjects.forEach(({ id, notices }) => {
    totalNotices = [...totalNotices, ...notices];
    // if (id === sectionId) {
    //   // If this notice object belongs to the section, put it first in the list
    //   totalNotices = [...notices, ...totalNotices];
    // } else {
    //   // Just add to the end
    //   totalNotices = [...totalNotices, ...notices];
    // }
  });

  console.log(totalNotices);

  const handleClickNotice = () => {
    if (singleNotice) {
      // Scroll to item
    } else {
      // Open menu
      setMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  }

  return (
    <>
      <div onClick={handleClickNotice} ref={clickListenerRef}>
        <Tooltip title={
          singleNotice
          ? (<>
              <Typography color="inherit"><b>{singleNotice.title}</b></Typography>
              <Typography style={{ fontSize: '12px' }} variant="body">
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
        anchorEl={clickListenerRef.current}
        keepMounted
        open={menuOpen}
        onClose={handleCloseMenu}
      >
        {totalNotices.map(({ title, description }) => (
          <MenuItem onClick={handleCloseMenu}>
            <ListItemText className={classes.listItemText} primary={title} secondary={description} />
            <ListItemIcon className={classes.listItemIcon}>
              <ArrowBackIosIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

NoticePopup.propTypes = {
  noticeObjects: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  /** If using in a section, provide the section's id to
   * separate its notices from its elements' notices. */
  sectionId: PropTypes.string,
  children: PropTypes.oneOfType([ Element ]).isRequired,
};

NoticePopup.defaultProps = {
  sectionId: '',
};

export default NoticePopup;
