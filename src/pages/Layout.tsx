import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Layout.css"

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
