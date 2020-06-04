import React from 'react'


import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  buttonIcon: {
    height: '2em'
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

const CopyToClipboardButton = props => {
  const { classes } = props

  return (
    <Tooltip title="Copy genes to Clipboard" placement="bottom">
      <div>
        <BootstrapButton
          variant="outlined"
          disabled={false}
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={faClipboard} size="2x" />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(CopyToClipboardButton)
