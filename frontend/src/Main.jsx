import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import './assets/styles/main.scss'

export default function Main() {
  return (
    <div>
        <header>
            <Navbar className="navbar" />
        </header>
        <div className="main">
            <Outlet />
        </div>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}