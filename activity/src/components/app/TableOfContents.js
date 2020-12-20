import React, { useEffect } from 'react';

import { Events, Link } from 'react-scroll';
import clsx from 'clsx';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { strings } from '../../localization';

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

  // componentDidMount
  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
      //console.log('begin', to, element);
    });

    Events.scrollEvent.register('end', function (to, element) {
      //console.log('end', to, element);
      setActiveState(element.id);
    });

    // componentWillUnmount
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  /*
  const scrollTo = (eId, offset) => {
    scroller.scrollTo(eId, {
      duration: 1000,
      delay: 0,
      smooth: "easeOutQuint",
      offset: offset,
    });
  };

  
  const handleClick = (hash) => (event) => {
    // Ignore click for new tab/new window behavior
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    scrollTo(hash, -98);

    setActiveState(hash);
  };
  */

  const handleSetActive = (hash) => {
    setActiveState(hash);
  };

  const itemLink = (item) => (
    <Link
      to={item.hash}
      spy={true}
      smooth={true}
      offset={item.index === 0 ? -98 : -90}
      duration={500}
      isDynamic={true}
      onSetActive={() => handleSetActive(item.hash)}
      //onSetInactive={this.handleSetInactive}
      ignoreCancelEvents={false}
      href={`#${item.hash}`}
      //onClick={handleClick(item.hash)}
      className={clsx(
        classes.item,
        activeState === item.hash ? classes.active : undefined
      )}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </Link>
  );

  const items = [];
  structure.sections.forEach((section, index) => {
    items.push({ text: section.header, hash: section.id, index: index });
  });
  
  
  return (
    <nav className={classes.root} aria-label={'Page Table Of Contents'}>
      {items.length > 0 ? (
        <React.Fragment>
          <Typography gutterBottom className={classes.contents}>
            <Box fontWeight="fontWeightBold">{strings.tableOfContents}</Box>
          </Typography>
          <Typography component="ul" className={classes.ul}>
            {items.map((item) => (
              <li key={item.text} className={classes.li}>{itemLink(item)}</li>
            ))}
          </Typography>
        </React.Fragment>
      ) : null}
    </nav>
  );
};

export default TableOfContents;
