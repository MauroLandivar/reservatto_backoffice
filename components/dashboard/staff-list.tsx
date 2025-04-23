import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Employee {
  id: string
  name: string
  avatar: string
  role: string
}

interface StaffListProps {
  employees: Employee[]
  className?: string
}

export default function StaffList({ employees, className }: StaffListProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Equipo</CardTitle>
        <CardDescription>Listado de empleados activos</CardDescription>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Users className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium">No hay empleados registrados</h3>
            <p className="text-sm text-gray-500 mt-2">Agrega empleados para mostrarlos aquí</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={employee.avatar || "/placeholder.svg"}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{employee.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{employee.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
