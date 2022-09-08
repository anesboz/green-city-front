import { Grid } from '@mui/material'
import { GContext } from 'App'
import React, { useContext, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Quadrillage from './Quadrillage/Quadrillage'

export default function GMap(props) {
  const defaultCenter = [48.852174427333274, 2.299322310264648] // default par Paris
  const [center, setCenter] = useState(defaultCenter)

  const { zonesDisplayHook } = useContext(GContext)
  const [zonesDisplay] = zonesDisplayHook

  return (
    <Grid container>
      <MapContainer
        center={center}
        zoom={12}
        style={{
          minHeight: '90vh',
          width: `100%`,
          marginBottom: 0,
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Quadrillage
          hide={zonesDisplay === false}
          centerHook={[center, setCenter]}
        />
      </MapContainer>
    </Grid>
  )
}
