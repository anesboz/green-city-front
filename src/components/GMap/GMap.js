import { Button, CircularProgress, Grid } from '@mui/material'
import { GContext } from 'App'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Circle,
  Polygon,
  Tooltip,
  Popup,
  Rectangle,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import { GET_ARRONDISSEMENT_URL } from 'variables/constants'
import { getTemparature, getTrees, zoneToSquare } from './utils/utils'
import Zone from './Zone'

export const RAYON = 10 // km
export const delta_lat = (r) => r / 110.574
export const delta_long = (r, lat) => r / 111.32

// export const delta_lat = (r) => r / 110.574
// export const delta_long = (r, lat) => r / 111.32

export default function GMap(props) {
  const defaultCenter = [48.852174427333274, 2.299322310264648] // default par Paris
  function getMatrice(centerArr) {
    const [lat, lon] = centerArr
    const delta = RAYON

    return [
      [lat + delta_lat(delta), lon - delta_long(delta, lat)],
      [lat + delta_lat(delta), lon],
      [lat + delta_lat(delta), lon + delta_long(delta, lat)],

      [lat, lon - delta_long(delta, lat)],
      [lat, lon],
      [lat, lon + delta_long(delta, lat)],

      [lat - delta_lat(delta), lon - delta_long(delta, lat)],
      [lat - delta_lat(delta), lon],
      [lat - delta_lat(delta), lon + delta_long(delta, lat)],
    ]
  }

  const [center, setCenter] = useState(defaultCenter)
  const [dLat, setDLat] = useState(0)
  const [dLng, setDLng] = useState(0)

  const [points, setPoints] = useState([])

  const matrice = getMatrice(center)

  function SetViewOnClick({ animateRef }) {
    const mMap = useMap()

    const map = useMapEvent('zoomend drag', (e) => {
      let newBounds = mMap.getBounds()
      const { _northEast, _southWest } = newBounds

      const l = _northEast.lat - _southWest.lat
      const L = _northEast.lng - _southWest.lng

      setPoints([
        [_northEast.lat, _southWest.lng],
        [_northEast.lat, _southWest.lng + L / 3],
        [_northEast.lat, _southWest.lng + (2 * L) / 3],
        [_northEast.lat, _northEast.lng],

        [_southWest.lat + (2 * l) / 3, _southWest.lng],
        [_southWest.lat + (2 * l) / 3, _southWest.lng + L / 3],
        [_southWest.lat + (2 * l) / 3, _southWest.lng + (2 * L) / 3],
        [_southWest.lat + (2 * l) / 3, _northEast.lng],

        [_southWest.lat + l / 3, _southWest.lng],
        [_southWest.lat + l / 3, _southWest.lng + L / 3],
        [_southWest.lat + l / 3, _southWest.lng + (2 * L) / 3],
        [_southWest.lat + l / 3, _northEast.lng],

        [_southWest.lat, _southWest.lng],
        [_southWest.lat, _southWest.lng + L / 3],
        [_southWest.lat, _southWest.lng + (2 * L) / 3],
        [_southWest.lat, _northEast.lng],
      ])

      const center_ = [
        (_northEast.lat + _southWest.lat) / 2,
        (_northEast.lng + _southWest.lng) / 2,
      ]

      setCenter(center_)
      // map.setView(e.latlng, map.getZoom(), {
      //   animate: animateRef.current || false,
      // })
    })

    return null
  }
  const animateRef = useRef(false)

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
        <SetViewOnClick animateRef={animateRef} />
        {/* {matrice.map((e, i) => {
          return <Zone key={i} index={i} center={e} dLat={dLat} dLng={dLng} />
        })} */}
        {/* {points.map((e, i) => {
          return <Circle center={e} radius={1000}></Circle>
        })} */}
        {[...Array(11).keys()].map((i) => {
          if ([3, 7, 11].includes(i)) return null
          const a = points[i]
          const b = points[i + 5]
          if (a == null) return null
          return <Zone key={i} bounds={[a, b]} />
        })}
      </MapContainer>
    </Grid>
  )
}
