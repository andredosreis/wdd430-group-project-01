

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center h-full p-8">
            <h1 className="text-2xl mb-4">Login Page</h1>
            <form className=" flex flex-col gap-4 w-full max-w-sm">
            <input type="email" placeholder="Email" className=" border p-2" />
            <input type="password" placeholder="Password" className="border p-2" />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded ">
                Login
            </button>
           
            </form>
        </main>
    );
}
           

   