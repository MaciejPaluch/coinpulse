import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import CandlestickChart from "../CandlestickChart";

const CoinOverview = async () => {
  try {
    const [coin, coinOHLdata] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>("coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);
    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLdata} coinId={"bitcoin"}>
          <div className="header">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            ></Image>
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toLocaleUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch coin overview:", error);
    return <div>Failed to load coin overview</div>;
  }
};

export default CoinOverview;
