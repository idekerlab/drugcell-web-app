import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { status } from '../api/cyrest'

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

  let pollCyREST = false;
  const [cyRESTAvailable, setCyRESTAvailable] = useState(false);

  function refresh() {
    if (cyRESTPollingActive) {
      status(1234).then(
        response => response.json()
      ).then(data => {
        setCyRESTAvailable(true);
      }).catch((error) => {
        setCyRESTAvailable(false);
      });

      setTimeout(refresh, 5000);
    }
  }

  const defaultPollingStart = () => {
    pollCyREST = true;
    setTimeout(refresh, 5000);
  };

  const defaultPollingStop = () => {
    pollCyREST = false;
  };

  const defaultGetAvailable = () => {
    return cyRESTAvailable
  };

  const defaultGetPollingActive = () => {
    return pollCyREST;
  }

  const CYREST_BASE_URL = 'http://127.0.0.1'
  const METHOD_POST = 'POST';

  const importNetwork = () => {
    fetchCX().then( cx => {
      const importNetworkUrl =
      CYREST_BASE_URL + ':' + cyRESTPort + '/cyndex2/v1/networks/cx'
    console.log('Calling CyREST POST:', importNetworkUrl)
  
    return fetch(importNetworkUrl, {
      method: METHOD_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cx)
    })}).catch(error => { console.log(error)});
  }

  const { 
    startCyRestPollingFunction = defaultPollingStart,
    stopCyRestPollingFunction = defaultPollingStop,
    getAvailable = defaultGetAvailable,
    cyRESTPollingActive = defaultGetPollingActive,
    cyRESTPort = 1234,
    fetchCX
  } = props

  useEffect(() => {
      typeof (startCyRestPollingFunction) === typeof (Function) && startCyRestPollingFunction();
    return () => {
      typeof (stopCyRestPollingFunction) === typeof (Function) && stopCyRestPollingFunction();
    }
  }, [])

  const { classes } = props

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
            disabled={!getAvailable()}
            onClick={importNetwork}
          >
            <img
              alt="Cytoscape logo"
              src={!getAvailable() ? logoDisabled : logo}
              className={classes.buttonIcon}
            />
          </BootstrapButton>
        </div>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
