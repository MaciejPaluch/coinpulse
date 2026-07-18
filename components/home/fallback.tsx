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
      cell: () => <div className="price-line skeleton animate-pulse rounded" />,
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
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

export const CategoriesFallback = () => {
  const columns: DataTableColumn<number>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: () => (
        <div className="category-skeleton skeleton animate-pulse rounded" />
      ),
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: () => (
        <div className="top-gainers-cell">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="coin-skeleton skeleton animate-pulse" />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => (
        <div className="change-cell">
          <div className="value-skeleton-sm skeleton animate-pulse rounded" />
          <div className="change-icon skeleton animate-pulse" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => (
        <div className="value-skeleton-md skeleton animate-pulse rounded" />
      ),
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => (
        <div className="value-skeleton-lg skeleton animate-pulse rounded" />
      ),
    },
  ];

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        data={Array.from({ length: 10 }, (_, i) => i)}
        columns={columns}
        rowKey={(row) => row}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};
