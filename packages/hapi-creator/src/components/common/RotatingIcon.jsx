import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: 24,
  },
  passiveIcon: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    opacity: 1,
    transform: 'rotate(0deg)',
  },
  passiveIconHide: {
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
  activeIcon: {
    position: 'absolute',
    left: 0,
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0,
    transform: 'rotate(45deg)',
  },
  activeIconShow: {
    opacity: 1,
    transform: 'rotate(0deg)',
  },
}));

function RotatingIcon({ active, passiveIcon, activeIcon, className, ...other }) {
  const classes = useStyles();

  const passiveIconClassName = clsx(classes.passiveIcon, { [classes.passiveIconHide]: active });
  const activeIconClassName = clsx(classes.activeIcon, { [classes.activeIconShow]: active });

  const assignClassName = (element, className) => {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, { className });
    }
    return element;
  };

  return (
    <span className={clsx(classes.root, className)} {...other}>
      {assignClassName(passiveIcon, passiveIconClassName)}
      {assignClassName(activeIcon, activeIconClassName)}
    </span> 
  )

}

export default RotatingIcon
