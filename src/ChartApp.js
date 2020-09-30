import React, { useEffect, useState, useMemo } from 'react'

// Instructions: Create a histogram (bar) chart displaying the frequency of each
// number in the fetchRandomNumbers API response. The response returns an array
// of 100 integers between 1-10.
// Example chart: https://bnhansn.github.io/fw-widget-demo/?chart=true

// Example response: [2, 4, 4, 10, 1, 2, ...]
function fetchRandomNumbers() {
  return fetch(
    'https://www.random.org/integers/?num=100&min=1&max=10&col=1&base=10&format=plain'
  )
    .then((response) => response.text())
    .then((data) =>
      data
        .split('\n')
        .filter((n) => n !== '')
        .map(Number)
    )
}

function asyncCreateRandomNumbers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = () => Math.ceil(Math.random() * 10)
      const numbers = new Array(100).fill().map(randomNumber)
      resolve(numbers)
    }, 500)
  })
}

export default function ChartApp() {
  const [numbers, setNumbers] = useState({})
  const sortedEntries = useMemo(
    () => Object.entries(numbers).sort((a, b) => b[1] - a[1]),
    [numbers]
  )
  const maxValue = sortedEntries[0] && sortedEntries[0][1]

  useEffect(() => {
    asyncCreateRandomNumbers().then((data) => {
      const dataSet = data.reduce((acc, number) => {
        acc[number] = (acc[number] || 0) + 1
        return acc
      }, {})
      setNumbers(dataSet)
    })
  }, [])

  return (
    <div style={{ margin: 20 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          columnGap: 5,
          width: 500,
          height: 500,
          borderLeft: '1px solid black',
          borderBottom: '1px solid black'
        }}
      >
        {Object.entries(numbers).map(([k, v]) => {
          return (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                alignSelf: 'flex-end',
                height: `${(v / maxValue) * 100}%`,
                background: 'palevioletred'
              }}
            >
              {v}
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          width: 500,
          columnGap: 5,
          textAlign: 'center'
        }}
      >
        {Object.entries(numbers).map(([k, v]) => {
          return <div key={k}>{k}</div>
        })}
      </div>
    </div>
  )
}
