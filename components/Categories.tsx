import React from "react";
import DataTable from "./DataTable";
import { Link } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import Image from "next/image";

const Categories = async () => {
  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => {
        return (
          <div id="category-cell">
            <p>{category.name}</p>
          </div>
        );
      },
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: (category) => {
        return (
          <div className="top-gainers-cell">
            {category.top_3_coins.map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt="coin"
                width={24}
                height={24}
              />
            ))}
          </div>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (category) => {
        const isTrendinUp = category.market_cap_change_24h > 0;
        return (
          <div
            className={cn(
              "price-change",
              isTrendinUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p className="flex items-center">
              {formatPercentage(category.market_cap_change_24h)}
              {isTrendinUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (category) => {
        return <p>{formatCurrency(category.market_cap)}</p>;
      },
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => {
        return <p>{formatCurrency(category.volume_24h)}</p>;
      },
    },
  ];
  let topCategories: Category[] = [];
  try {
    topCategories = await fetcher<Category[]>(
      "/coins/categories",
      undefined,
      300,
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return <div>Failed to load Categories</div>;
  }

  return (
    <div id="categories">
      <h4>Top Categoreies</h4>
      <DataTable
        data={topCategories.slice(0, 10)}
        columns={columns}
        rowKey={(category) => category.name}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default Categories;
