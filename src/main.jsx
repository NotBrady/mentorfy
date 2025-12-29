import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import RafaelAI from './pages/rafael-ai/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rafael-ai" replace />} />
        <Route path="/rafael-ai" element={<RafaelAI />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
