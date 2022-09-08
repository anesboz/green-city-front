import React from 'react'

export default function GControl({ controlHook }) {
  const [control, setControl] = controlHook

  const { heatHidden, radius, blur, max } = control

  

  return (
    <div>
      <div>
        Radius
        <input
          type="range"
          min={1}
          max={40}
          value={radius}
          onChange={(e) => setControl({ ...control, radius: e.target.value })}
        />
        {radius}
      </div>
      <div>
        Blur
        <input
          type="range"
          min={1}
          max={20}
          value={blur}
          onChange={(e) => setControl({ ...control, blur: e.target.value })}
        />
        {blur}
      </div>
      <div>
        Max
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.1}
          value={max}
          onChange={(e) => setControl({ ...control, max: e.target.value })}
        />
        {max}
      </div>
    </div>
  )
}
