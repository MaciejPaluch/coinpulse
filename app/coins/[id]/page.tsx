import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Divide } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPools } from "@/lib/coingecko.actions";
import LiveDataWrapper from "@/components/LiveDataWrapper";
import CoinDetails from "@/components/home/CoinDetails";
import Converter from "@/components/home/Converter";

const Page = async ({ params }: NextPageProps) => {
  try {
    const { id } = await params;
    const [coin, OHLCdata] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}`, {
        dex_pair_format: "contract_address",
      }),
      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);
    const platform = coin.asset_platform_id
      ? coin.detail_platforms?.[coin.asset_platform_id]
      : null;
    const network = platform?.geckoterminal_url?.split("/")[3] || null;
    const contactAddress = platform?.contract_address || null;

    const pool = await getPools(id, network, contactAddress);

    const coinDetails = [
      {
        label: "Market Cap",
        value: formatCurrency(coin.market_data.market_cap.usd),
      },
      {
        label: "Market Cap Rank",
        value: `# ${coin.market_cap_rank}`,
      },
      {
        label: "Total Volume",
        value: formatCurrency(coin.market_data.total_volume.usd),
      },
      {
        label: "Website",
        value: `-`,
        link: coin.links.homepage[0],
        linkText: "Homepage",
      },
      {
        label: "Explorer",
        value: `-`,
        link: coin.links.blockchain_site[0],
        linkText: "Explorer",
      },
      {
        label: "Community",
        value: `-`,
        link: coin.links.subreddit_url,
        linkText: "Community",
      },
    ];
    return (
      <main id="coin-details-page">
        <div className="primary">
          <LiveDataWrapper
            coinId={id}
            poolId={pool.attributes.address}
            coin={coin}
            coinOHLCData={OHLCdata}
            network={network}
          >
            <h4>Exchange Listings</h4>
          </LiveDataWrapper>
          <p>Exchange listings</p>
        </div>
        <section className="secondary">
          <Converter
            symbol={coin.symbol}
            icon={coin.image.small}
            priceList={coin.market_data.current_price}
          />
          <CoinDetails coin={coin} coinDetails={coinDetails} />
          <p>Top Gainers and Losers</p>
        </section>
      </main>
    );
  } catch (error) {
    throw Error("Bad coin request");
  }
};

export default Page;
