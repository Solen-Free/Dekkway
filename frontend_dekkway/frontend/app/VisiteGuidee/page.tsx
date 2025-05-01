"use client";

import React, { useEffect } from 'react';
import VisiteGuidee from '@/components/VisiteGuidee';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    
    useEffect(() => {
        // Récupérer l'ID du logement depuis les paramètres d'URL
        const propertyId = searchParams.get('id');
        
        // Stocker l'ID dans localStorage pour le récupérer plus tard
        if (propertyId) {
            localStorage.setItem('currentPropertyId', propertyId);
        }
    }, [searchParams]);
    
    return (
        <div>
            <VisiteGuidee />
        </div>
    );
}
