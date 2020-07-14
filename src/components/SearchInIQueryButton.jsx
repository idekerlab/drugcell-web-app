import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import { fade } from '@material-ui/core/styles/colorManipulator'
import logo from '../assets/images/ndex-logo.svg'
import logoDisabled from '../assets/images/ndex-logo-mono-light.svg'



const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em',
    color: '#4DA1DE'
  }
})

/**
 * Simply open the parent network
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const SearcInIQueryButton = props => {
  const { classes , disabled } = props

  const BootstrapButton = withStyles({
    root: {
      width: '4.3em',
      borderColor: '#4DA1DE',
      color: '#4DA1DE',
      '&:active': {
        borderColor: '#4DA1DE',
        color: '#4DA1DE'
      },
      '&:hover': {
        backgroundColor: fade('#4DA1DE', 0.08)
      }
    }
  })(Button)

  return (
    <Tooltip
      disableFocusListener
      title="Search for genes in IQuery"
      placement="bottom"
    >
      <div>
        <BootstrapButton
          className={classes.button}
          variant="outlined"
          disabled={props.disabled}
          onClick={props.onClick}
        >
          <img
            alt="NDEx logo"
            src={disabled ? logoDisabled : logo}
            className={classes.buttonIcon}
          />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(SearcInIQueryButton)
