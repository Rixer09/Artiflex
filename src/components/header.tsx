'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useUser } from '@/hooks/use-user';

const baseNavLinks = [
  { href: '/', label: 'Marketplace' },
  { href: '/my-cart', label: 'My Cart' },
];

const creatorNavLinks = [
    { href: '/create', label: 'Create' },
]

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user } = useUser();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = user.role === 'creator' ? [...baseNavLinks.slice(0,1), ...creatorNavLinks, ...baseNavLinks.slice(1)] : baseNavLinks;
  const mobileNavLinks = user.role === 'creator' ? [...baseNavLinks, ...creatorNavLinks] : baseNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 @supports (backdrop-filter:blur(12px))]:bg-background/60 @supports (backdrop-filter:blur(12px))]:backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Artiflex</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80 relative',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
                {link.href === '/my-cart' && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 bg-background/80 @supports (backdrop-filter:blur(12px))]:backdrop-blur-lg">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Artiflex</span>
                </Link>
                <div className="flex flex-col space-y-4 mt-6">
                    {mobileNavLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "text-lg",
                            pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                        )}
                    >
                        {link.label}
                         {link.href === '/my-cart' && cartItemCount > 0 && (
                            <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {user.role === 'creator' && (
            <Link href="/create" className='hidden sm:inline-block'>
              <Button>
                Start Creating
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
