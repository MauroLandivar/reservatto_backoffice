import { CalendarDays, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Appointment {
  id: string
  clientName: string
  service: string
  date: string
  time: string
  professional: string
  duration: number
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
  className?: string
}

export default function UpcomingAppointments({ appointments, className }: UpcomingAppointmentsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Próximas Reservas</CardTitle>
        <CardDescription>Reservas agendadas para los próximos días</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CalendarDays className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium">No hay reservas próximas</h3>
            <p className="text-sm text-gray-500 mt-2">Las nuevas reservas aparecerán aquí</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="max-w-[70%]">
                    <h3 className="font-medium text-base truncate">{appointment.clientName}</h3>
                    <p className="text-sm text-gray-500 truncate">{appointment.service}</p>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap">
                    <Clock className="mr-1 h-4 w-4 flex-shrink-0" />
                    {appointment.duration} min
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                    <CalendarDays className="mr-1 h-4 w-4 flex-shrink-0" />
                    {appointment.date} - {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                    <User className="mr-1 h-4 w-4 flex-shrink-0" />
                    {appointment.professional}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
