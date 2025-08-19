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
      let trendingData = await response.json;
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
          <img
            src={crypto.image}
            alt={crypto.name}
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
          <div>
            <Title level={5} style={{ margin: "0", color: "#1f2937" }}>
              {crypto.name}
            </Title>
            <Text style={{ color: "#6b7280", textTransform: "uppercase" }}>
              {crypto.symbol}
            </Text>
          </div>
        </div>
        <Tag color={isPositive ? "green" : "red"} style={{ fontWeight: "500" }}>
          #{crypto.market_cap_rank}
        </Tag>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4b5563" }}>Price:</Text>
          <Title level={5} style={{ margin: "0", color: "#1f2937" }}>
            {formatPrice(crypto.current_price)}
          </Title>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4b5563" }}>24h Change:</Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: isPositive ? "#059669" : "#dc2626",
            }}
          >
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            <Text style={{ color: isPositive ? "#059669" : "#dc2626" }}>
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </Text>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4b5563" }}>Market Cap:</Text>
          <Text style={{ color: "#1f2937", fontWeight: "500" }}>
            {formatMarketCap(crypto.market_cap)}
          </Text>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4b5563" }}>Volume (24h):</Text>
          <Text style={{ color: "#1f2937", fontWeight: "500" }}>
            {formatMarketCap(crypto.total_volume)}
          </Text>
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
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </div>
          <img
            src={coin.small}
            alt={coin.name}
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <div>
            <Title level={5} style={{ margin: "0", color: "white" }}>
              {coin.name}
            </Title>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              {coin.symbol}
            </Text>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              display: "block",
              fontSize: "12px",
            }}
          >
            Rank #{coin.market_cap_rank}
          </Text>
          <Text style={{ color: "white", fontSize: "12px" }}>
            {coin?.price_btc?.toFixed(8)} BTC
          </Text>
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
  suffix?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  prefix,
  suffix,
  loading,
}) => {
  const isPositive = change !== undefined ? change > 0 : undefined;

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
  };

  return (
    <Card style={cardStyle}>
      <Statistic
        title={<span style={{ color: "#4b5563" }}>{title}</span>}
        value={value}
        loading={loading}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{
          color:
            isPositive !== undefined
              ? isPositive
                ? "#059669"
                : "#dc2626"
              : "#1890ff",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      />
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
          <span style={{ fontSize: "14px" }}>
            {Math.abs(change).toFixed(2)}% (24h)
          </span>
        </div>
      )}
    </Card>
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
    backgroundColor: "#f9fafb",
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
    <Layout style={layoutStyle}>
      {/* <Header style={headerStyle}>
        <div style={headerContentStyle}>
          <Title level={3} style={{ margin: '0', color: '#1f2937' }}>
            🚀 Crypto Dashboard
          </Title>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
            style={{ borderColor: '#d1d5db' }}
          >
            Refresh
          </Button>
        </div>
      </Header> */}

      <Content style={{ padding: "24px" }}>
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

        {/* Global Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Market Cap"
              value={
                globalData
                  ? formatLargeNumber(globalData.data.total_market_cap.usd)
                  : ""
              }
              change={globalData?.data.market_cap_change_percentage_24h_usd}
              prefix={<DollarOutlined />}
              loading={!globalData}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Cryptocurrencies"
              value={
                globalData?.data.active_cryptocurrencies.toLocaleString() || ""
              }
              prefix={<BarChartOutlined />}
              loading={!globalData}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Markets"
              value={globalData?.data.markets.toLocaleString() || ""}
              prefix={<GlobalOutlined />}
              loading={!globalData}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
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
          </Col>
        </Row>

        {/* Trending Coins */}
        <div style={{ marginBottom: "32px" }}>
          <Title level={4} style={{ color: "#1f2937", marginBottom: "16px" }}>
            🔥 Trending Coins
          </Title>
          <Row gutter={[16, 16]}>
            {trendingCoins.map((coin, index) => (
              <Col key={coin.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrendingCard coin={coin} index={index} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Search and Filter Controls */}
        <div style={searchControlStyle}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search cryptocurrencies..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%" }}
              >
                <Option value="market_cap_desc">
                  Market Cap (High to Low)
                </Option>
                <Option value="price_desc">Price (High to Low)</Option>
                <Option value="change_desc">24h Change (High to Low)</Option>
                <Option value="volume_desc">Volume (High to Low)</Option>
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: "right", color: "#4b5563" }}>
                Showing {paginatedData.length} of {filteredData.length} results
              </div>
            </Col>
          </Row>
        </div>

        {/* Cryptocurrency Grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          {paginatedData.map((crypto) => (
            <Col key={crypto.id} xs={24} sm={12} md={8} lg={6}>
              <CryptoCard
                crypto={crypto}
                onClick={() => {
                  console.log("Navigate to", crypto.id);
                }}
              />
            </Col>
          ))}
        </Row>

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
      </Content>
    </Layout>
  );
};

export default CryptoDashboard;
