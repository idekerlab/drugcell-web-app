import React, { useEffect } from 'react'
import './style.css'

import TitleBar from './TitleBar'

import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    height: '100vmin',
    display: 'flex',
    'flex-direction': 'column'
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 0.5em',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    position: 'fixed',
    'margin-top': '70px',
    width: '100vw',
    height: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
})

const AppShell = props => {
 
  const { classes, ...others } = props

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar {...others} />
      <div className={classes.content}>
      {props.children}
      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AppShell)
