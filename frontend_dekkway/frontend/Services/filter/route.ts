import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      selectedPropertyType,
      priceRange,
      bedrooms,
      equipments,
      city
    } = await req.json();

    const whereClause: any = {};

    if (selectedPropertyType && selectedPropertyType !== 'Tout') {
      whereClause.type = selectedPropertyType;
    }

    if (priceRange) {
      whereClause.price = {
        gte: priceRange[0],
        lte: priceRange[1]
      };
    }

    if (bedrooms) {
      whereClause.bedrooms = bedrooms;
    }

    if (equipments && equipments.length > 0) {
      whereClause.equipments = {
        hasEvery: equipments
      };
    }

    if (city) {
      whereClause.city = city;
    }

    const logements = await prisma.logement.findMany({
      where: whereClause,
      include: {
        photos: true,
        user: true
      }
    });

    return NextResponse.json(logements);
  } catch (error) {
    console.error('Error filtering properties:', error);
    return NextResponse.json(
      { error: 'Erreur lors du filtrage des propriétés' },
      { status: 500 }
    );
  }
}