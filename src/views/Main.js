import { Grid } from '@mui/material'
// import GMap from 'components/GMap/GMap'
// import GMap2 from 'components/GMap2/GMap2'
import Map from 'old/map'
import React from 'react'

export default function Main(props) {
  return (
    <Grid container className="">
      <div style={{ height: 500, width: 500 }}>
        <Map />
      </div>
    </Grid>
  )
}
