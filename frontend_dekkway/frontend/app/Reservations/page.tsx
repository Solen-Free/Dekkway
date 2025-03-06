"use client";
import Alert from "@/components/UI/Alert";
import Header from "@/components/header";
export default function Home() {
    return (
      <div>
        <Header/>
        <div className="flex flex-col items-center gap-4 p-10">
        <h1 className="text-2xl font-bold">Page Réservations</h1>
        </div>
        <div className="flex items-center justify-center h-screen">
      <Alert />
    </div>
      </div>
    );
  }

