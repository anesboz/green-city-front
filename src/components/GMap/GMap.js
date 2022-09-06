import { Button, CircularProgress } from '@mui/material'
import { GContext } from 'App'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Circle,
  Polygon,
  Tooltip,
  Popup,
} from 'react-leaflet'
import { GET_ARRONDISSEMENT_URL } from 'variables/constants'

export default function GMap(props) {
  // const [zoneDisplay, setZoneDisplay] = props.displayZonesHook
  const center = [48.852174427333274, 2.299322310264648] // default par Paris
  const [loading, setloading] = useState(true)
  const [zones, setZones] = useState([])
  const [selected, setSelected] = useState(0)

  const { zonesDisplayHook } = useContext(GContext)
  const [zonesDisplay, setZonesDisplay] = zonesDisplayHook

  useEffect(() => {
    axios
      .get(GET_ARRONDISSEMENT_URL)
      .then((res) => {
        const data = res.data.records?.map((elt) =>
          elt.fields.geom.coordinates[0].map((arr) => arr.reverse())
        )
        setZones(data)
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false))
  }, [])
  useEffect(() => {
    if (!zonesDisplay) setSelected(null)
  }, [zonesDisplay])

  if (loading) {
    return <CircularProgress color="primary" />
  }

  return (
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
      {!zonesDisplay
        ? null
        : zones.map((e, i) => (
            <Polygon
              key={i}
              index={i}
              pathOptions={{
                color: i === selected ? '#0000ff8f' : '#00800078',
                fillColor: i === selected ? '#0000ff8f' : '#008000ab',
                // className:
                //   selected == null ? '' : (i === selected ? '' : 'no-display'),
              }}
              positions={e}
              selectedHook={[selected, setSelected]}
            >
              <Popup>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setSelected(i === selected ? null : i)}
                >
                  {i === selected ? `Unselect` : `Select`}
                </Button>
              </Popup>
            </Polygon>
          ))}

      {/* <Zone
        pathOptions={{ color: 'green' }}
        positions={zones}
        selectedHook={[selected, setSelected]}
      >
      </Zone> */}

      <Circle
        center={center}
        pathOptions={{ color: 'red', fillColor: 'green' }}
        radius={200}
      >
        <Tooltip>Tree</Tooltip>
      </Circle>
    </MapContainer>
  )
}
