import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Popup, Rectangle, Tooltip } from 'react-leaflet'
import { getTemparature, getTrees, zoneToSquare } from '../utils/utils'

export default function Zone(props) {
  const { bounds } = props
  const [trees, setTrees] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [loading, setLoading] = useState({
    trees: true,
    temperature: true,
  })

  useEffect(() => {
    setTrees(null)
    setTemperature(null)
  }, [bounds])

  function fetchData() {
    setLoading({ trees: true, temperature: true })
    const arr = [bounds[0][0], bounds[1][1], bounds[1][0], bounds[0][1]]
    getTrees(arr)
      .then((res) => {
        const trees = res.data.elements
        setTrees(trees)
      })
      .catch((err) => {
        console.log(`getTrees`)
        console.log(err)
      })
      .finally(() => setLoading({ ...loading, trees: false }))

    const cen = bounds[0]
    getTemparature(cen)
      .then((res) => {
        const temperatures = res.data
        const { temp } = temperatures.main
        const result = {
          ...temperatures.coord,
          temp: Math.round((temp - 273) * 100) / 100,
        }
        setTemperature(result)
      })
      .catch((err) => {
        console.log(`getTemparature`)
        console.log(err)
      })
      .finally(() => setLoading({ ...loading, temperature: false }))
  }

  const empty = trees == null || temperature == null
  return (
    <Rectangle
      bounds={bounds}
      pathOptions={{
        color: '#8080803d',
        // color: 'black',
        // color: i === selected ? '#0000ff8f' : '#00800078',
        fillColor: empty ? 'transparent' : '#008000ab',
      }}
    >
      <Popup>
        <div>
          <Button variant="contained" onClick={() => fetchData()}>
            Get Data
          </Button>
          <br />
          <br />
          {empty ? null : (
            <div>
              {`🌳 Trees: `}
              {loading.trees ? 'calculating ...' : <b>{trees?.length}</b>}
              <br />
              {`🌡️ Temperature: `}
              <b>{temperature?.temp}</b>
            </div>
          )}
        </div>
      </Popup>
      {/* {empty ? null : (
        <Tooltip>
          {`trees: ${loading.trees ? 'calculating ...' : trees?.length}`}
          <br />
          {`temperature: ${temperature?.temp}`}
        </Tooltip>
      )} */}
    </Rectangle>
  )
}

function getABCD(centerArr, dLat, dLng) {
  const [lat, lon] = centerArr
  return [
    [lat + dLat, lon - dLng],
    [lat + dLat, lon + dLng],
    [lat - dLat, lon - dLng],
    [lat - dLat, lon + dLng],
    centerArr,
  ]
}
