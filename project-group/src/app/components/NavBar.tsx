"use client";

import Link from "next/link";

/**
 * NavBar component
 * Navigation bar with links to Login and Invoices.
 * Usa Tailwind para estilos e spacing consistente.
 */
export function NavBar() {
  return (
    <nav
      className="
        w-full 
        bg-blue-600 
        text-white 
        px-6 py-4 
        flex 
        justify-between 
        items-center 
        mb-8
        
      "
      aria-label="Main navigation"
    >
     
      <div className="flex space-x-7">
        <Link
          href="/login"
          className="hover:underline transition-colors "
        >
          Login
        </Link>
        <Link
          href="/products"
          className="hover:underline transition-colors"
        >
          Products
        </Link>
      </div>
    </nav>
  );
}
