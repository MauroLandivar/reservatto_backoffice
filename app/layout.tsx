import type React from "react"
import "@/app/globals.css"
import Layout from "@/components/layout/layout"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Reservatto - Sistema de Administración</title>
        <meta name="description" content="Panel de administración para gestionar reservas y citas" />
      </head>
      <body className="bg-gray-50">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Layout businessName="La boutique de Sevilla">{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
