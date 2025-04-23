import CalendarView from "@/components/calendar/calendar-view"

export default function CalendarPage() {
  // Example employees
  const employees = [
    { id: "1", name: "Mauro" },
    { id: "2", name: "Tamara" },
    { id: "3", name: "Martin" },
    { id: "4", name: "Coco" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground">Gestiona tus citas y la agenda de tu negocio</p>
      </div>

      <CalendarView employees={employees} />
    </div>
  )
}
