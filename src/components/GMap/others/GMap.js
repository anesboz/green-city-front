import { Button, CircularProgress, Grid } from '@mui/material'
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
import { getTemparature, getTrees, zoneToSquare } from './utils/utils'

export default function GMap(props) {
  // const [zoneDisplay, setZoneDisplay] = props.displayZonesHook
  const center = [48.852174427333274, 2.299322310264648] // default par Paris
  const [loading, setloading] = useState(true)
  const [zones, setZones] = useState([])
  const [selected, setSelected] = useState(0)

  const { zonesDisplayHook } = useContext(GContext)
  const [zonesDisplay, setZonesDisplay] = zonesDisplayHook

  const [trees, setTrees] = useState([])

  const [temperature, setTemperature] = useState(null)

  const arbre = {
    type: 'node',
    id: 9795096298,
    lat: 48.8682972,
    lon: 2.3631874,
    tags: {
      circumference: '0.5',
      denotation: 'natural_monument',
      description:
        'Arbre du souvenir planté en mémoire des attentats de Paris en 2015.',
      height: '7',
      name: 'Arbre du souvenir',
      natural: 'tree',
      'ref:opendataparis:id': '2017817.0',
      start_date: '2017-11-09',
      taxon: 'Quercus cerris',
      'taxon:fr': 'Chêne',
    },
  }

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

  useEffect(() => {
    if (selected == null) return
    const arr = zoneToSquare(zones[selected])
    getTrees(arr)
      .then((res) => {
        const trees = res.data.elements
        setTrees(trees)
      })
      .catch((err) => {
        console.log(err)
      })

    const sample = zones[selected]?.[0]
    if (sample == null) return
    getTemparature(sample)
      .then((res) => {
        const temperatures = res.data
        const { temp } = temperatures.main
        const result = {
          ...temperatures.coord,
          temp: Math.round((temp - 273.15) * 100) / 100,
        }
        setTemperature(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [zones, selected])

  if (loading) {
    return <CircularProgress color="primary" />
  }

  return (
    <Grid container>
      <h2>Il y a {trees.length} arbres dans la zone sélectionnée</h2>
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
                  <br />
                  {i !== selected
                    ? null
                    : `temperature: ${temperature?.temp} °C`}
                </Popup>
                {/* <Tooltip>{`temperature: ${temperature[i]?.temp} °C`}</Tooltip> */}
              </Polygon>
            ))}

        {trees.map(({ lat, lon }, i) => {
          // const {}
          return (
            <Circle
              key={i}
              center={[lat, lon]}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={1}
            ></Circle>
          )
        })}

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
    </Grid>
  )
}
