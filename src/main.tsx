import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Calculator from './Calculator.tsx'

ReactDOM.createRoot(document.getElementById('Calculator')!).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
)
