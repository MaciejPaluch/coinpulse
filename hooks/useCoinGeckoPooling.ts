import { useState, useEffect } from "react";
import { fetcher } from "@/lib/coingecko.actions";

export const useCoinGeckoPooling = ({
  network,
  poolId,
}: UseCoinGeckoPooling) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    if (!network || !poolId) return;
    const fetchTrades = async () => {
      try {
        const response = await fetcher<ResponseTrade>(
          `onchain/networks/${network}/pools/${poolId}/trades`,
        );
        if (response && response.data) {
          const formattedTrades = response.data.map((item) => ({
            price: Number(item.attributes.price_to_in_usd),
            amount: Number(item.attributes.from_token_amount),
            value: Number(item.attributes.volume_in_usd),
            timestamp: new Date(item.attributes.block_timestamp).getTime(),
            type: item.attributes.kind,
          }));

          setTrades(formattedTrades);
        }
      } catch (error) {
        console.error("Błąd pobierania transakcji:", error);
      }
    };
    fetchTrades();

    const interval = setInterval(fetchTrades, 20000);

    return () => clearInterval(interval);
  }, [network, poolId]);
  return { trades };
};
