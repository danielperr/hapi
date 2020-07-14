import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Menu';
import IconMenuBook from '@material-ui/icons/MenuBook';
import IconIfigure from '@material-ui/icons/CastForEducation';
import IconRxitToApp from '@material-ui/icons/ExitToApp';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linearProgressBar: {
        color: theme.palette.secondary.main,
    },
  }));

    
  class TopBar extends React.Component {

    constructor(props) 
    {
        super(props);
    }
 
    render () {
        const theme = useTheme();
        const classes = useStyles(theme);

        return (
        <div className={classes.root}>
            <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu">
                <IconMenu />
                </IconButton>
                <IconButton edge="start" className={ classes.menuBook } color="inherit" aria-label="menu">
                <IconMenuBook />
                </IconButton>
                <Typography variant="h6" className={ classes.title }>
                הדמיית תנועה פעילות ראשונה
                </Typography>

                <Button edge="end" className={ classes.menuBook } color="inherit" aria-label="menu" onclick={ window.open('https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html','_blank') } >
                    <Typography edge="end" variant="h6">
                    New Empty IFigure 
                    </Typography>
                <IconIfigure />
                </Button>
            </Toolbar>
            <LinearProgress color="secondary" variant="determinate" value={this.props.progress} />
            </AppBar>
        </div>
        );
    }
  }

  export default withStyles(styles, { withTheme: true })(TopBar);
  