import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { fade } from '@material-ui/core/styles/colorManipulator'



const BootstrapButton = withStyles({
  root: {
    marginLeft: '0.5em',
    borderColor: '#EA9123',
    '&:active': {
      borderColor: '#EA9123'
    },
    '&:hover': {
      backgroundColor: fade('#EA9123', 0.08)
    }
  }
})(Button)

const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em'
  }
})

const OpenInCytoscapeButton = props => {
  
  const { startCyRestPollingFunction, stopCyRestPollingFunction } = props
  
  useEffect(() => {
    
    typeof(startCyRestPollingFunction) === typeof(Function) && startCyRestPollingFunction();
    return () => {
      typeof(stopCyRestPollingFunction) === typeof(Function) && stopCyRestPollingFunction();
    }
  }, [])

  const { classes } = props

  const disabled = false;
  /** 
    !(props.network.uuid && props.network.uuid.length > 0) ||
    !props.cyrest.available */

  const handleClick = () => {
    props.handleImportNetwork()
  }
/*
  const handleClose = (event, reason) => {
    console.log('click')
    if (state === 'openLoading') {
      setState('closeLoading')
    } else if (state === 'openResult') {
      setState('dormant')
      cycleId++
    }
    setOpen(false)
  }
*/
  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title="Open this network in Cytoscape Desktop"
        placement="bottom"
      >
        <div>
          <BootstrapButton
            className={classes.button}
            variant="outlined"
            disabled={disabled}
            onClick={handleClick}
          >
            <img
              alt="Cytoscape logo"
              src={disabled ? logoDisabled : logo}
              className={classes.buttonIcon}
            />
          </BootstrapButton>
        </div>
      </Tooltip>
     
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
