"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, MoreHorizontal, Pencil, Trash2, Clock, Tag, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ServiceDialog, type ServiceFormData, type ServiceVariation } from "@/components/services/service-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const router = useRouter()

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
  const [variationFilter, setVariationFilter] = useState<string>("all")
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  const filteredServices = services.filter((service) => {
    // Filtro por texto de búsqueda
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por tipo de servicio (con/sin variaciones)
    const matchesVariationFilter =
      variationFilter === "all" ||
      (variationFilter === "variable" && service.hasVariations) ||
      (variationFilter === "simple" && !service.hasVariations)

    return matchesSearch && matchesVariationFilter
  })

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

  const handleDeleteClick = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (!service) return

    setServiceToDelete(serviceId)
    setConfirmDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!serviceToDelete) return

    setServices((prev) => prev.filter((service) => service.id !== serviceToDelete))
    setConfirmDialogOpen(false)
    setServiceToDelete(null)
  }

  const handleViewVariations = (serviceId: string) => {
    router.push(`/servicios/${serviceId}`)
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

  const getDeleteConfirmationMessage = () => {
    if (!serviceToDelete) return ""

    const service = services.find((s) => s.id === serviceToDelete)
    if (!service) return ""

    if (service.hasVariations && service.variations.length > 0) {
      return `¿Estás seguro de que deseas eliminar el servicio "${service.name}"? Esta acción también eliminará ${service.variations.length} variaciones asociadas a este servicio. Esta acción no se puede deshacer.`
    }

    return `¿Estás seguro de que deseas eliminar el servicio "${service.name}"? Esta acción no se puede deshacer.`
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={variationFilter} onValueChange={setVariationFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo de servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los servicios</SelectItem>
              <SelectItem value="variable">Servicios variables</SelectItem>
              <SelectItem value="simple">Servicios simples</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Servicios de La boutique de Sevilla</CardTitle>
          <CardDescription>
            Un total de {services.length} servicios actualmente disponibles
            {variationFilter !== "all" && (
              <>
                , mostrando {filteredServices.length} {variationFilter === "variable" ? "variables" : "simples"}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="h-12 px-4 text-left font-medium">Nombre</th>
                  <th className="h-12 px-4 text-left font-medium">Categoría</th>
                  <th className="h-12 px-4 text-left font-medium">Tipo</th>
                  <th className="h-12 px-4 text-left font-medium">Duración</th>
                  <th className="h-12 px-4 text-left font-medium">Precio</th>
                  <th className="h-12 px-4 text-left font-medium">Estado</th>
                  <th className="h-12 px-4 text-left font-medium w-[100px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No se encontraron servicios con los filtros actuales.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="p-4 align-middle font-medium">{service.name}</td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {getCategoryName(service.category)}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        {service.hasVariations ? (
                          <Badge variant="secondary" className="bg-violet-100 text-violet-800 hover:bg-violet-100">
                            <Tag className="mr-1 h-3 w-3" />
                            Variable
                          </Badge>
                        ) : (
                          <Badge variant="outline">Simple</Badge>
                        )}
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
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {service.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          {service.hasVariations && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-violet-600"
                              onClick={() => handleViewVariations(service.id)}
                            >
                              <span className="mr-1">Ver</span>
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          )}
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
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(service.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Eliminar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Eliminar servicio"
        description={getDeleteConfirmationMessage()}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
