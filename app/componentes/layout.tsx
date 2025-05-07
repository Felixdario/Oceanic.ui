"use client"

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Image from "@/public/background.png";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${Image.src})`,
        backgroundPosition: 'top right',
        backgroundSize: '800px',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-72">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container flex flex-col gap-4 p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 