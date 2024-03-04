import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

{/**
 //* Basename is for the url on the server
 //* @author Ryan Field
*/}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/coursework/react">
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
