import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import logo from '../../assets/images/ndex-logo.svg'
import cytoLogo from '../../assets/images/cytoscape-logo-mono-dark.svg'

import idekerLogo from '../../assets/images/ideker-logo-mono-dark.svg'

import HelpDialog from '../HelpDialog'

import HomeIcon from '@material-ui/icons/Home'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10
  },
  logo: {
    height: '1em',
    width: '1.5em'
  },
  homeLogo: {
    height: '1em',
    width: '1em',
    marginRight: '0.5em'
  },
  descriptionText: {
    marginLeft: '1em',
    color: 'grey'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  textBox: {
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  noWrap: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  }
})

const titleStyle = {
  position: 'relative',
  left: '1em',
  textTransform: 'none',
  display: 'contents'
}

class TitleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      helpOpen: false
    };
  }



  render() {
    const { classes, ...others } = this.props

    const handleHelpOpen = () => {
      this.setState({ helpOpen: true })
    };
  
    const handleHelpClose = () => {
      this.setState({ helpOpen: false })
    };

    return (
      <AppBar
        color="inherit"
        className={classes.appBar}
      >
        <div className={classes.noWrap}>
          <Toolbar disableGutters={true}>
               <div style={titleStyle}>
                <Button href="http://drugcell.ucsd.edu/">
                  <HomeIcon fontSize="default" className={classes.homeLogo} />
                </Button>
                <Button href="http://drugcell.ucsd.edu/findpathways/" style={titleStyle}>
                  <Typography variant="h6" color="inherit" noWrap={true}>
                    DrugCell Oracle: Find Pathways
                  </Typography> 
                  <Typography variant="subtitle1" color="inherit" noWrap={true} className={classes.descriptionText} >
                    Discover synergistic target pathways of 640 drugs identified by DrugCell
                  </Typography>
                  </Button>
              </div>
            <div className={classes.grow} />

            <div>
        
              <Tooltip
                title="Help"
                placement="bottom"
                style={{ marginRight: '1em' }}
              >
                <Typography color="textPrimary" noWrap={true} display="inline">
                  <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    onClick = { handleHelpOpen }
                  >
                    <HelpIcon className={classes.logo} />
                  </IconButton>
                </Typography>
              </Tooltip>
             
            </div>
          </Toolbar>
        </div>
        <HelpDialog open={this.state.helpOpen} onClose={handleHelpClose}></HelpDialog>
      </AppBar>
    )
  }
}

const HELP_URL =
  'https://github.com/cytoscape/search-portal/blob/master/README.md'
const CYTOSCAPE_URL = 'https://cytoscape.org/'
const NRNB_URL = 'https://nrnb.org/'
const WP_URL = 'https://www.wikipathways.org/'
const IL_URL = 'http://idekerlab.ucsd.edu/'


TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(TitleBar)
