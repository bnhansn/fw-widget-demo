import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import WidgetApp from './WidgetApp'
import ChartApp from './ChartApp'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<WidgetApp />} />
        <Route path="/chart" element={<ChartApp />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
