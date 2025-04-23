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
import { Switch } from "@/components/ui/switch"
import { TimeInput } from "@/components/ui/time-input"

export interface EmployeeSchedule {
  monday: { open: string; close: string; active: boolean }
  tuesday: { open: string; close: string; active: boolean }
  wednesday: { open: string; close: string; active: boolean }
  thursday: { open: string; close: string; active: boolean }
  friday: { open: string; close: string; active: boolean }
  saturday: { open: string; close: string; active: boolean }
  sunday: { open: string; close: string; active: boolean }
}

interface ScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeName: string
  schedule: EmployeeSchedule
  onSave: (schedule: EmployeeSchedule) => void
}

export function ScheduleDialog({ open, onOpenChange, employeeName, schedule, onSave }: ScheduleDialogProps) {
  const [scheduleData, setScheduleData] = useState<EmployeeSchedule>(schedule)

  const days = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ]

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(scheduleData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Horario de {employeeName}</DialogTitle>
            <DialogDescription>Configura los días y horas de trabajo del empleado</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {days.map((day) => (
                <div key={day.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={scheduleData[day.id as keyof typeof scheduleData].active}
                      onCheckedChange={(checked) => handleHoursChange(day.id, "active", checked)}
                    />
                    <span className="font-medium">{day.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TimeInput
                      value={scheduleData[day.id as keyof typeof scheduleData].open}
                      onChange={(value) => handleHoursChange(day.id, "open", value)}
                      disabled={!scheduleData[day.id as keyof typeof scheduleData].active}
                    />
                    <span>a</span>
                    <TimeInput
                      value={scheduleData[day.id as keyof typeof scheduleData].close}
                      onChange={(value) => handleHoursChange(day.id, "close", value)}
                      disabled={!scheduleData[day.id as keyof typeof scheduleData].active}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar horario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
