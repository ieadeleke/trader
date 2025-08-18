// pages/index.tsx - Complete Cryptocurrency Dashboard
import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Select,
  Spin,
  Alert,
  Typography,
  Pagination,
  Button,
  Card,
  Statistic,
  Tag,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DollarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import ScrollVelocity from "./animations/ScrollVelocity";

const { Header, Content } = Layout;
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
      console.error("Error fetching global data:", error);
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

  return (
    <div className="w-full border border-solid border-[#353535] bg-[#232323] py-2 px-3 rounded-[6px]">
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          <img
            src={crypto.image}
            alt={crypto.name}
            style={{ width: "20px", height: "20px" }}
          />
          <div>
            <h4 className="text-white text-sm opacity-80">{crypto.name}</h4>
          </div>
          <div className="bg-[#080808] rounded-[4px] py-1 px-2">
            <p className="text-[#2B7FFF] text-[10px]">{crypto.symbol}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-white">
            {formatPrice(crypto.current_price)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const CryptoDashboard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
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
      setTrendingCoins(trending.coins.slice(0, 7));
      setGlobalData(global);
    } catch (err) {
      setError("Failed to fetch cryptocurrency data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

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
    <>
      <ScrollVelocity
        texts={[
          <div className="flex gap-4 items-center">
            {paginatedData.map((crypto, index) => (
              <CryptoCard crypto={crypto} key={index} />
            ))}
          </div>,
        ]}
        velocity={80}
        numCopies={30}
        className="px-5 text-sm uppercase"
      />
    </>
  );
};

export default CryptoDashboard;
