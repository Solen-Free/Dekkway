"use client";
import { useState } from "react";
import Button from "@/components/button";
import Header from "@/components/header";
import Carousel from "@/components/Carousel";
import Footer from "@/components/footer";
import Card from "@/components/UI/Card";
import Filter from "@/components/Filter"; // Assure-toi que le chemin est correct
import Link from "next/link";

export default function Page() {
  const [showFilter, setShowFilter] = useState(false); // État du filtre

  return (
    <div className="max-w-full mx-auto">
      {/* HEADER avec bouton filtre */}
      <Header onFilterClick={() => setShowFilter(true)} />

      {/* Affichage du filtre quand showFilter est true */}
      {showFilter && <Filter onClose={() => setShowFilter(false)} />}

      <div className="flex flex-col items-center mt-6 gap-4">
        <Carousel />
        <h1 className="text-4xl text-[#FC9B89] mt-8 font-bold">
          Rechercher votre logement dès maintenant !
        </h1>
        <Button text="Clique-moi" onClick={() => alert("Bouton cliqué !")} />

        {/* Section "Les plus récents" */}
        <div className="w-full p-6">
          <h1 className="font-bold text-left mb-6 text-xl">Les plus récents</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            <Card image="/images/maison.jpg" title="Maison à louer" location="Grand-Standing, Thiès" price="500000" />
            <Card image="/images/maison1.jpg" title="Appart à louer" location="Centre-Ville, Dakar" price="300000" />
            <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" />
            <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" />
            <Card image="/images/maison.jpg" title="Maison à louer" location="Grand-Standing, Thiès" price="500000" />
            <Card image="/images/maison1.jpg" title="Appart à louer" location="Centre-Ville, Dakar" price="300000" />
            <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" />
            <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" />
          </div>  
        </div>

        
          <div className="w-3/4 h-[2px] border-[#FC9B89] mx-auto border"></div>
       
        <div className="w-full p-6">
          <h1 className="font-bold text-left mb-6 text-xl">Les plus récents</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            <Card image="/images/maison.jpg" title="Maison à louer" location="Grand-Standing, Thiès" price="500000" />
            <Card image="/images/maison1.jpg" title="Appart à louer" location="Centre-Ville, Dakar" price="300000" />
            <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" />
            <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" />
            <Card image="/images/maison.jpg" title="Maison à louer" location="Grand-Standing, Thiès" price="500000" />
            <Card image="/images/maison1.jpg" title="Appart à louer" location="Centre-Ville, Dakar" price="300000" />
            <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" />
            <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" />
          </div>  
        </div>
      </div>

      <Footer />
    </div>
  );
}
