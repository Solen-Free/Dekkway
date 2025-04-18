"use client";

import React, { useState } from "react";
import VisualisationVideo from "@/components/VisualisationVideo";
import { useSearchParams } from "next/navigation";    

export default function Page() {
    return (
        <div>
          <VisualisationVideo
      videoUrl="/videos/maison-thies.mp4"
      title="Maison à louer"
      location="Grand-Standing, Thiès"
      price={300000}
    />
        </div>
      );
}
