import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import WidgetApp from './WidgetApp'
import ChartApp from './ChartApp'

const showChartApp = window.location.search.match('chart')

ReactDOM.render(
  <React.StrictMode>
    {showChartApp ? <ChartApp /> : <WidgetApp />}
  </React.StrictMode>,
  document.getElementById('root')
)
