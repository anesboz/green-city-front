import { Grid } from '@mui/material'
import { GContext } from 'App'
import React, { useContext, useState } from 'react'
import {MapContainer, TileLayer } from 'react-leaflet'
import Quadrillage from './Quadrillage/Quadrillage'

const initMap = {
  zoom: 12,
  canter: [48.852174427333274, 2.299322310264648],
}

const initMap2 = {
  zoom: 12,
  canter: [12.9716, 77.5946],
}

export default function GMap(props) {
  const [center, setCenter] = useState(initMap.center)

  const { zonesDisplayHook } = useContext(GContext)
  const [zonesDisplay] = zonesDisplayHook

  return (
    <Grid container>
      <MapContainer
        center={center}
        zoom={initMap.zoom}
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
