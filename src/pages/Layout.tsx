import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import EnrollmentModal from "../components/EnrollmentModal"
import { useModal } from "../context/ModalContext"
import "./Layout.css"

const Layout: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <div className="layout-container">
      <Header />
      <main className="main-content-area">
        <Outlet />
      </main>
      <Footer />
      <EnrollmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Layout
