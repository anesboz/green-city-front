import axios from 'axios'

export function getTrees(clockWiseCoord) {
  const [north, east, south, west] = zoneToSquare(clockWiseCoord)
  const str = `[out:json][timeout:100];(node["natural"="tree"](${south},${west},${north},${east}););out body;>;out skel qt;`
  const url = encodeURIComponent(str)
    .replaceAll('(', '%28')
    .replaceAll(')', '%29')
  return axios.get(`https://overpass-api.de/api/interpreter?data=${url}`)
}

export function getTemparature(point) {
  if (point == null) return Promise.reject()
  const [lat, lon] = point
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9b86ab1abc199eb71a493c270b55a52e&lang=fr`
  )
}

const DEFAULT_AROUND = 10

export function getTreesAround(center, around = DEFAULT_AROUND) {
  const [lat, log] = center
  const str = `[out:json][timeout:25];(node["natural"="tree"](around:${around},${lat},${log}););out body;>;out skel qt;`
  const url = encodeURIComponent(str)
    .replaceAll('(', '%28')
    .replaceAll(')', '%29')
  return axios.get(`https://overpass-api.de/api/interpreter?data=${url}`)
}

export function zoneToSquare(arrayOfPoints) {
  if (arrayOfPoints == null) return []
  const xs = []
  const ys = []

  arrayOfPoints.map(([x, y]) => {
    xs.push(x)
    ys.push(y)
  })

  return [Math.max(...xs), Math.max(...ys), Math.min(...xs), Math.min(...ys)]
}

export function zoneCenter(arrayOfPoints) {
  if (arrayOfPoints == null) return []
  const xs = []
  const ys = []

  arrayOfPoints.map(([x, y]) => {
    xs.push(x)
    ys.push(y)
  })

  return [
    (Math.max(...xs) + Math.min(...xs)) / 2,
    (Math.max(...ys) + Math.min(...ys)) / 2,
  ]
}
