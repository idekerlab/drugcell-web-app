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
  textTransform: 'none'
}

class TitleBar extends React.Component {

  render() {
    const { classes, ...others } = this.props

    return (
      <AppBar
        color="inherit"
        className={classes.appBar}
      >
        <div className={classes.noWrap}>
          <Toolbar disableGutters={true}>
            <Tooltip
              title="Explore DrugCell analysis results by Drug / Pathway"
              aria-label="drugcell_tooltip"
            >
              <div>
                <Button style={titleStyle}>
                  <HomeIcon fontSize="default" className={classes.homeLogo} />
                 
                  <Typography variant="h6" color="inherit" noWrap={true}>
                    DrugCell: Find Pathways
                  </Typography> 
                  <Typography variant="subtitle1" color="inherit" noWrap={true} className={classes.descriptionText} >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Typography>
                </Button>
                
              </div>
            </Tooltip>

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
                  >
                    <HelpIcon className={classes.logo} />
                  </IconButton>
                </Typography>
              </Tooltip>
             
            </div>
          </Toolbar>
        </div>
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
