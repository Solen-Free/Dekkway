"use client";
import Buttons from "@/components/buttons";
import Carousel from "@/components/Carousel";
import Footer from "@/components/footer";
import GridCard from "@/components/UI/GridCard";
import { useState } from 'react';
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen">
     

      {/* Carousel section */}
      <div className="w-full">
        <Carousel />
      </div>

      {/* Main heading */}
      <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#FC9B89] font-bold text-center">
          Rechercher votre logement dès maintenant !
        </h1>
      </div>

      {/* Bailleur section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start px-4 sm:px-6 lg:px-8 mt-8 gap-4">
        <Buttons 
          text="Devenir Bailleur" 
          fontWeight="font-bold" 
          textSize="text-xl sm:text-2xl"  
          href="/InscriptionBailleur"
        />
        {/* <h1 className="text-lg sm:text-xl font-bold text-black">
          <span className="animate-typewriter block">
            Vous avez la possibilité de vendre vos propriétés sur notre plateforme !
          </span>
        </h1> */}
      </div>

      {/* Recent listings sections */}
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 mt-8">
        {/* First recent section */}
        <div className="w-full mb-12">
          <h1 className="font-bold text-[#014F86] text-lg sm:text-xl mb-6">
            Les plus récents
          </h1>
          <div className="w-full  items-center px-4 sm:px-6 lg:px-8 flex justify-center">
            <GridCard />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[90%] mx-auto h-[2px] border-[#FC9B89] border"></div>

        {/* Second recent section */}
        <div className="w-full mt-12">
          <h1 className="font-bold text-[#014F86] text-lg sm:text-xl mb-6">
            Les plus récents
          </h1>
          <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
            <GridCard />
          </div>
        </div>
        
      </div>

    </div>
  );
}