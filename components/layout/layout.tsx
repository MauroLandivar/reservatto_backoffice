"use client"

import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import { motion } from "framer-motion"

export default function Layout({ children, businessName = "La boutique de Sevilla" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 transition-all duration-200 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"}`}
      >
        <Header businessName={businessName} sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <main className="pt-16 px-4 md:px-6 py-6 max-w-7xl mx-auto">{children}</main>
      </motion.div>
    </div>
  )
}
