"use client"

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";



export default function LoginPage() {
    
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // aqui você validaria user/pass…
    login();
    router.push("/dashboard");
  }
     return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-2" required />
        <input type="password" placeholder="Password" className="border p-2" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Sign In
        </button>
      </form>
    </main>
  );
}

   