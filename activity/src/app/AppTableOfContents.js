import React, { useEffect } from "react";

import clsx from "clsx";
import { Link, Events } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { strings } from "../shared/localization";

const useStyles = makeStyles((theme) => ({
  root: {
    flip: false,
    top: 60,
    left: 0,
    margin: theme.spacing(0, 2),
    width: 175,
    flexShrink: 0,
    order: 2,
    position: "fixed",
    overflowY: "auto",
    padding: theme.spacing(2, 0, 2, 2),
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
  },
  li: {
    display: 'flex',
  },
  item: {
    fontSize: 13,
    padding: theme.spacing(0.5, 1),
    borderLeft: "4px solid transparent",
    textDecoration: "none",
    boxSizing: "content-box",
    color: theme.palette.text.secondary,
    "&:hover": {
      borderLeft: `4px solid ${
        theme.palette.type === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[900]
      }`,
    },
    "&$active,&:active": {
      borderLeft: `4px solid ${
        theme.palette.type === "light"
          ? theme.palette.grey[500]
          : theme.palette.grey[800]
      }`,
      color: theme.palette.text.primary,
    },
  },
  active: {},
}));

const AppTableOfContents = (props) => {
  const classes = useStyles();
  const [activeState, setActiveState] = React.useState();

  useEffect(() => {
    // componentDidMount
    Events.scrollEvent.register("begin", function (to, element) {
      //console.log('begin', to, element);
    });

    Events.scrollEvent.register("end", function (to, element) {
      //console.log('end', to, element);
      setActiveState(element.id);
    });

    return () => {
      // componentWillUnmount
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
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
      offset={-98}
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
  props.structure.sections.forEach((section) => {
    items.push({ text: section.header, hash: section.id });
  });
  
  
  return (
    <nav className={classes.root} aria-label={"Page Table Of Contents"}>
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

export default AppTableOfContents;
