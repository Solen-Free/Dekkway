"use client";

import Card from "@/components/UI/Card";

interface GridCardProps {}

const GridCard: React.FC<GridCardProps> = () => {
  return (
    <div className="w-full items-center flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card image="/images/maison.jpg" title="Maison à louer" location="Grand-Standing, Thiès" price="500000" id="1" />
        <Card image="/images/maison1.jpg" title="Appart à louer" location="Centre-Ville, Dakar" price="300000" id="2" />
        <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" id="3" />
        <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" id="4" />
        <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" id="5" />
        <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" id="6" />
        <Card image="/images/maison2.jpg" title="Villa à vendre" location="Plage, Mbour" price="1500000" id="7" />
        <Card image="/images/maison3.jpg" title="Maison moderne" location="Banlieue, Rufisque" price="800000" id="9" />
      </div>
    </div>
  );
};

export default GridCard;