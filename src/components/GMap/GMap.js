import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import GControl from './subcomponents/GControl'
import GHeat from './subcomponents/GHeat'
import { getTrees } from './utils/utils'

const villes = [
  {
    city: `paris`,
    center: [48.85871234399918, 2.343226476017022],
    perimetre: [
      [48.90654329979615, 2.2228371180783846],
      [48.91237534592436, 2.482768686355441],
      [48.799797999768685, 2.4976653493326006],
      [48.80243874446095, 2.1976039950758786],
    ],
    zoom: 12,
  },
]

export default function GMap() {
  const [control, setControl] = useState({
    heatHidden: false,
    radius: 1,
    blur: 2,
    max: 0.1,
  })

  const sample = villes[0]
  const [trees, setTrees] = useState(null)
  const [loading, setLoading] = useState({
    trees: true,
    temperature: true,
  })

  useEffect(() => {
    fetchData(sample.perimetre)
  }, [])

  function fetchData(perimetre) {
    setLoading({ trees: true, temperature: true })
    getTrees(perimetre)
      .then((res) => {
        const trees = res.data.elements
          // .slice(0, 100000)
          .map(({ lat, lon }) => ({ lat, lon }))
        setTrees(trees)
      })
      .catch((err) => {
        console.log(`getTrees`)
        console.log(err)
      })
      .finally(() => setLoading({ ...loading, trees: false }))
  }

  const empty = trees == null

  return (
    <div style={{ height: 500, width: `100vw` }}>
      <GControl controlHook={[control, setControl]} />
      <LeafletMap
        center={sample.center}
        zoom={sample.zoom}
        // ondragend={(e) => {
        //   console.log(e)
        // }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <GHeat points={trees} control={control} />
      </LeafletMap>
    </div>
  )
}
