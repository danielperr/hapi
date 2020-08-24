import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { Link, Events} from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 60,
    left: 0,
    marginTop: 0,
    width: 175,
    flexShrink: 0,
    order: 2,
    position: "fixed",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: theme.spacing(2, 0, 2, 2),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
  },
  item: {
    fontSize: 13,
    padding: theme.spacing(0.5, 1, 0.5, 0),
    borderRight: "4px solid transparent",
    textDecoration: "none",
    boxSizing: "content-box",
    color: theme.palette.text.secondary,
    "&:hover": {
      borderRight: `4px solid ${
        theme.palette.type === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[900]
      }`,
    },
    "&$active,&:active": {
      borderRight: `4px solid ${
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
            <Box fontWeight="fontWeightBold">{"תוכן עניינים"}</Box>
          </Typography>
          <Typography component="ul" className={classes.ul}>
            {items.map((item) => (
              <li key={item.text}>{itemLink(item)}</li>
            ))}
          </Typography>
        </React.Fragment>
      ) : null}
    </nav>
  );
};

export default AppTableOfContents;
