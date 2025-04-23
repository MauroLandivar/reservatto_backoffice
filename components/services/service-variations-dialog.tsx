"use client"

import { Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ServiceVariation } from "./service-dialog"

interface ServiceVariationsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceName: string
  variations: ServiceVariation[]
}

export function ServiceVariationsDialog({ open, onOpenChange, serviceName, variations }: ServiceVariationsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Variaciones de {serviceName}</DialogTitle>
          <DialogDescription>Lista de todas las variaciones disponibles para este servicio</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="h-10 px-4 text-left font-medium">Nombre</th>
                  <th className="h-10 px-4 text-left font-medium">Duración</th>
                  <th className="h-10 px-4 text-left font-medium">Precio</th>
                </tr>
              </thead>
              <tbody>
                {variations.map((variation) => (
                  <tr key={variation.id} className="border-b">
                    <td className="p-4 align-middle font-medium">{variation.name}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {variation.duration} minutos
                      </div>
                    </td>
                    <td className="p-4 align-middle">{variation.price} Bs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
