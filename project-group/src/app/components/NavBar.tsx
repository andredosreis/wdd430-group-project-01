// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export function NavBar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 flex items-center">
     <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"              // coloque seu arquivo em public/logo.png
          alt="Handcrafted Haven Logo"
          width={40}                   // ajuste o tamanho conforme desejar
          height={40}
          className="mr-2"
        />
        
      </Link>


      {/* Links centrais */}
      <div className="flex-1 flex justify-center space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/customers" className="hover:underline">
          Sellers
        </Link>
      </div>

      {/* Login à direita */}
      <Link
        href="/login"
        className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
      >
        Login
      </Link>
    </nav>
  );
}
