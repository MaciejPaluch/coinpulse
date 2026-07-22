import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CoinDetails = ({ coin, coinDetails }: CoinDetailsProps) => {
  return (
    <div className="details">
      <h4>Coin Details</h4>
      <ul className="details-grid">
        {coinDetails.map(({ label, value, link, linkText }, index) => (
          <li key={index}>
            <p className={label}>{label}</p>
            {link ? (
              <div className="link">
                <Link href={link} target="_blank">
                  {linkText || label}
                </Link>
                <ArrowUpRight size={16} />
              </div>
            ) : (
              <p className="text-base font-medium">{value}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinDetails;
