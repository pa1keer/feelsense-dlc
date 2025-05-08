"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Shield, Check, AlertCircle, ExternalLink, Zap, Gamepad2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DLCPage() {
  const [progress, setProgress] = useState(0)
  const [verified, setVerified] = useState(false)
  const [selectedServer, setSelectedServer] = useState("minecraft")
  const [backgroundImage, setBackgroundImage] = useState("")
  const [imageError, setImageError] = useState(false)

  // Словарь с URL лотов для каждого типа сервера
  const serverLots = {
    minecraft: "https://funpay.com/lots/minecraft", // Замените на реальный URL лота для Minecraft серверов
    rustme: "https://funpay.com/lots/rustme", // Замените на реальный URL лота для RUSTME
  }

  // Информация о версиях для каждого типа сервера
  const serverVersions = {
    minecraft: "1.16.5",
    rustme: "1.12.2",
  }

  // Названия серверов для отображения
  const serverNames = {
    minecraft: "Funtime, HolyWorld, ReallyWorld",
    rustme: "RUSTME",
  }

  // Запускаем проверку при загрузке страницы
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    // Сбрасываем состояние при смене сервера
    setProgress(0)
    setVerified(false)

    // Запускаем интервал для увеличения прогресса
    interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          // Когда прогресс достигает 100%, очищаем интервал и устанавливаем verified в true
          if (interval) clearInterval(interval)
          setTimeout(() => setVerified(true), 500) // Небольшая задержка для плавности
          return 100
        }
        return prevProgress + 10
      })
    }, 300)

    // Очищаем интервал при размонтировании компонента
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [selectedServer]) // Перезапускаем эффект при изменении выбранного сервера

  const handlePurchase = () => {
    // @ts-ignore - Игнорируем ошибку TypeScript для упрощения
    window.open(serverLots[selectedServer], "_blank")
  }

  const handleServerChange = (value: string) => {
    setSelectedServer(value)
    // При смене сервера сбрасываем состояние проверки
    setProgress(0)
    setVerified(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundImage(e.target.value)
    setImageError(false) // Сбрасываем ошибку при изменении URL
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header with glowing effect */}
      <header className="relative py-6 px-4 border-b border-zinc-800 flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-red-900/20 to-amber-900/20 opacity-50" />
        <div className="relative z-10 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-amber-500">Feel</span>
            <span className="text-red-500">Sense</span>
            <span className="text-zinc-400 text-lg ml-2">DLC</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4 md:p-8">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 text-transparent bg-clip-text">
            FeelSense DLC
          </h2>
          <p className="text-xl text-zinc-400 mb-6">
            Премиальное дополнение для {serverNames[selectedServer as keyof typeof serverNames]} (
            {serverVersions[selectedServer as keyof typeof serverVersions]})
          </p>
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg blur opacity-75"></div>
            <div className="relative px-6 py-3 bg-zinc-800 rounded-lg border border-zinc-700 text-lg font-medium">
              Премиум DLC • 300 ₽ навсегда
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Features */}
          <div>
            <Card className="bg-zinc-800 border-zinc-700 shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-amber-900/40 to-red-900/40 relative">
                {backgroundImage && !imageError && (
                  <img
                    src={backgroundImage || "/placeholder.svg"}
                    alt="DLC Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={handleImageError}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gamepad2 className="w-20 h-20 text-amber-500 opacity-80" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Особенности FeelSense</CardTitle>
                <CardDescription className="text-zinc-400">Улучшите свой игровой опыт</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>Продвинутая система сенсорной обратной связи</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>5 эксклюзивных скинов персонажей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>Новое оружие и снаряжение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>Расширенная игровая механика</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>Доступ к премиум-поддержке</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Verification/Payment */}
          <div>
            {!verified ? (
              <Card className="bg-zinc-800 border-zinc-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    Проверка оплаты
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Пожалуйста, подождите...</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Progress value={progress} className="h-2 bg-zinc-700" />
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin mr-2">
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-600 border-t-amber-500"></div>
                    </div>
                    <span className="text-sm text-zinc-400">Проверка...</span>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-zinc-500 justify-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Требуется проверка перед покупкой
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-zinc-800 border-zinc-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Проверка завершена
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Вы можете продолжить покупку</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">FeelSense DLC</span>
                      <span className="font-bold">300 ₽</span>
                    </div>
                    <div className="text-xs text-zinc-400">Разовая покупка • Доступ навсегда</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Выберите версию:</label>
                    <Select value={selectedServer} onValueChange={handleServerChange}>
                      <SelectTrigger className="bg-white text-black border-zinc-300">
                        <SelectValue placeholder="Выберите версию" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black border-zinc-300">
                        <SelectItem value="minecraft" className="text-black">
                          Minecraft 1.16.5 (Funtime, HolyWorld, ReallyWorld)
                        </SelectItem>
                        <SelectItem value="rustme" className="text-black">
                          RUSTME 1.12.2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Купить на FunPay
                  </Button>
                </CardContent>
                <CardFooter className="text-xs text-zinc-500 justify-center">
                  Безопасная оплата • Мгновенная доставка
                </CardFooter>
              </Card>
            )}
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-zinc-300">Системные требования</h3>
          <Tabs defaultValue="minimum" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger value="minimum">Минимальные</TabsTrigger>
              <TabsTrigger value="recommended">Рекомендуемые</TabsTrigger>
            </TabsList>
            <TabsContent value="minimum" className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-md mt-2">
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>
                  <strong>ОС:</strong> Windows 7/8/10/11
                </li>
                <li>
                  <strong>Процессор:</strong> Intel Core i3-3210 / AMD A8-7600
                </li>
                <li>
                  <strong>Память:</strong> 4 ГБ ОЗУ
                </li>
                <li>
                  <strong>Видеокарта:</strong> NVIDIA GeForce 400 Series / AMD Radeon HD 7000
                </li>
                <li>
                  <strong>Хранилище:</strong> 2 ГБ свободного места
                </li>
                <li>
                  <strong>Базовая игра:</strong> {selectedServer === "minecraft" ? "Minecraft 1.16.5" : "RUSTME 1.12.2"}
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="recommended" className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-md mt-2">
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>
                  <strong>ОС:</strong> Windows 10/11 64-bit
                </li>
                <li>
                  <strong>Процессор:</strong> Intel Core i5-4690 / AMD A10-7800
                </li>
                <li>
                  <strong>Память:</strong> 8 ГБ ОЗУ
                </li>
                <li>
                  <strong>Видеокарта:</strong> NVIDIA GeForce 700 Series / AMD Radeon Rx 200 Series
                </li>
                <li>
                  <strong>Хранилище:</strong> 4 ГБ SSD свободного места
                </li>
                <li>
                  <strong>Базовая игра:</strong> {selectedServer === "minecraft" ? "Minecraft 1.16.5" : "RUSTME 1.12.2"}
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-6 px-4 border-t border-zinc-800 text-center text-zinc-500 text-sm">
        <div className="max-w-5xl mx-auto">
          <p>© 2025 FeelSense Studios. Все права защищены.</p>
          <p className="mt-2">
            Для работы FeelSense DLC требуется {selectedServer === "minecraft" ? "Minecraft 1.16.5" : "RUSTME 1.12.2"}.
          </p>
        </div>
      </footer>
    </div>
  )
}
