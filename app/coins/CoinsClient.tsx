"use client";

import DataTable from "@/components/DataTable";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CoinsClient = ({ initialData }: { initialData: CoinMarketData[] }) => {
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => {
        return (
          <div className="rank-content">
            <span>#{coin.market_cap_rank}</span>

            <Link href={`/coins/${coin.id}`}>
              <span className="sr-only">View {coin.name}</span>
            </Link>
          </div>
        );
      },
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => {
        return (
          <div className="token-info">
            <Image
              src={coin.image}
              alt={coin.name}
              width={24}
              height={24}
              className="rounded-full"
            />

            <p>
              {coin.name} ({coin.symbol.toUpperCase()})
            </p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => {
        return <p>{formatCurrency(coin.current_price)}</p>;
      },
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const isTrendinUp = coin.market_cap_change_24h > 0;
        return (
          <div
            className={cn(
              "price-change",
              isTrendinUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p className="flex items-center">
              {formatPercentage(coin.market_cap_change_percentage_24h)}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => {
        return <p>{formatCurrency(coin.market_cap)}</p>;
      },
    },
  ];
  const rowsPerPage = 10;
  const [data, setData] = useState<CoinMarketData[]>(initialData);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const maxPage = initialData.length / rowsPerPage;

  return (
    <div>
      <DataTable
        data={data.slice(startIndex, endIndex)}
        columns={columns}
        rowKey={(coin) => coin.id}
        tableClassName="coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
      <Pagination id="coins-pagination">
        <PaginationContent className="pagination-content w-full flex items-center">
          {/* 1. KONTENER PREVIOUS (Zajmuje całą wolną przestrzeń po lewej i równa do lewej) */}
          <PaginationItem className="flex-1 flex justify-start">
            <PaginationPrevious
              className={cn(
                "pagination-control prev",
                currentPage === 1 ? "control-disabled" : "control-button",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === 1) return;
                setStartIndex(startIndex - 10);
                setEndIndex(endIndex - 10);
                setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {/* ... ŚRODKOWE NUMERKI POZOSTAJĄ BEZ ZMIAN ... */}
          <PaginationItem>
            {currentPage > 2 && <PaginationEllipsis />}
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  setStartIndex(startIndex - 10);
                  setEndIndex(endIndex - 10);
                  setCurrentPage(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive className="page-link-active">
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < maxPage && (
            <PaginationItem>
              <PaginationLink
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  setStartIndex(startIndex + 10);
                  setEndIndex(endIndex + 10);
                  setCurrentPage(currentPage + 1);
                }}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            {currentPage < maxPage - 1 && <PaginationEllipsis />}
          </PaginationItem>
          {/* ... KONIEC ŚRODKOWYCH NUMERKÓW ... */}

          {/* 2. KONTENER NEXT (Zajmuje całą wolną przestrzeń po prawej i równa do prawej) */}
          <PaginationItem className="flex-1 flex justify-end">
            <PaginationNext
              className={cn(
                "pagination-control next",
                currentPage === maxPage ? "control-disabled" : "control-button",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === maxPage) return;
                setStartIndex(startIndex + 10);
                setEndIndex(endIndex + 10);
                setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CoinsClient;
