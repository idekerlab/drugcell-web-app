import React from 'react'


import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core'

import logo from '../assets/images/zoom-logo.svg'
import disabledLogo from '../assets/images/zoom-logo-mono.svg'

const styles = theme => ({
  buttonIcon: {
    height: '1.75em',
    'padding-top': '4px'
  }, 
  button: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em'
  }
})

const BootstrapButton = withStyles({
  root: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em',
    borderColor: '#212121',
    color: '#212121',
    '&:active': {
      borderColor: '#212121',
      color: '#212121'
    }
  }
})(Button)

const ResetZoomButton = props => {
  const { classes } = props

  const disabled = false;

 

  return (
    <Tooltip title="Fit network to panel" placement="top">
      <div style={{ width: 'min-content' }}>
        <BootstrapButton
          //className="button"
          variant="outlined"
          disabled={disabled}
          onClick={props.onClick}
        >
          <img
            alt="Zoom logo"
            src={disabled ? disabledLogo : logo}
            className={classes.buttonIcon}
          />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(ResetZoomButton)
