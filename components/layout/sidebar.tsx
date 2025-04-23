"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Users, Scissors, Settings, Menu, X, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const isActive = (path: string) => pathname.startsWith(path)

  const menuItems = [
    { path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { path: "/calendario", icon: <Calendar className="w-5 h-5" />, label: "Calendario" },
    { path: "/empleados", icon: <Users className="w-5 h-5" />, label: "Empleados" },
    { path: "/servicios", icon: <Scissors className="w-5 h-5" />, label: "Servicios" },
    { path: "/configuraciones", icon: <Settings className="w-5 h-5" />, label: "Configuraciones" },
    { path: "/onboarding", icon: <Home className="w-5 h-5" />, label: "Onboarding" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: collapsed ? 80 : 240 }}
        animate={{ width: collapsed ? 80 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "bg-gradient-to-b from-violet-50 to-white h-screen fixed left-0 top-0 z-30 border-r border-slate-100",
          collapsed ? "w-20" : "w-60",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 h-16">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Reservatto
                </span>
              </motion.div>
            )}
            {collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-auto"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
              </motion.div>
            )}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
              >
                {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center rounded-lg py-2.5 px-3 text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4">
            <div
              className={cn(
                "rounded-xl p-3 bg-gradient-to-r from-violet-100 to-indigo-100",
                collapsed ? "items-center justify-center" : "",
              )}
            >
              {!collapsed ? (
                <div className="text-center">
                  <p className="text-xs font-medium text-indigo-800 mb-2">¿Necesitas ayuda?</p>
                  <Link
                    href="/ayuda"
                    className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg py-1.5 px-3 inline-block"
                  >
                    Centro de ayuda
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Link
                    href="/ayuda"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    title="Centro de ayuda"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
