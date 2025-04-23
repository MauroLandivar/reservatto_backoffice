"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, PlusCircle, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ServiceVariation } from "@/components/services/service-dialog"
import { VariationDialog } from "@/components/services/variation-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

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

// Esta función simula la obtención de datos del servicio
// En una implementación real, esto vendría de una API o base de datos
const getServiceById = (id: string): Promise<Service | null> => {
  return new Promise((resolve) => {
    // Simulamos datos de ejemplo
    const services: Service[] = [
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
    ]

    const service = services.find((s) => s.id === id) || null
    setTimeout(() => resolve(service), 100) // Simulamos un pequeño retraso
  })
}

export default function ServiceVariationsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [variationDialogOpen, setVariationDialogOpen] = useState(false)
  const [editingVariation, setEditingVariation] = useState<ServiceVariation | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [variationToDelete, setVariationToDelete] = useState<string | null>(null)

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true)
      try {
        const data = await getServiceById(params.id)
        setService(data)
      } catch (error) {
        console.error("Error fetching service:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [params.id])

  const handleAddVariation = () => {
    setEditingVariation(null)
    setVariationDialogOpen(true)
  }

  const handleEditVariation = (variation: ServiceVariation) => {
    setEditingVariation(variation)
    setVariationDialogOpen(true)
  }

  const handleSaveVariation = (variation: ServiceVariation) => {
    if (!service) return

    if (editingVariation) {
      // Actualizar variación existente
      const updatedVariations = service.variations.map((v) => (v.id === editingVariation.id ? variation : v))
      setService({ ...service, variations: updatedVariations })
    } else {
      // Añadir nueva variación
      const newVariation = {
        ...variation,
        id: Date.now().toString(),
      }
      setService({ ...service, variations: [...service.variations, newVariation] })
    }
  }

  const handleDeleteClick = (variationId: string) => {
    setVariationToDelete(variationId)
    setConfirmDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!service || !variationToDelete) return

    const updatedVariations = service.variations.filter((v) => v.id !== variationToDelete)
    setService({ ...service, variations: updatedVariations })
    setConfirmDialogOpen(false)
    setVariationToDelete(null)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando información del servicio...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a servicios
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Servicio no encontrado</h2>
              <p className="text-muted-foreground">El servicio que buscas no existe o ha sido eliminado.</p>
              <Button className="mt-4" onClick={() => router.push("/servicios")}>
                Ver todos los servicios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a servicios
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
            <p className="text-muted-foreground">
              Categoría: {getCategoryName(service.category)} | {service.variations.length} variaciones
            </p>
          </div>
        </div>
        <Button onClick={handleAddVariation}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Variación
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variaciones de {service.name}</CardTitle>
          <CardDescription>Gestiona las diferentes opciones disponibles para este servicio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="h-12 px-4 text-left font-medium">Nombre</th>
                  <th className="h-12 px-4 text-left font-medium">Duración</th>
                  <th className="h-12 px-4 text-left font-medium">Precio</th>
                  <th className="h-12 px-4 text-left font-medium w-[70px]"></th>
                </tr>
              </thead>
              <tbody>
                {service.variations.map((variation) => (
                  <tr key={variation.id} className="border-b">
                    <td className="p-4 align-middle font-medium">{variation.name}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {variation.duration} minutos
                      </div>
                    </td>
                    <td className="p-4 align-middle">{variation.price} Bs</td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditVariation(variation)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(variation.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {service.variations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No hay variaciones para este servicio. Añade una para comenzar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <VariationDialog
        open={variationDialogOpen}
        onOpenChange={setVariationDialogOpen}
        initialData={editingVariation || undefined}
        onSave={handleSaveVariation}
        title={editingVariation ? "Editar variación" : "Añadir variación"}
        description={
          editingVariation ? "Edita los detalles de esta variación" : "Añade una nueva variación a este servicio"
        }
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Eliminar variación"
        description="¿Estás seguro de que deseas eliminar esta variación? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
