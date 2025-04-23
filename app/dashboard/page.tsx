"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  DollarSign,
  CalendarCheck,
  ChevronRight,
  Search,
  MapPin,
  Plus,
  Users,
  Scissors,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import CalendarView from "@/components/calendar/calendar-view"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      clientName: "Ana Martínez",
      service: "Corte de cabello",
      time: "10:00",
      duration: 50,
      professional: "Mauro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      clientName: "Pablo Sánchez",
      service: "Planchado",
      time: "11:30",
      duration: 30,
      professional: "Tamara",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      clientName: "Lucía Fernández",
      service: "Vitaminas para el pelo",
      time: "14:00",
      duration: 35,
      professional: "Coco",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [stats, setStats] = useState([
    {
      title: "Reservas de Hoy",
      value: "8",
      icon: <Clock className="h-5 w-5 text-violet-500" />,
      color: "bg-violet-50 text-violet-700",
    },
    {
      title: "Total Reservas Semana",
      value: "42",
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Total Reservas Mes",
      value: "145",
      icon: <CalendarCheck className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Ingresos Semana",
      value: "€1,250",
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Ingresos Mes",
      value: "€4,850",
      icon: <DollarSign className="h-5 w-5 text-teal-500" />,
      color: "bg-teal-50 text-teal-700",
    },
  ])

  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "Mauro",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Especialista en cabello",
      appointments: 5,
    },
    {
      id: "2",
      name: "Tamara",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Recepción",
      appointments: 3,
    },
    {
      id: "3",
      name: "Martin",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Peluquería y maquillaje",
      appointments: 4,
    },
    {
      id: "4",
      name: "Coco",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Asistente",
      appointments: 2,
    },
  ])

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Hero Section */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white p-8"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Bienvenido a Reservatto</h1>
          <p className="text-violet-100 mb-6">
            Gestiona tus citas, empleados y servicios de forma sencilla y profesional.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 flex items-center max-w-2xl">
            <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-violet-200" />
              <input
                type="text"
                placeholder="Buscar citas, clientes o servicios..."
                className="bg-transparent border-none outline-none text-white placeholder-violet-200 w-full text-sm"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 text-violet-200" />
              <select className="bg-transparent border-none outline-none text-white text-sm appearance-none pr-6">
                <option value="all">Todos los empleados</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="ml-1 bg-white text-indigo-600 hover:bg-white/90">Buscar</Button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Calendar and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Calendario de Hoy</h2>
            <Link href="/calendario">
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 gap-1">
                Ver calendario completo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[400px]">
                <CalendarView employees={employees.map((e) => ({ id: e.id, name: e.name }))} compact={true} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Próximas Citas</h2>
            <Button
              variant="outline"
              size="sm"
              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nueva cita
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.clientName} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {appointment.clientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{appointment.clientName}</p>
                        <p className="text-sm text-slate-500 truncate">{appointment.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">{appointment.time}</p>
                        <p className="text-sm text-slate-500">{appointment.duration} min</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <Link href="/calendario" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    Ver todas las citas
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Equipo</h2>
          <Link href="/empleados">
            <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 gap-1">
              Ver todos los empleados
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="border-none shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-md mb-3">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-xl">
                      {employee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-slate-900">{employee.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{employee.role}</p>
                  <div className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-xs font-medium">
                    {employee.appointments} citas hoy
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Acciones Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm hover:shadow transition-shadow bg-gradient-to-br from-violet-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Nueva Cita</h3>
                <p className="text-sm text-slate-500 mb-4">Agenda una nueva cita para tus clientes</p>
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Agendar Cita
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm hover:shadow transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Nuevo Empleado</h3>
                <p className="text-sm text-slate-500 mb-4">Añade un nuevo miembro a tu equipo</p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Añadir Empleado
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm hover:shadow transition-shadow bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-4">
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Nuevo Servicio</h3>
                <p className="text-sm text-slate-500 mb-4">Crea un nuevo servicio para tus clientes</p>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Crear Servicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
