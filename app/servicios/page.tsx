"use client"

import { useState } from "react"
import { PlusCircle, Search, MoreHorizontal, Pencil, Trash2, Clock, List } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ServiceDialog, type ServiceFormData, type ServiceVariation } from "@/components/services/service-dialog"
import { ServiceVariationsDialog } from "@/components/services/service-variations-dialog"

interface Service {
  id: string
  name: string
  category: string
  description: string
  hasVariations: boolean
  duration: number
  price: number
  active: boolean
  variations: ServiceVariation[]
}

export default function ServicesPage() {
  // Example services data
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Corte de cabello",
      category: "cortes",
      description: "Corte de cabello profesional",
      hasVariations: true,
      duration: 50,
      price: 35,
      active: true,
      variations: [
        { id: "1-1", name: "Corte básico", duration: 30, price: 25 },
        { id: "1-2", name: "Corte y lavado", duration: 50, price: 35 },
        { id: "1-3", name: "Corte premium", duration: 60, price: 45 },
      ],
    },
    {
      id: "2",
      name: "Planchado de cabello",
      category: "peinados",
      description: "Planchado profesional",
      hasVariations: false,
      duration: 30,
      price: 30,
      active: true,
      variations: [],
    },
    {
      id: "3",
      name: "Vitaminas para el pelo",
      category: "tratamientos",
      description: "Tratamiento con vitaminas",
      hasVariations: false,
      duration: 35,
      price: 30,
      active: true,
      variations: [],
    },
    {
      id: "4",
      name: "Manicure",
      category: "manos",
      description: "Manicura profesional",
      hasVariations: true,
      duration: 40,
      price: 25,
      active: true,
      variations: [
        { id: "4-1", name: "Manicura básica", duration: 30, price: 20 },
        { id: "4-2", name: "Manicura con diseño", duration: 50, price: 35 },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [variationsDialogOpen, setVariationsDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddService = () => {
    setEditingService(null)
    setServiceDialogOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setServiceDialogOpen(true)
  }

  const handleSaveService = (data: ServiceFormData) => {
    if (editingService) {
      // Update existing service
      setServices((prev) =>
        prev.map((service) => (service.id === editingService.id ? ({ ...data, id: service.id } as Service) : service)),
      )
    } else {
      // Add new service
      const newService: Service = {
        ...data,
        id: Date.now().toString(),
      }
      setServices((prev) => [...prev, newService])
    }
  }

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id))
  }

  const handleViewVariations = (service: Service) => {
    setSelectedService(service)
    setVariationsDialogOpen(true)
  }

  const getCategoryName = (categoryId: string) => {
    const categories: Record<string, string> = {
      cortes: "Cortes",
      peinados: "Peinados",
      tratamientos: "Tratamientos",
      manos: "Manos",
      pies: "Pies",
      maquillaje: "Maquillaje",
    }
    return categories[categoryId] || categoryId
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
          <p className="text-muted-foreground">Gestiona los servicios que ofrece tu negocio</p>
        </div>
        <Button onClick={handleAddService}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Servicio
        </Button>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Servicios de La boutique de Sevilla</CardTitle>
          <CardDescription>Un total de {services.length} servicios actualmente disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="h-12 px-4 text-left font-medium">Nombre</th>
                  <th className="h-12 px-4 text-left font-medium">Categoría</th>
                  <th className="h-12 px-4 text-left font-medium">Duración</th>
                  <th className="h-12 px-4 text-left font-medium">Precio</th>
                  <th className="h-12 px-4 text-left font-medium">Variaciones</th>
                  <th className="h-12 px-4 text-left font-medium">Estado</th>
                  <th className="h-12 px-4 text-left font-medium w-[70px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="p-4 align-middle font-medium">{service.name}</td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {getCategoryName(service.category)}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {service.hasVariations
                          ? `${Math.min(...service.variations.map((v) => v.duration))} - ${Math.max(
                              ...service.variations.map((v) => v.duration),
                            )} minutos`
                          : `${service.duration} minutos`}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {service.hasVariations
                        ? `${Math.min(...service.variations.map((v) => v.price))} - ${Math.max(
                            ...service.variations.map((v) => v.price),
                          )} Bs`
                        : `${service.price} Bs`}
                    </td>
                    <td className="p-4 align-middle">
                      {service.hasVariations ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-indigo-600"
                          onClick={() => handleViewVariations(service)}
                        >
                          <List className="mr-1 h-4 w-4" />
                          {service.variations.length}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-xs">No</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.active ? "Activo" : "Inactivo"}
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
                          <DropdownMenuItem onClick={() => handleEditService(service)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteService(service.id)}>
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

      <ServiceDialog
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        initialData={editingService || undefined}
        onSave={handleSaveService}
        title={editingService ? "Editar servicio" : "Añadir servicio"}
        description={
          editingService
            ? "Edita los detalles del servicio o añade variaciones"
            : "Añade un nuevo servicio a tu catálogo"
        }
      />

      {selectedService && (
        <ServiceVariationsDialog
          open={variationsDialogOpen}
          onOpenChange={setVariationsDialogOpen}
          serviceName={selectedService.name}
          variations={selectedService.variations}
        />
      )}
    </div>
  )
}
