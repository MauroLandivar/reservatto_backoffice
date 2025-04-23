"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Store,
  Scissors,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  QrCode,
  Info,
  ArrowLeft,
  ArrowRightIcon,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
  url: string
  steps: {
    title: string
    description: string
    image?: string
  }[]
}

export default function OnboardingPage() {
  const [activeStep, setActiveStep] = useState<string>("business-info")
  const [currentSubStep, setCurrentSubStep] = useState(0)

  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: "business-info",
      title: "Información del negocio",
      description: "Configura el nombre, dirección, horarios y detalles de tu negocio",
      icon: <Store className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/informacion-negocio",
      steps: [
        {
          title: "Nombre y descripción del negocio",
          description:
            "Ingresa el nombre de tu negocio y una descripción atractiva que explique a tus clientes qué servicios ofreces. Esta información aparecerá en la página principal de tu sitio.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Dirección y ubicación",
          description:
            "Añade la dirección exacta de tu negocio para que los clientes puedan encontrarte fácilmente. Puedes también vincular tu ubicación en Google Maps para facilitar la navegación.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Horarios de atención",
          description:
            "Configura los días y horarios en que tu negocio está abierto. Esto ayudará a que los clientes sepan cuándo pueden reservar y evitará confusiones.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Imágenes del negocio",
          description:
            "Sube fotos de alta calidad de tu negocio, tanto del exterior como del interior. Las imágenes atractivas aumentan la confianza de los clientes y mejoran la tasa de conversión.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Información de contacto",
          description:
            "Añade tu número de teléfono, correo electrónico y redes sociales para que los clientes puedan contactarte por diferentes medios.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      id: "services",
      title: "Servicios ofrecidos",
      description: "Añade los servicios que ofreces, precios, duración y variaciones",
      icon: <Scissors className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/servicios",
      steps: [
        {
          title: "Crear categorías de servicios",
          description:
            "Organiza tus servicios en categorías para facilitar la navegación. Por ejemplo: Cortes, Peinados, Tratamientos, Manicura, etc.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Añadir servicios básicos",
          description:
            "Agrega los servicios principales que ofreces, incluyendo nombre, descripción breve y precio base.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar duración de servicios",
          description:
            "Establece la duración aproximada de cada servicio. Esto es crucial para la gestión del calendario y las reservas.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Crear variaciones de servicios",
          description:
            "Añade variaciones para cada servicio si es necesario. Por ejemplo: corte de cabello para hombre, mujer, niño, o diferentes tipos de tratamientos.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar servicios adicionales",
          description:
            "Define servicios complementarios que los clientes pueden añadir a su reserva principal, como tratamientos especiales o productos.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      id: "employees",
      title: "Gestión de empleados",
      description: "Registra a tu equipo y asigna los servicios que pueden realizar",
      icon: <Users className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/empleados",
      steps: [
        {
          title: "Registrar empleados",
          description:
            "Añade a cada miembro de tu equipo con su nombre, foto y una breve descripción de su especialidad o experiencia.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Asignar roles y permisos",
          description:
            "Define qué rol tiene cada empleado (administrador, profesional, recepcionista) y qué acciones puede realizar en el sistema.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Vincular servicios a empleados",
          description:
            "Especifica qué servicios puede realizar cada empleado. Esto permitirá a los clientes elegir al profesional adecuado para cada servicio.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar horarios de trabajo",
          description:
            "Establece los horarios de trabajo de cada empleado, incluyendo días libres y vacaciones programadas.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Gestionar comisiones (opcional)",
          description:
            "Si tu negocio trabaja con comisiones, configura el porcentaje o monto que corresponde a cada empleado por los servicios realizados.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      id: "calendar",
      title: "Calendario y horarios",
      description: "Configura los horarios de atención y disponibilidad del personal",
      icon: <Calendar className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/calendario",
      steps: [
        {
          title: "Configurar vista del calendario",
          description:
            "Personaliza cómo quieres ver tu calendario: por día, semana o mes, y qué información debe mostrarse en cada vista.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Establecer intervalos de citas",
          description:
            "Define la duración mínima de las citas y los intervalos entre ellas para optimizar la agenda y evitar tiempos muertos.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Bloquear horarios no disponibles",
          description:
            "Marca en el calendario los horarios en que no se pueden agendar citas, ya sea por descansos, reuniones u otros motivos.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar recordatorios automáticos",
          description:
            "Establece recordatorios automáticos para clientes y empleados sobre las citas programadas, reduciendo las ausencias.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Gestionar cancelaciones y reagendamientos",
          description:
            "Define las políticas de cancelación y cómo manejar los reagendamientos de citas para mantener un flujo eficiente.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      id: "qr-code",
      title: "Código QR para pagos",
      description: "Configura tu código QR para recibir pagos de forma fácil y rápida",
      icon: <QrCode className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/pagos",
      steps: [
        {
          title: "Generar código QR de pago",
          description:
            "Crea un código QR vinculado a tu cuenta bancaria o método de pago preferido (Mercado Pago, PayPal, etc.).",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Subir el código QR al sistema",
          description:
            "Sube la imagen del código QR a Reservatto para que aparezca en las confirmaciones de reserva y facturas.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Personalizar mensaje de pago",
          description:
            "Añade instrucciones claras sobre cómo realizar el pago mediante el código QR y qué hacer después de pagar.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar notificaciones de pago",
          description:
            "Establece cómo quieres recibir las notificaciones cuando un cliente realiza un pago mediante el código QR.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Verificar funcionamiento",
          description:
            "Realiza una prueba de pago para asegurarte de que el código QR funciona correctamente y los fondos llegan a tu cuenta.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      id: "additional-info",
      title: "Información adicional",
      description: "Completa detalles adicionales para mejorar la experiencia de tus clientes",
      icon: <Info className="h-8 w-8" />,
      completed: false,
      url: "https://www.notion.so/reservatto/adicional",
      steps: [
        {
          title: "Políticas del negocio",
          description:
            "Define y publica tus políticas de cancelación, reembolsos, llegadas tardías y cualquier otra regla importante para tus clientes.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Preguntas frecuentes",
          description:
            "Crea una sección de FAQ con las preguntas más comunes que hacen tus clientes para ahorrarles tiempo y reducir consultas repetitivas.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Personalizar notificaciones",
          description:
            "Configura los mensajes que se enviarán automáticamente a tus clientes para confirmaciones, recordatorios y agradecimientos.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Configurar promociones",
          description:
            "Crea promociones especiales, descuentos o paquetes de servicios para atraer nuevos clientes y fidelizar a los existentes.",
          image: "/placeholder.svg?height=200&width=350",
        },
        {
          title: "Personalizar apariencia",
          description:
            "Ajusta los colores, fuentes y estilo visual de tu página de reservas para que coincida con la identidad de tu marca.",
          image: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
  ])

  const activeStepData = steps.find((step) => step.id === activeStep) || steps[0]
  const totalSubSteps = activeStepData.steps.length
  const currentSubStepData = activeStepData.steps[currentSubStep]

  const handleNextSubStep = () => {
    if (currentSubStep < totalSubSteps - 1) {
      setCurrentSubStep(currentSubStep + 1)
    } else {
      // If we're at the last substep, mark the step as completed
      const updatedSteps = steps.map((step) => (step.id === activeStep ? { ...step, completed: true } : step))
      setSteps(updatedSteps)

      // Find the next uncompleted step
      const nextUncompleted = updatedSteps.find((step) => !step.completed)
      if (nextUncompleted) {
        setActiveStep(nextUncompleted.id)
        setCurrentSubStep(0)
      }
    }
  }

  const handlePrevSubStep = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1)
    } else {
      // If we're at the first substep, go to the previous step's last substep
      const currentIndex = steps.findIndex((step) => step.id === activeStep)
      if (currentIndex > 0) {
        const prevStep = steps[currentIndex - 1]
        setActiveStep(prevStep.id)
        setCurrentSubStep(prevStep.steps.length - 1)
      }
    }
  }

  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId)
    setCurrentSubStep(0)
  }

  const completedStepsCount = steps.filter((step) => step.completed).length
  const progressPercentage = (completedStepsCount / steps.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Reservatto</h1>
        <p className="text-muted-foreground">
          Sigue estos pasos para configurar tu negocio y comenzar a recibir reservas
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Progress value={progressPercentage} className="h-2" />
        <span className="text-sm font-medium">
          {completedStepsCount}/{steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : step.completed
                    ? "bg-primary/10 text-primary"
                    : "bg-muted hover:bg-muted/80"
              }`}
            >
              <div
                className={`rounded-full p-1.5 ${
                  activeStep === step.id
                    ? "bg-primary-foreground text-primary"
                    : step.completed
                      ? "bg-primary/20 text-primary"
                      : "bg-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {step.completed ? <CheckCircle className="h-5 w-5" /> : step.icon}
              </div>
              <span className="font-medium">{step.title}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{activeStepData.title}</CardTitle>
                  <CardDescription>{activeStepData.description}</CardDescription>
                </div>
                <Link href={activeStepData.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1">
                    Ver guía completa
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {activeStepData.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full flex-1 ${
                      index === currentSubStep ? "bg-primary" : index < currentSubStep ? "bg-primary/40" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Paso {currentSubStep + 1}: {currentSubStepData.title}
                  </h3>
                  <p className="text-muted-foreground">{currentSubStepData.description}</p>
                </div>

                {currentSubStepData.image && (
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={currentSubStepData.image || "/placeholder.svg"}
                      alt={currentSubStepData.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevSubStep}
                disabled={currentSubStep === 0 && steps.findIndex((s) => s.id === activeStep) === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>

              <Button onClick={handleNextSubStep}>
                {currentSubStep < totalSubSteps - 1 ? (
                  <>
                    Siguiente
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Completar
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="gap-2">
            Ir al panel principal
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
