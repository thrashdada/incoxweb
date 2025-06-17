"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="incoxchange"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">incoxchange</span>
        </Link>
      </div>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              Solutions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/solutions/property-management">Property Management</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/solutions/financing">Financing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/solutions/virtual-cards">Virtual Cards</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              Resources
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/resources/blog">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/resources/docs">Documentation</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/resources/case-studies">Case Studies</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/about" className="hover:underline px-2">
          About
        </Link>
        <Link href="/pricing" className="hover:underline px-2">
          Pricing
        </Link>
        <Link href="/support" className="hover:underline px-2">
          Support
        </Link>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost" size="sm">
          Log in
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-foreground">
          Sign up
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Solutions
                  </h3>
                  <div className="space-y-2">
                    <Link href="/solutions/property-management" className="block py-2 hover:text-blue-600">
                      Property Management
                    </Link>
                    <Link href="/solutions/financing" className="block py-2 hover:text-blue-600">
                      Financing
                    </Link>
                    <Link href="/solutions/virtual-cards" className="block py-2 hover:text-blue-600">
                      Virtual Cards
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Resources
                  </h3>
                  <div className="space-y-2">
                    <Link href="/resources/blog" className="block py-2 hover:text-blue-600">
                      Blog
                    </Link>
                    <Link href="/resources/docs" className="block py-2 hover:text-blue-600">
                      Documentation
                    </Link>
                    <Link href="/resources/case-studies" className="block py-2 hover:text-blue-600">
                      Case Studies
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </h3>
                  <div className="space-y-2">
                    <Link href="/about" className="block py-2 hover:text-blue-600">
                      About
                    </Link>
                    <Link href="/pricing" className="block py-2 hover:text-blue-600">
                      Pricing
                    </Link>
                    <Link href="/support" className="block py-2 hover:text-blue-600">
                      Support
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="p-6 border-t space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Log in
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-foreground">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
