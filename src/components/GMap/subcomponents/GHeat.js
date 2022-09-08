import React, { useState } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { geojson } from '../geo'

const gradient_DEFAULT = {
  0.1: 'green',
}
// const gradient_DEFAULT = {
//   0.1: '#89BDE0',
//   0.2: '#96E3E6',
//   0.4: '#82CEB6',
//   0.6: '#FAF3A5',
//   0.8: '#F5D98B',
//   '1.0': '#DE9A96',
// }
const blur_DEFAULT = 8
const radius_DEFAULT = 4
const max_DEFAULT = 0.5

export default function GHeat({ control, points }) {
  let { gradient, radius, blur, max } = control
  radius = radius ?? radius_DEFAULT
  points = points ?? []
  blur = blur ?? blur_DEFAULT
  max = max ?? max_DEFAULT
  gradient = gradient ?? gradient_DEFAULT

  return (
    <div>
      <HeatmapLayer
        // limitAddressPoints
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={points}
        longitudeExtractor={({ lon }) => lon}
        latitudeExtractor={({ lat }) => lat}
        intensityExtractor={({ lat }) => parseFloat(lat)}
        gradient={gradient}
        radius={Number(radius)}
        blur={Number(blur)}
        max={Number.parseFloat(max)}
      />
      heatHidden
    </div>
  )
}
