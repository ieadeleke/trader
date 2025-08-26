"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Bitcoin,
  Zap,
  X,
  RefreshCw,
} from "lucide-react"

// Replace with your portfolio holdings (amounts owned)
const userPortfolio = [
  { name: "Bitcoin", symbol: "BTC", amount: 0.5432, icon: Bitcoin },
  { name: "Ethereum", symbol: "ETH", amount: 8.2156, icon: Zap },
]

export default function CryptoDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [portfolioData, setPortfolioData] = useState([])
  const [chartData, setChartData] = useState({ BTC: [], ETH: [] })
  const [loading, setLoading] = useState(true)

  // Fetch portfolio prices + chart data from CoinGecko
  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch current prices
        const pricesRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
        )
        const prices = await pricesRes.json()

        // Map portfolio with live values
        const updatedPortfolio = userPortfolio.map((asset) => {
          const priceData =
            asset.symbol === "BTC" ? prices.bitcoin : asset.symbol === "ETH" ? prices.ethereum : null
          return {
            ...asset,
            value: priceData.usd * asset.amount,
            change: priceData.usd_24h_change.toFixed(2),
          }
        })

        setPortfolioData(updatedPortfolio)

        // 2. Fetch chart data (last 7 days hourly)
        const [btcRes, ethRes] = await Promise.all([
          fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"),
          fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=hourly"),
        ])

        const btcData = await btcRes.json()
        const ethData = await ethRes.json()

        const formatData = (data) =>
          data.prices.map((p, i) => ({
            time: new Date(p[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            price: p[1],
            volume: data.total_volumes[i][1],
          }))

        setChartData({ BTC: formatData(btcData), ETH: formatData(ethData) })
      } catch (error) {
        console.error("Error fetching crypto data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalPortfolioValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0)
  const totalChange =
    portfolioData.reduce((acc, asset) => acc + (asset.change / 100) * asset.value, 0) / totalPortfolioValue * 100

  if (loading) return <div className="p-6 text-center">Loading crypto data...</div>

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Crypto Dashboard</h1>
            <p className="text-muted-foreground">Monitor your portfolio and market trends</p>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {totalChange > 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-1" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-chart-3" />
                )}
                <span className={totalChange > 0 ? "text-chart-1" : "text-chart-3"}>
                  {totalChange > 0 ? "+" : ""}
                  {totalChange.toFixed(2)}%
                </span>
                <span className="ml-1">(24h)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Price Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Market Charts</CardTitle>
                  <CardDescription>Real-time cryptocurrency prices</CardDescription>
                </div>
                <Tabs value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <TabsList>
                    <TabsTrigger value="BTC">BTC</TabsTrigger>
                    <TabsTrigger value="ETH">ETH</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ price: { label: "Price", color: "hsl(var(--chart-1))" } }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData[selectedCrypto]}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>24-hour trading volume trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ volume: { label: "Volume", color: "hsl(var(--chart-2))" } }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData[selectedCrypto]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="volume" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Holdings</CardTitle>
            <CardDescription>Your current cryptocurrency positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.map((asset) => {
                const Icon = asset.icon
                return (
                  <div key={asset.symbol} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${asset.value.toLocaleString()}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">{asset.amount}</span>
                        <Badge variant={asset.change > 0 ? "default" : "destructive"} className="ml-2">
                          {asset.change > 0 ? "+" : ""}
                          {asset.change}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
