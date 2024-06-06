import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-[80vh] items-center justify-center p-24 ${inter.className}`}
    >
      <Link href='/users'>
        <Button className='bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-600 text-white font-bold py-2 px-4 rounded hover:from-blue-500 hover:via-cyan-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Go to User page
        </Button>
      </Link>
    </main>
  );
}
