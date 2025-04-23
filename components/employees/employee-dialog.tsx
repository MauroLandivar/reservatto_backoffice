"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { EmployeeSchedule } from "./schedule-dialog"

export interface EmployeeFormData {
  id?: string
  name: string
  avatar: string
  role: string
  email: string
  phone: string
  services: string[]
  active: boolean
  schedule: EmployeeSchedule
}

interface EmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: EmployeeFormData
  onSave: (data: EmployeeFormData) => void
  title: string
  description: string
}

const roles = [
  { id: "peluquero", name: "Peluquero/a" },
  { id: "esteticista", name: "Esteticista" },
  { id: "recepcion", name: "Recepción" },
  { id: "asistente", name: "Asistente" },
  { id: "gerente", name: "Gerente" },
]

const availableServices = [
  { id: "corte", name: "Corte de cabello" },
  { id: "peinado", name: "Peinado" },
  { id: "planchado", name: "Planchado" },
  { id: "tinte", name: "Tinte" },
  { id: "manicura", name: "Manicura" },
  { id: "pedicura", name: "Pedicura" },
  { id: "maquillaje", name: "Maquillaje" },
  { id: "tratamiento", name: "Tratamiento facial" },
]

const defaultSchedule: EmployeeSchedule = {
  monday: { open: "08:00", close: "17:00", active: true },
  tuesday: { open: "08:00", close: "17:00", active: true },
  wednesday: { open: "08:00", close: "17:00", active: true },
  thursday: { open: "08:00", close: "17:00", active: true },
  friday: { open: "08:00", close: "17:00", active: true },
  saturday: { open: "09:00", close: "14:00", active: true },
  sunday: { open: "09:00", close: "14:00", active: false },
}

export function EmployeeDialog({ open, onOpenChange, initialData, onSave, title, description }: EmployeeDialogProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(
    initialData || {
      name: "",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "",
      email: "",
      phone: "",
      services: [],
      active: true,
      schedule: defaultSchedule,
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServicesChange = (serviceId: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId]
      return { ...prev, services }
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange(value, "role")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Servicios que ofrece</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`service-${service.id}`}
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServicesChange(service.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label htmlFor={`service-${service.id}`} className="text-sm font-normal">
                      {service.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={formData.active} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="active">Empleado activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
