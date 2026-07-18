import React, { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import Categories from "@/components/Categories";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
  CategoriesFallback,
} from "@/components/home/fallback";

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <Suspense fallback={<CategoriesFallback />}>
        <Categories />
      </Suspense>
      <section className="w-full mt-f space-y-4"></section>
    </main>
  );
};

export default page;
