"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-gray-800 group-[.toaster]:text-gray-900 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-200 dark:group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg rounded-md",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400",
          actionButton: "group-[.toast]:bg-gray-900 dark:group-[.toast]:bg-gray-100 group-[.toast]:text-white dark:group-[.toast]:text-gray-900",
          cancelButton: "group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-gray-700 group-[.toast]:text-gray-900 dark:group-[.toast]:text-gray-100",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "0.375rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
