import React from "react";
import DataTable from "@/components/DataTable";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image skeleton animate-pulse" />
        <div className="info">
          <div className="header-line-sm skeleton animate-pulse rounded" />
          <div className="header-line-lg skeleton animate-pulse rounded" />
        </div>
      </div>
      <div className="flex gap-2 px-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="period-button-skeleton skeleton animate-pulse"
          />
        ))}
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton animate-pulse" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns: DataTableColumn<number>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton animate-pulse" />
          <div className="name-line skeleton animate-pulse rounded" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton animate-pulse" />
          <div className="change-line skeleton animate-pulse rounded" />
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => (
        <div className="price-line skeleton animate-pulse rounded" />
      ),
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <p>Trending Coins</p>
      <div>
        <DataTable
          data={Array.from({ length: 6 }, (_, i) => i)}
          columns={columns}
          rowKey={(row) => row}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};
