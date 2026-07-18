import { fetcher } from "@/lib/coingecko.actions";
import CoinsClient from "./CoinsClient";

const Coins = async () => {
  let coins: CoinMarketData[] = [];

  try {
    coins = await fetcher<CoinMarketData[]>(
      "/coins/markets",
      { vs_currency: "usd" },
      300,
    );
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    return <div>Failed to load coins overview</div>;
  }

  return (
    <div id="coins-page">
      <h4>All Coins</h4>
      <CoinsClient initialData={coins} />
    </div>
  );
};

export default Coins;
