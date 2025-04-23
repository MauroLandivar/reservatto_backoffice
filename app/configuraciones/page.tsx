"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Clock, ImageIcon, QrCode, Mail, MessageSquare, Upload, Plus } from "lucide-react"
import { TimeInput } from "@/components/ui/time-input"

export default function ConfiguracionesPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "La boutique de Sevilla",
    description:
      "Bienvenidos a nuestra peluquería en el corazón de Sevilla, donde la tradición se une con la modernidad. En nuestro salón, nos enorgullecemos de ofrecer servicios de calidad que reflejan las últimas tendencias en cortes, peinados y tratamientos capilares.",
    address: "Pelay Correa, 26, 41010 Sevilla, Barrio Triana, Spain",
    phone: "+34 123 456 789",
    email: "info@laboutiquedesevilla.com",
  })

  const [businessHours, setBusinessHours] = useState({
    monday: { open: "08:00", close: "20:00", active: true },
    tuesday: { open: "08:00", close: "20:00", active: true },
    wednesday: { open: "08:00", close: "20:00", active: true },
    thursday: { open: "08:00", close: "20:00", active: true },
    friday: { open: "08:00", close: "20:00", active: true },
    saturday: { open: "09:00", close: "14:00", active: true },
    sunday: { open: "09:00", close: "14:00", active: false },
  })

  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      sender: "notificaciones@reservatto.com",
    },
    whatsapp: {
      enabled: true,
      number: "+34612345678",
    },
  })

  const [images, setImages] = useState([
    { id: "1", name: "Fachada", url: "/placeholder.svg?height=200&width=300" },
    { id: "2", name: "Interior", url: "/placeholder.svg?height=200&width=300" },
    { id: "3", name: "Servicios", url: "/placeholder.svg?height=200&width=300" },
  ])

  const [logo, setLogo] = useState("/placeholder.svg?height=100&width=100")
  const [qrCode, setQrCode] = useState("/placeholder.svg?height=200&width=200")

  const days = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ]

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusinessInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value },
    }))
  }

  const handleNotificationChange = (type: string, field: string, value: string | boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: { ...prev[type as keyof typeof prev], [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuraciones</h1>
        <p className="text-muted-foreground">Personaliza la información y apariencia de tu negocio</p>
      </div>

      <Tabs defaultValue="business-info" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="business-info">Información</TabsTrigger>
          <TabsTrigger value="hours">Horarios</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="business-info" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <Store className="h-5 w-5 mr-3" />
              <div>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>Datos básicos que verán tus clientes</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre del negocio</Label>
                  <Input id="business-name" name="name" value={businessInfo.name} onChange={handleBusinessInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-logo">Logo del negocio</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={logo || "/placeholder.svg"}
                      alt="Logo"
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir logo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-description">Descripción</Label>
                <Textarea
                  id="business-description"
                  name="description"
                  value={businessInfo.description}
                  onChange={handleBusinessInfoChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-address">Dirección</Label>
                <Input
                  id="business-address"
                  name="address"
                  value={businessInfo.address}
                  onChange={handleBusinessInfoChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Teléfono</Label>
                  <Input
                    id="business-phone"
                    name="phone"
                    value={businessInfo.phone}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Email</Label>
                  <Input
                    id="business-email"
                    name="email"
                    value={businessInfo.email}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Guardar cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <Clock className="h-5 w-5 mr-3" />
              <div>
                <CardTitle>Horarios de Atención</CardTitle>
                <CardDescription>Define los días y horas en que tu negocio está abierto</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={businessHours[day.id as keyof typeof businessHours].active}
                        onCheckedChange={(checked) => handleHoursChange(day.id, "active", checked)}
                      />
                      <span className="font-medium">{day.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TimeInput
                        value={businessHours[day.id as keyof typeof businessHours].open}
                        onChange={(value) => handleHoursChange(day.id, "open", value)}
                        disabled={!businessHours[day.id as keyof typeof businessHours].active}
                      />
                      <span>a</span>
                      <TimeInput
                        value={businessHours[day.id as keyof typeof businessHours].close}
                        onChange={(value) => handleHoursChange(day.id, "close", value)}
                        disabled={!businessHours[day.id as keyof typeof businessHours].active}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button>Guardar horarios</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <ImageIcon className="h-5 w-5 mr-3" />
              <div>
                <CardTitle>Imágenes del Negocio</CardTitle>
                <CardDescription>Fotos que se mostrarán a tus clientes</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="border rounded-md p-2">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{image.name}</span>
                        <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border rounded-md p-2 flex flex-col items-center justify-center h-[180px]">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Añadir imagen
                    </Button>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Código QR para pagos
                  </h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={qrCode || "/placeholder.svg"}
                      alt="QR Code"
                      className="h-40 w-40 border rounded-md object-cover"
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Este código QR se mostrará a tus clientes para que puedan realizar pagos fácilmente.
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir código QR
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Guardar cambios</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <Mail className="h-5 w-5 mr-3" />
              <div>
                <CardTitle>Notificaciones por Email</CardTitle>
                <CardDescription>Configura las notificaciones por correo electrónico</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Activar notificaciones por email</h4>
                  <p className="text-sm text-muted-foreground">
                    Envía confirmaciones y recordatorios por correo electrónico
                  </p>
                </div>
                <Switch
                  checked={notifications.email.enabled}
                  onCheckedChange={(checked) => handleNotificationChange("email", "enabled", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-sender">Email remitente</Label>
                <Input
                  id="email-sender"
                  value={notifications.email.sender}
                  onChange={(e) => handleNotificationChange("email", "sender", e.target.value)}
                  disabled={!notifications.email.enabled}
                />
                <p className="text-xs text-muted-foreground">
                  Este será el correo electrónico que aparecerá como remitente en las notificaciones
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <MessageSquare className="h-5 w-5 mr-3" />
              <div>
                <CardTitle>Notificaciones por WhatsApp</CardTitle>
                <CardDescription>Configura las notificaciones por WhatsApp</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Activar notificaciones por WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">Envía confirmaciones y recordatorios por WhatsApp</p>
                </div>
                <Switch
                  checked={notifications.whatsapp.enabled}
                  onCheckedChange={(checked) => handleNotificationChange("whatsapp", "enabled", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Número de WhatsApp</Label>
                <Input
                  id="whatsapp-number"
                  value={notifications.whatsapp.number}
                  onChange={(e) => handleNotificationChange("whatsapp", "number", e.target.value)}
                  disabled={!notifications.whatsapp.enabled}
                />
                <p className="text-xs text-muted-foreground">
                  Este será el número desde el que se enviarán los mensajes de WhatsApp
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Guardar configuración</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
