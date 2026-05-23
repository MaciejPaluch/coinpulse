'use client';
import { cn } from "@/lib/utils";
import  Link  from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname(); 
  return (
    <header>
        <div className="main-container inner">
            <Link href="/">
                <Image src="/logo.svg" alt="Coinpulse logo" width={132} height={40}/>
            </Link>
 
            <nav>
                <Link href='/' className={cn('nav-link',{'is-active':pathname==='/','is-home':true})}>Home</Link>
                <p>Search Modal</p>
                <Link href="/coins">All Coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header