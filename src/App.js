import Main from 'views/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from 'views/About'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DARK_GREEN, GREEN } from 'variables/colors'
import { createContext, useState } from 'react'
import CostumAppBar from 'components/CostumAppBar'
import MyDrawer from 'components/LeftDrawer'
import { routes } from 'routes'

const theme = createTheme({
  palette: {
    primary: {
      main: DARK_GREEN,
    },
    secondary: {
      main: GREEN,
    },
  },
})

export const GContext = createContext()

export default function App() {
  const [openLeft, setOpenLeft] = useState(false)
  // const [openRight, setOpenRight] = useState(false)
  const [zonesDisplay, setZonesDisplay] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/green-city-front">
        <GContext.Provider
          value={{
            zonesDisplayHook: [zonesDisplay, setZonesDisplay],
            openLeftHook: [openLeft, setOpenLeft],
          }}
        >
          <CostumAppBar />
          <MyDrawer anchor={`left`} openHook={[openLeft, setOpenLeft]} />
          <Routes>
            {routes.map((e, i) => (
              <Route key={i} path={e.path} element={e.component} />
            ))}
            <Route path="*" element={<Main />} />
          </Routes>
        </GContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
