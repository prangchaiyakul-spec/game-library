import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import GameDetail from './GameDetail.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* หน้าแรก */}
        <Route path="/game/:id" element={<GameDetail />} /> {/* หน้าละเอียด */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)