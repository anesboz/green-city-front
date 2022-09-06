import Drawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { styled } from '@mui/material/styles'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import { useContext } from 'react'
import { GContext } from 'App'
import { routes } from 'routes'
import { useNavigate } from 'react-router-dom'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

export default function MyDrawer({
  anchor,
  content,
  openHook,
  displayZonesHook,
}) {
  const [open, setOpen] = openHook

  const { zonesDisplayHook } = useContext(GContext)
  const [zonesDisplay, setZonesDisplay] = zonesDisplayHook

  const navigate = useNavigate()

  return (
    <Drawer anchor={anchor} open={open} onClick={() => setOpen(false)}>
      {/* {content} */}
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          {anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <div style={{ width: 250 }} onClick={(event) => event.stopPropagation()}>
        <List>
          <ListItem
            disablePadding
            onClick={() => setZonesDisplay(!zonesDisplay)}
          >
            <ListItemButton>
              <ListItemIcon>
                <ArchitectureIcon />
              </ListItemIcon>
              <ListItemText primary={'Zones'} />
              <Switch defaultChecked checked={zonesDisplay} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* {routes.map(({ name, path }) => (
          <Button key={name} sx={{ color: '#fff' }}>
            {name}
          </Button>
        ))} */}

        <List>
          {routes.map(({ name, path, icon }, index) => (
            <ListItem
              key={name}
              disablePadding
              onClick={() => {
                setOpen(false)
                navigate(path)
              }}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}
