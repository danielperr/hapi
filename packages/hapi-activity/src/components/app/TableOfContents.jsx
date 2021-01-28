import React, { useEffect } from 'react';

import { Events, Link } from 'react-scroll';
import clsx from 'clsx';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { strings } from '../../localization';
import { activityStructureType } from '../../../../common/prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flip: false,
    top: 60,
    left: 0,
    margin: theme.spacing(0, 2),
    width: 175,
    flexShrink: 0,
    order: 2,
    position: 'fixed',
    overflowY: 'auto',
    padding: theme.spacing(2, 0, 2, 2),
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  li: {
    display: 'flex',
  },
  item: {
    fontSize: 13,
    padding: theme.spacing(0.5, 1),
    borderLeft: '4px solid transparent',
    textDecoration: 'none',
    boxSizing: 'content-box',
    color: theme.palette.text.secondary,
    '&:hover': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[900]
      }`,
    },
    '&$active,&:active': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light'
          ? theme.palette.grey[500]
          : theme.palette.grey[800]
      }`,
      color: theme.palette.text.primary,
    },
  },
  active: {},
}));

/**
 * The table of contents of the activity, located at the top left corner
 */
const TableOfContents = ({ structure }) => {
  const classes = useStyles();
  const [activeState, setActiveState] = React.useState();

  useEffect(() => {
    Events.scrollEvent.register('end', (_to, element) => {
      setActiveState(element.id);
    });

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const handleSetActive = (hash) => {
    setActiveState(hash);
  };

  const createItemLink = (item) => (
    <Link
      to={item.hash}
      spy
      smooth
      offset={item.index === 0 ? -98 : -90}
      duration={500}
      isDynamic
      onSetActive={() => handleSetActive(item.hash)}
      ignoreCancelEvents={false}
      href={`#${item.hash}`}
      className={clsx(
        classes.item,
        activeState === item.hash ? classes.active : undefined,
      )}
    >
      {item.text}
    </Link>
  );

  const items = structure.sections.map((section, index) => (
    { text: section.header, hash: section.id, index }
  ));

  return (
    <nav className={classes.root} aria-label="Page Table Of Contents">
      {items.length > 0 && (
        <>
          <Typography gutterBottom className={classes.contents}>
            <Box fontWeight="fontWeightBold">{strings.tableOfContents}</Box>
          </Typography>
          <Typography component="ul" className={classes.ul}>
            {items.map((item) => (
              <li key={item.text} className={classes.li}>{createItemLink(item)}</li>
            ))}
          </Typography>
        </>
      )}
    </nav>
  );
};

TableOfContents.propTypes = {
  structure: activityStructureType.isRequired,
};

export default TableOfContents;
