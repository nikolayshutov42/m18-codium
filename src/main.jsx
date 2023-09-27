import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewBuild from './pages/view-build'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} index element={<App />} />
              <Route path={'/view'} element={<ViewBuild />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
