"use client"

import { useState } from "react"
import { PlusCircle, Search, MoreHorizontal, Pencil, Trash2, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmployeeDialog, type EmployeeFormData } from "@/components/employees/employee-dialog"
import { type EmployeeSchedule, ScheduleDialog } from "@/components/employees/schedule-dialog"

interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  email: string
  phone: string
  services: string[]
  active: boolean
  schedule: EmployeeSchedule
}

const defaultSchedule: EmployeeSchedule = {
  monday: { open: "08:00", close: "17:00", active: true },
  tuesday: { open: "08:00", close: "17:00", active: true },
  wednesday: { open: "08:00", close: "17:00", active: true },
  thursday: { open: "08:00", close: "17:00", active: true },
  friday: { open: "08:00", close: "17:00", active: true },
  saturday: { open: "09:00", close: "14:00", active: true },
  sunday: { open: "09:00", close: "14:00", active: false },
}

export default function EmployeesPage() {
  // Example employees data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Mauro",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "peluquero",
      email: "mauro@boutique.com",
      phone: "+34 123 456 789",
      services: ["corte", "planchado", "peinado"],
      active: true,
      schedule: {
        ...defaultSchedule,
        sunday: { ...defaultSchedule.sunday, active: false },
      },
    },
    {
      id: "2",
      name: "Tamara",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "recepcion",
      email: "tamara@boutique.com",
      phone: "+34 123 456 790",
      services: [],
      active: true,
      schedule: defaultSchedule,
    },
    {
      id: "3",
      name: "Martin",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "peluquero",
      email: "martin@boutique.com",
      phone: "+34 123 456 791",
      services: ["maquillaje", "peinado", "corte"],
      active: true,
      schedule: {
        ...defaultSchedule,
        saturday: { ...defaultSchedule.saturday, active: false },
        sunday: { ...defaultSchedule.sunday, active: false },
      },
    },
    {
      id: "4",
      name: "Coco",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "asistente",
      email: "coco@boutique.com",
      phone: "+34 123 456 792",
      services: [],
      active: true,
      schedule: defaultSchedule,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false)
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setEmployeeDialogOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setEmployeeDialogOpen(true)
  }

  const handleSaveEmployee = (data: EmployeeFormData) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingEmployee.id ? ({ ...data, id: employee.id } as Employee) : employee,
        ),
      )
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...data,
        id: Date.now().toString(),
      }
      setEmployees((prev) => [...prev, newEmployee])
    }
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id))
  }

  const handleEditSchedule = (employee: Employee) => {
    setSelectedEmployee(employee)
    setScheduleDialogOpen(true)
  }

  const handleSaveSchedule = (schedule: EmployeeSchedule) => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((employee) => (employee.id === selectedEmployee.id ? { ...employee, schedule } : employee)),
      )
    }
  }

  const getRoleName = (roleId: string) => {
    const roles: Record<string, string> = {
      peluquero: "Peluquero/a",
      esteticista: "Esteticista",
      recepcion: "Recepción",
      asistente: "Asistente",
      gerente: "Gerente",
    }
    return roles[roleId] || roleId
  }

  const getServiceName = (serviceId: string) => {
    const services: Record<string, string> = {
      corte: "Corte de cabello",
      peinado: "Peinado",
      planchado: "Planchado",
      tinte: "Tinte",
      manicura: "Manicura",
      pedicura: "Pedicura",
      maquillaje: "Maquillaje",
      tratamiento: "Tratamiento facial",
    }
    return services[serviceId] || serviceId
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
          <p className="text-muted-foreground">Gestiona tu equipo y sus servicios</p>
        </div>
        <Button onClick={handleAddEmployee}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Empleado
        </Button>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empleados..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Empleados de La boutique de Sevilla</CardTitle>
          <CardDescription>Un total de {employees.length} empleados actualmente registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="h-12 px-4 text-left font-medium">Empleado</th>
                  <th className="h-12 px-4 text-left font-medium">Rol</th>
                  <th className="h-12 px-4 text-left font-medium">Contacto</th>
                  <th className="h-12 px-4 text-left font-medium">Servicios</th>
                  <th className="h-12 px-4 text-left font-medium">Horario</th>
                  <th className="h-12 px-4 text-left font-medium">Estado</th>
                  <th className="h-12 px-4 text-left font-medium w-[70px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar || "/placeholder.svg"}
                          className="h-10 w-10 rounded-full object-cover"
                          alt={employee.name}
                        />
                        <div className="font-medium">{employee.name}</div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{getRoleName(employee.role)}</td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{employee.email}</div>
                      <div className="text-muted-foreground">{employee.phone}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {employee.services.length > 0 ? (
                          employee.services.map((service, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                            >
                              {getServiceName(service)}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-xs">No ofrece servicios</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-indigo-600"
                        onClick={() => handleEditSchedule(employee)}
                      >
                        <Calendar className="mr-1 h-4 w-4" />
                        Ver horario
                      </Button>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          employee.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {employee.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditSchedule(employee)}>
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Horario</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEmployee(employee.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmployeeDialog
        open={employeeDialogOpen}
        onOpenChange={setEmployeeDialogOpen}
        initialData={editingEmployee || undefined}
        onSave={handleSaveEmployee}
        title={editingEmployee ? "Editar empleado" : "Añadir empleado"}
        description={editingEmployee ? "Edita los detalles del empleado" : "Añade un nuevo empleado a tu equipo"}
      />

      {selectedEmployee && (
        <ScheduleDialog
          open={scheduleDialogOpen}
          onOpenChange={setScheduleDialogOpen}
          employeeName={selectedEmployee.name}
          schedule={selectedEmployee.schedule}
          onSave={handleSaveSchedule}
        />
      )}
    </div>
  )
}
