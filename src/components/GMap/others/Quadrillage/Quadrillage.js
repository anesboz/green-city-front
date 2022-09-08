import React, { useEffect, useState } from 'react'
import { useMap, useMapEvent } from 'react-leaflet'
import Zone from './Zone'

export default function Quadrillage(props) {
  const [, setCenter] = props.centerHook
  const hide = props.hide
  const [points, setPoints] = useState([])

  const mMap = useMap()

  useEffect(() => loadPoints(mMap), [])
  useMapEvent('zoomend drag', () => loadPoints(mMap))

  if (hide === true) {
    return null
  }

  return (
    <div>
      {[...Array(11).keys()].map((i) => {
        if ([3, 7, 11].includes(i)) return null
        const a = points[i]
        const b = points[i + 5]
        if (a == null) return null
        return <Zone key={i} bounds={[a, b]} />
      })}
    </div>
  )

  function loadPoints(mMap) {
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
  }
}
