import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "FeelSense DLC - Премиальное дополнение для Minecraft 1.16.5",
  description:
    "Улучшите свой опыт в Minecraft с DLC FeelSense. Совместимо с серверами FunTime, HolyWorld, ReallyWorld и RUSTME.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
