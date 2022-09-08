import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { APP_NAME } from 'variables/constants'
import { useNavigate } from 'react-router-dom'
import { routes } from 'routes'
import { useContext } from 'react'
import { GContext } from 'App'
import React from 'react'

export default function CostumAppBar({ leftHook }) {
  const { openLeftHook } = useContext(GContext)
  const [openLeft, setOpenLeft] = openLeftHook

  const navigate = useNavigate()

  return (
    <AppBar component="nav" className="" style={{ position: `relative` }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setOpenLeft(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            // display: { xs: 'none', sm: 'block' },
            cursor: `pointer`,
          }}
          onClick={() => window.location.reload()}
        >
          🌳&nbsp;{APP_NAME}
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {routes.map(({ name, path, icon }) => (
            <Button
              key={name}
              sx={{ color: '#fff' }}
              onClick={() => navigate(path)}
            >
              {icon}&nbsp;
              {name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
