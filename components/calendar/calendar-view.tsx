"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  PlusCircle,
  User,
  Clock,
  Calendar,
  X,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface CalendarViewProps {
  employees: { id: string; name: string }[]
  compact?: boolean
}

export default function CalendarView({ employees, compact = false }: CalendarViewProps) {
  const [view, setView] = useState("day")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState("all")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Array of hours from 9:00 to 20:00
  const hours = Array.from({ length: compact ? 6 : 12 }, (_, i) => i + 9)

  // Example appointments
  const appointments = [
    {
      id: "1",
      employeeId: "1",
      clientName: "María García",
      service: "Corte de cabello",
      time: "10:00",
      duration: 60,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      employeeId: "2",
      clientName: "Carlos Pérez",
      service: "Planchado",
      time: "11:30",
      duration: 45,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      employeeId: "3",
      clientName: "Laura Sánchez",
      service: "Manicure",
      time: "13:00",
      duration: 40,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredAppointments =
    selectedEmployee === "all" ? appointments : appointments.filter((app) => app.employeeId === selectedEmployee)

  return (
    <div className={`h-full ${!compact ? "card" : ""}`}>
      {!compact && (
        <div className="flex items-center justify-between space-y-0 pb-2 p-6">
          <h2 className="text-xl font-bold">Calendario</h2>
          <div className="flex items-center space-x-2">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[100px] bg-white border-slate-200">
                <SelectValue placeholder="Vista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Día</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-[150px] bg-white border-slate-200">
                <SelectValue placeholder="Empleado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="border-slate-200">
              <Filter className="h-4 w-4" />
            </Button>

            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </div>
        </div>
      )}

      <div className={compact ? "p-0" : "p-6 pt-0"}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-200"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() - 1)
                setSelectedDate(newDate)
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className={`font-medium capitalize ${compact ? "text-sm truncate max-w-[150px]" : "text-lg"}`}>
              {formatDate(selectedDate)}
            </h3>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-200"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() + 1)
                setSelectedDate(newDate)
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => setSelectedDate(new Date())}
            className="text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          >
            Hoy
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <div className={`grid grid-cols-[60px_1fr] ${compact ? "h-[350px]" : "h-[600px]"} overflow-auto`}>
            {/* Hours column */}
            <div className="bg-slate-50 border-r">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`${compact ? "h-14" : "h-20"} border-b py-1 px-2 text-right text-xs text-slate-500`}
                >
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Appointments column */}
            <div className="relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`${compact ? "h-14" : "h-20"} border-b border-dashed border-slate-200`}
                ></div>
              ))}

              {/* Appointments */}
              {filteredAppointments.map((appointment) => {
                const [hours, minutes] = appointment.time.split(":").map(Number)
                const top = (hours - 9) * (compact ? 56 : 80) + (minutes / 60) * (compact ? 56 : 80)
                const height = (appointment.duration / 60) * (compact ? 56 : 80)

                return (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-2 right-2 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-md p-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border border-white">
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.clientName} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                            {appointment.clientName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-xs text-slate-900 truncate">{appointment.clientName}</h4>
                          {!compact && <p className="text-xs text-slate-500 truncate">{appointment.service}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-indigo-600">{appointment.time}</span>
                        {!compact && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <span className="sr-only">Opciones</span>
                                <MoreHorizontal className="h-3 w-3 text-slate-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem className="cursor-pointer">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Reagendar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-red-600">
                                <X className="mr-2 h-4 w-4" />
                                <span>Cancelar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                    {!compact && (
                      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{employees.find((e) => e.id === appointment.employeeId)?.name}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
