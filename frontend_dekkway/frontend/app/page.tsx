"use client";
import Button from "@/components/button";
import Header from "@/components/header";
import Carousel from "@/components/Carousel";
import Footer from "@/components/footer";
import { useState } from 'react';
import Link from "next/link";



export default function Page() {
  return (
    
    <div className="max-w-full mx-auto">
      <div>
      <Header/>
      
    </div>
      <div className=" text-center flex flex-col items-center mt-6 gap-4">
      <Carousel />
      <h1 className="text-4xl text-[#FC9B89] mt-8 font-bold">Rechercher votre logement dès maintenant !</h1>
      <Button text="Clique-moi" onClick={() => alert("Bouton cliqué !")} />
      <Footer />
      </div>
    </div>
  );
}



