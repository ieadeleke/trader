// pages/index.tsx - Complete Cryptocurrency Dashboard
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Spin,
  Alert,
  Typography,
  Pagination,
  Card,
  Statistic,
  Tag,
  Input,
} from "antd";
import {
  SearchOutlined,
  DollarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Button } from "../ui/button";
import { MultiDashboardAssetChart } from "./CryptoCandleStick";
import WithdrawalModal from "./WithdrawFunds";
import FundWalletModal from "./FundWalletModal";
import ConvertTokensModal from "./ConvertTokens";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/utils/api";

const { Title, Text } = Typography;
const { Option } = Select;

// Types
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

interface TrendingCoin {
  id: string;
  item: any;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    market_cap_percentage: {
      [key: string]: number;
    };
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

// API Service
const BASE_URL = "https://api.coingecko.com/api/v3";

class CoinGeckoAPI {
  static async getTopCryptocurrencies(
    limit: number = 100
  ): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching top cryptocurrencies:", error);
      throw error;
    }
  }

  static async getTrendingCoins(): Promise<{ coins: TrendingCoin[] }> {
    try {
      const response = await fetch(`${BASE_URL}/search/trending`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // let trendingData = await response.json;
      return await response.json();
    } catch (error) {
      console.error("Error fetching trending coins:", error);
      throw error;
    }
  }

  static async getGlobalData(): Promise<GlobalData> {
    try {
      const response = await fetch(`${BASE_URL}/global`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

// Components
interface CryptoCardProps {
  crypto: CryptoData;
  onClick?: () => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, onClick }) => {
  const isPositive = crypto.price_change_percentage_24h > 0;

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const cardStyle = {
    height: "100%",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
  };

  const hoverStyle = {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

  return (
    <Card
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
      onClick={onClick}
      bodyStyle={{ padding: "16px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            quality={100}
            width={1000}
            height={1000}
            src={crypto.image}
            alt={crypto.name}
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
          <div>
            <h4
              className="text-base font-ibm m-0 p-0 font-semibold"
              style={{ color: "#1f2937" }}
            >
              {crypto.name}
            </h4>
            <p className="text-sm font-ibm m-0 p-0 text-gray-500 uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>
        <Tag color={isPositive ? "green" : "red"} style={{ fontWeight: "500" }}>
          #{crypto.market_cap_rank}
        </Tag>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div className="flex justify-between items-center">
          <p className="text-[#4b5563] font-ibm">Price:</p>
          <h4 className="text-base font-semibold text-[#1f2937] m-0 font-ibm">
            {formatPrice(crypto.current_price)}
          </h4>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#4b5563] font-ibm">24h Change:</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: isPositive ? "#059669" : "#dc2626",
            }}
          >
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            <p
              className={`${
                isPositive ? "text-[#059669]" : "text-[#dc2626]"
              } font-ibm`}
            >
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#4b5563] font-ibm">Market Cap:</p>
          <h4 className="text-base font-semibold text-[#1f2937] m-0 font-ibm">
            {formatMarketCap(crypto.market_cap)}
          </h4>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#4b5563] font-ibm">Volume (24h):</p>
          <h4 className="text-base font-semibold text-[#1f2937] m-0 font-ibm">
            {formatMarketCap(crypto.total_volume)}
          </h4>
        </div>
      </div>
    </Card>
  );
};

interface TrendingCardProps {
  coin: TrendingCoin;
  index: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ coin, index }) => {
  const cardStyle = {
    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    color: "white",
    border: "0",
    borderRadius: "8px",
  };

  return (
    <Card style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="bg-white/20 rounded-full flex items-center justify-center size-[24px] font-bold font-ibm">
            <h5 className="font-ibm text-white text-[12px]">{index + 1}</h5>
          </div>
          <Image
            quality={100}
            width={1000}
            height={1000}
            src={coin?.item.small}
            alt={coin?.item.name}
            className="size-[24px] rounded-full"
          />
          <div>
            <h3 className="text-white font-ibm m-0 p-0 text-base font-semibold">
              {coin?.item.name}
            </h3>
            <p className="text-white/80 font-ibm m-0 p-0 text-xs uppercase">
              {coin?.item.symbol}
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="text-white/80 block text-xs font-ibm">
            Rank #{coin?.item.market_cap_rank}
          </p>
          <p className="text-white/80 block text-xs font-ibm">
            {coin?.price_btc?.toFixed(8)} BTC
          </p>
        </div>
      </div>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  prefix?: React.ReactNode;
  variant?: string;
  suffix?: string;
  loading?: boolean;
  size: "small" | "large";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  prefix,
  suffix,
  loading,
  variant,
  size,
}) => {
  const isPositive = change !== undefined ? change > 0 : undefined;

  return (
    <div className="bg-transparent p-4 h-full">
      <div>
        <p
          className={`text-sm text-white opacity-80 font-ibm ${
            variant === "white" ? "mb-3" : size === "large" ? "mb-5" : "mb-7"
          }`}
        >
          {title}
        </p>
        <div className="flex items-end gap-4">
          <h3
            className={`${
              size === "large" ? "text-4xl" : "text-xl"
            } font-ibm font-bold flex items-end gap-1 ${
              variant === "white"
                ? "text-white"
                : isPositive !== undefined
                ? isPositive
                  ? "text-[#059669]"
                  : "text-[#dc2626]"
                : "text-[#1890ff]"
            }`}
          >
            {size === "small" && <span className="text-xl">{prefix}</span>}
            {value}
            {suffix && <span className="text-lg">{suffix}</span>}
          </h3>
          {change !== undefined && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "8px",
                color: isPositive ? "#059669" : "#dc2626",
              }}
            >
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              <span className="text-base font-ibm">
                {Math.abs(change).toFixed(2)}% (24h)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface DashboardProps {
  hideProfile?: boolean;
}

// Main Dashboard Component
const CryptoDashboard = ({ hideProfile }: DashboardProps) => {
  const { user } = useAuth();
  const { successToast, errorToast } = useToast();
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [customerData, setCustomerData] = useState<any>({});
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const [openFundWalletModal, setOpenFundWalletModal] = useState(false);
  const [convertWalletModal, setConvertWalletModal] = useState(false);
  const pageSize = 20;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [cryptos, trending, global] = await Promise.all([
        CoinGeckoAPI.getTopCryptocurrencies(100),
        CoinGeckoAPI.getTrendingCoins(),
        CoinGeckoAPI.getGlobalData(),
      ]);

      setCryptoData(cryptos);
      setTrendingCoins(trending.coins.slice(0, 6));
      setGlobalData(global);
    } catch (err) {
      setError("Failed to fetch cryptocurrency data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWalletBalance = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/wallets", { method: "GET", auth: true });
      const data = await res.json();
      setCustomerData(data?.data[0]);
    } catch (err: any) {
      errorToast("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserWalletBalance();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleWithdrawalModal = () => {
    setOpenWithdrawalModal(!openWithdrawalModal);
  };
  const toggleFundWalletModal = () => {
    setOpenFundWalletModal(!openFundWalletModal);
  };
  const toggleConvertWalletModal = () => {
    setConvertWalletModal(!convertWalletModal);
  };

  // convert tokens modal
  const tokens = ["bitcoin", "ethereum", "usdt", "stellar"];

  const handleConvert = (data: {
    fromToken: string;
    toToken: string;
    amount: number;
  }) => {
    console.log("Conversion request:", data);
    // TODO: Call your backend API to process the conversion
  };

  const filteredData = cryptoData
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "volume_desc":
          return b.total_volume - a.total_volume;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };

  const layoutStyle = {
    minHeight: "100vh",
    // backgroundColor: "#f9fafb",
  };

  const headerStyle = {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    padding: "0 24px",
  };

  const headerContentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
  };

  const searchControlStyle = {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  if (loading && cryptoData.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={layoutStyle}>
      <div>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
          />
        )}
        {hideProfile ? (
          ""
        ) : (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-semibold text-white">
              Hello {user?.firstName},
            </h2>
            <div className="flex gap-3 items-center">
              <Button className="py-5 px-8" onClick={toggleFundWalletModal}>
                Fund Wallet
              </Button>
              <Button
                className="py-5 px-8"
                variant="outline"
                onClick={toggleWithdrawalModal}
              >
                Withdrawal
              </Button>
              <Button
                className="py-5 px-8"
                variant="secondary"
                onClick={toggleConvertWalletModal}
              >
                Convert Tokens
              </Button>
            </div>
          </div>
        )}
        {/* Global Stats */}
        <div className="border-2 border-solid border-border rounded-lg mb-8 p-4">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              {hideProfile ? (
                ""
              ) : (
                <div>
                  <StatCard
                    title="Your Wallet Balance"
                    size="large"
                    variant="white"
                    value={customerData?.balance}
                    suffix={customerData?.asset}
                    loading={!globalData}
                  />
                </div>
              )}
            </div>
            <div>
              {hideProfile ? (
                ""
              ) : (
                <div>
                  <StatCard
                    size="small"
                    title="Your Wallet Address"
                    variant="white"
                    value={customerData?.address}
                    suffix={customerData?.asset}
                    loading={!globalData}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:grid grid-cols-[1fr_1.5fr] bor gap-4">
            <div>
              <StatCard
                title="Total Market Cap"
                size="large"
                value={
                  globalData
                    ? formatLargeNumber(globalData.data.total_market_cap.usd)
                    : ""
                }
                change={globalData?.data.market_cap_change_percentage_24h_usd}
                prefix={<DollarOutlined />}
                loading={!globalData}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <StatCard
                  title="Active Cryptocurrencies"
                  size="small"
                  value={
                    globalData?.data.active_cryptocurrencies.toLocaleString() ||
                    ""
                  }
                  prefix={<BarChartOutlined />}
                  loading={!globalData}
                />
              </div>
              <div>
                <StatCard
                  title="Markets"
                  size="small"
                  value={globalData?.data.markets.toLocaleString() || ""}
                  prefix={<GlobalOutlined />}
                  loading={!globalData}
                />
              </div>
              {/* <div>
              <StatCard
                title="BTC Dominance"
                value={
                  globalData
                    ? `${globalData.data.market_cap_percentage.btc.toFixed(1)}%`
                    : ""
                }
                prefix={<TrophyOutlined />}
                loading={!globalData}
              />
            </div> */}
            </div>
          </div>
        </div>
        <div className="border-2 border-solid border-border rounded-lg mb-8 p-4">
          <MultiDashboardAssetChart />
        </div>
        {/* Trending Coins */}
        <div style={{ marginBottom: "32px" }}>
          <h3 className="text-xl font-semibold mb-2 text-white">
            🔥 Trending Coins
          </h3>
          <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingCoins.map((coin, index) => (
              <div key={coin.id}>
                <TrendingCard coin={coin} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="border-2 border-solid border-border rounded-lg mb-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <Input
                placeholder="Search cryptocurrencies..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-[3.5rem] w-full"
              />
            </div>
            <Select
              value={sortBy}
              className="w-full h-[3.5rem]"
              onChange={setSortBy}
            >
              <Option value="market_cap_desc">Market Cap (High to Low)</Option>
              <Option value="price_desc">Price (High to Low)</Option>
              <Option value="change_desc">24h Change (High to Low)</Option>
              <Option value="volume_desc">Volume (High to Low)</Option>
            </Select>
            <div>
              <p className="text-right text-sm text-gray-500">
                Showing {paginatedData.length} of {filteredData.length} results
              </p>
            </div>
          </div>
        </div>

        {/* Cryptocurrency Grid */}
        <div
          className="grid grid-cols-3 gap-3 border-2 border-solid border-border rounded-lg mb-8 p-4"
          style={{ marginBottom: "24px" }}
        >
          {paginatedData.map((crypto) => (
            <div key={crypto.id}>
              <CryptoCard
                crypto={crypto}
                onClick={() => {
                  console.log("Navigate to", crypto.id);
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredData.length > pageSize && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </div>
        )}
      </div>
      <WithdrawalModal
        open={openWithdrawalModal}
        onClose={toggleWithdrawalModal}
        onSubmit={toggleWithdrawalModal}
      />
      <FundWalletModal
        open={openFundWalletModal}
        onClose={toggleFundWalletModal}
        // onSubmit={toggleFundWalletModal}
      />
      <ConvertTokensModal
        open={convertWalletModal}
        onClose={toggleConvertWalletModal}
        onSubmit={handleConvert}
        availableTokens={tokens}
      />
    </div>
  );
};

export default CryptoDashboard;
