import React from 'react'
import { MapContainer as Map, TileLayer } from 'react-leaflet'
import { geojson } from './geo'
import HeatmapLayer from './HeatmapLayer'

class GMap2 extends React.Component {
  render() {
    return (
      <div>
        <Map center={[0, 0]} zoom={13}>
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            // points={addressPoints}
            // longitudeExtractor={(m) => m[1]}
            // latitudeExtractor={(m) => m[0]}
            // intensityExtractor={(m) => parseFloat(m[2])}
            points={geojson}
            longitudeExtractor={({ lng }) => lng}
            latitudeExtractor={({ lat }) => lat}
            intensityExtractor={({ lat }) => parseFloat(lat)}
            // max={100}
            // minOpacity={0.2}
          />
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    )
  }
}

export default GMap2
