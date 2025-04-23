"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Plus, Trash2 } from "lucide-react"
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

export interface ServiceVariation {
  id: string
  name: string
  duration: number
  price: number
}

export interface ServiceFormData {
  id?: string
  name: string
  category: string
  description: string
  hasVariations: boolean
  duration: number
  price: number
  active: boolean
  variations: ServiceVariation[]
}

interface ServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: ServiceFormData
  onSave: (data: ServiceFormData) => void
  title: string
  description: string
}

const categories = [
  { id: "cortes", name: "Cortes" },
  { id: "peinados", name: "Peinados" },
  { id: "tratamientos", name: "Tratamientos" },
  { id: "manos", name: "Manos" },
  { id: "pies", name: "Pies" },
  { id: "maquillaje", name: "Maquillaje" },
]

export function ServiceDialog({ open, onOpenChange, initialData, onSave, title, description }: ServiceDialogProps) {
  const [formData, setFormData] = useState<ServiceFormData>(
    initialData || {
      name: "",
      category: "",
      description: "",
      hasVariations: false,
      duration: 30,
      price: 0,
      active: true,
      variations: [],
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = Number.parseInt(e.target.value) || 0
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSwitchChange = (checked: boolean, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: checked }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addVariation = () => {
    const newVariation: ServiceVariation = {
      id: Date.now().toString(),
      name: "",
      duration: formData.duration,
      price: formData.price,
    }
    setFormData((prev) => ({
      ...prev,
      variations: [...prev.variations, newVariation],
    }))
  }

  const updateVariation = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    }))
  }

  const removeVariation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.filter((v) => v.id !== id),
    }))
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
                <Label htmlFor="name">Nombre del servicio</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, "category")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="hasVariations"
                checked={formData.hasVariations}
                onCheckedChange={(checked) => handleSwitchChange(checked, "hasVariations")}
              />
              <Label htmlFor="hasVariations">Este servicio tiene variaciones</Label>
            </div>

            {formData.hasVariations ? (
              <div className="space-y-4 border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Variaciones del servicio</h4>
                  <Button type="button" variant="outline" size="sm" onClick={addVariation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir variación
                  </Button>
                </div>

                {formData.variations.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No hay variaciones. Añade una para comenzar.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.variations.map((variation) => (
                      <div key={variation.id} className="grid grid-cols-12 gap-2 items-center border-b pb-3">
                        <div className="col-span-5">
                          <Input
                            placeholder="Nombre de la variación"
                            value={variation.name}
                            onChange={(e) => updateVariation(variation.id, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-span-3 flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <Input
                            type="number"
                            min="1"
                            placeholder="Duración"
                            value={variation.duration}
                            onChange={(e) =>
                              updateVariation(variation.id, "duration", Number.parseInt(e.target.value) || 0)
                            }
                            required
                          />
                          <span className="ml-1 text-xs text-muted-foreground">min</span>
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="Precio"
                              value={variation.price}
                              onChange={(e) =>
                                updateVariation(variation.id, "price", Number.parseFloat(e.target.value) || 0)
                              }
                              required
                            />
                            <span className="ml-1 text-xs text-muted-foreground">Bs</span>
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariation(variation.id)}
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (minutos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => handleNumberChange(e, "duration")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (Bs)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleNumberChange(e, "price")}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleSwitchChange(checked, "active")}
              />
              <Label htmlFor="active">Servicio activo</Label>
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
