'use client' 

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Download, Info, Newspaper, Server, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const [user, setUser] = useState(null)

useEffect(() => {
  supabase.auth.getUser().then(({ data }) => setUser(data.user))
}, [])

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/about', label: 'About', icon: Info },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/servers', label: 'Servers', icon: Server },
]

if (user) {
  navItems.push({ href: '/profile', label: 'Account', icon: Info })
} else {
  navItems.push({ href: '/auth/login', label: 'Login', icon: LogIn })
  navItems.push({ href: '/auth/register', label: 'Register', icon: UserPlus })
}


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md p-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
