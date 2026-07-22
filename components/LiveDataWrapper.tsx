"use client";

import React from "react";
import { Separator } from "./ui/separator";
import CandlestickChart from "./CandlestickChart";
import { useCoinGeckoPooling } from "@/hooks/useCoinGeckoPooling";
import { formatCurrency, timeAgo } from "@/lib/utils";
import DataTable from "./DataTable";
import CoinHeader from "./CoinHeader";

const LiveDataWrapper = ({
  coinId,
  poolId,
  coin,
  coinOHLCData,
  network,
}: LiveDataProps) => {
  const { trades } = useCoinGeckoPooling({ network, poolId });

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : "-"),
    },
    {
      header: "Amount",
      cellClassName: "amount-cell",
      cell: (trade) => trade.amount?.toFixed(4) ?? "-",
    },
    {
      header: "Value",
      cellClassName: "value-cell",
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : "-"),
    },
    {
      header: "Buy/Sell",
      cellClassName: "type-cell",
      cell: (trade) => (
        <span
          className={trade.type === "b" ? "text-green-500" : "text-red-500"}
        >
          {trade.type === "b" ? "Buy" : "Sell"}
        </span>
      ),
    },
    {
      header: "Time",
      cellClassName: "time-cell",
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : "-"),
    },
  ];

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        price={coin.market_data.current_price.usd}
        pricePercentageChange={
          coin.market_data.price_change_24h_in_currency.usd
        }
        pricePercentageChange30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
      />
      <Separator className="divider" />
      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
      <Separator className="divider" />
      {tradeColumns && (
        <div className="trades">
          <h4>Recent Trades</h4>
          <DataTable
            columns={tradeColumns}
            data={trades.slice(0, 10) || []}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )}
    </section>
  );
};

export default LiveDataWrapper;
