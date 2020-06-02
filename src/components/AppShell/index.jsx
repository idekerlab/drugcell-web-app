import React, { useEffect } from 'react'
import './style.css'

import TitleBar from './TitleBar'

import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vmin'
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 0.5em',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

const AppShell = props => {
 
  const { classes, ...others } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar {...others} />
      <div
        className={classes.content}
      />
      {props.children}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AppShell)
