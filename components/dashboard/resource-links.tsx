import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ResourceLink {
  id: string
  title: string
  subtitle: string
  description: string
  url: string
  isExternal?: boolean
}

interface ResourceLinksProps {
  resources: ResourceLink[]
  className?: string
}

export default function ResourceLinks({ resources, className }: ResourceLinksProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {resources.map((resource) => (
        <Card key={resource.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="text-sm font-medium text-primary">{resource.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          </CardContent>
          <CardFooter>
            {resource.isExternal ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Visitar
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            ) : (
              <Link href={resource.url} className="text-sm font-medium text-primary hover:underline">
                Ir a la sección
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
