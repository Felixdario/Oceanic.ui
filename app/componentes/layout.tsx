"use client"

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Image from "@/public/background.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 w-full">
        <div
          className="min-h-screen"
          style={{
            backgroundImage: `url(${Image.src})`,
            backgroundPosition: 'top right',
            backgroundSize: '800px',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Header />
          <main className="flex-1">
            <div className="container flex flex-col gap-4 p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 