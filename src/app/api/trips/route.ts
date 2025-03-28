import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const trips = await prisma.trip.findMany();
  return NextResponse.json(trips);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTrip = await prisma.trip.create({
    data: { destination: body.destination },
  });
  return NextResponse.json(newTrip);
}
