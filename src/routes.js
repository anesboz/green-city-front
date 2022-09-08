import About from 'views/About'
import Contact from 'views/Contact'
import Main from 'views/Main'
import HomeIcon from '@mui/icons-material/Home'
import GrassIcon from '@mui/icons-material/Grass'

import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import React from 'react'

export const routes = [
  {
    name: `Home`,
    path: `/`,
    component: <Main />,
    icon: <HomeIcon />,
  },
  {
    name: `About`,
    path: `/about`,
    component: <About />,
    icon: <GrassIcon />,
  },
  {
    name: `Contact`,
    path: `/contact`,
    component: <Contact />,
    icon: <ContactSupportIcon />,
  },
]
