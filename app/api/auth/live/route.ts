import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma client import

export async function GET() {
  try {
    // Fetch live events from the database
    const liveEvents = await prisma.live.findMany({
      orderBy: {
        startTime: "asc", // Optional: You can order by startTime or other fields
      },
    });

    // Send the live events as JSON response
    return NextResponse.json(liveEvents);
  } catch (error) {
    console.error("Error fetching live events:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
